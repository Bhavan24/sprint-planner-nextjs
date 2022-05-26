import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    IconButton,
    Stack,
    Text,
    Tooltip,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { useRouter } from 'next/router';
import { RefObject, useEffect, useRef, useState } from 'react';
import { FaLink, FaRegEye, FaSave } from 'react-icons/fa';
import { MdExitToApp } from 'react-icons/md';
import { VscDebugRestart } from 'react-icons/vsc';
import { IPokerControllerProps } from '../../../interfaces';
import { finishGame, resetGame } from '../../../services/poker/games';
import AlertBox from '../../alertbox';
import { StoryPointsEngineerDetails } from '../../sprint-details/assignee-details';

import TimerComponent from '../../timer';
import { SaveSprintPoker } from './save-poker-details';

const PokerController: React.FC<IPokerControllerProps> = props => {
    const router = useRouter();
    const [gameId, setGameId] = useState('');

    // popup
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef() as RefObject<FocusableElement>;

    // drawer
    const drawer = useDisclosure();
    const drawerBtnRef = useRef() as RefObject<FocusableElement>;

    // model
    const model = useDisclosure();
    const initialRef = useRef() as RefObject<FocusableElement>;
    const finalRef = useRef() as RefObject<FocusableElement>;

    // toast
    const toast = useToast();

    useEffect(() => {
        if (!router.isReady) return;
        const { id } = router.query;
        id && setGameId(id?.toString() || '');
    }, [router.isReady]);

    const handleRevealCards = () => {
        finishGame(gameId);
    };

    const handleSaveIssueCards = () => {
        model.onOpen();
    };

    const handleRestartSession = () => {
        resetGame(gameId);
    };

    const handleExitSession = () => {
        router.push('/');
    };

    const handleCopyInviteLink = () => {
        const url = `${window.location.origin}/sprint-poker?join=${gameId}`;
        navigator.clipboard.writeText(gameId); //TODO: fix this!!!
        toast({
            title: 'Invite Link copied to clipboard!',
            status: 'success',
            isClosable: true,
            position: 'bottom-left',
        });
    };

    const isModerator = (moderatorId: string, currentPlayerId: string) => {
        return moderatorId === currentPlayerId;
    };

    return (
        <>
            <Stack spacing="6" alignItems="center">
                <Box
                    maxW="max-content"
                    maxH="lg"
                    borderWidth="2px"
                    borderRadius="lg"
                    m="1"
                >
                    <Box p="6">
                        <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            alignContent="center"
                            gap="1"
                        >
                            <Text fontSize="md">{props.game.name}</Text>
                            <Text>{props.game.gameStatus}</Text>
                        </Box>
                        <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            noOfLines={1}
                        >
                            Average : {props.game.average || 0}
                        </Box>
                        <Box gap="2" p="2">
                            {isModerator(
                                props.game.createdById,
                                props.currentPlayerId
                            ) && (
                                <>
                                    <Tooltip label="Reveal Cards">
                                        <IconButton
                                            colorScheme="green"
                                            aria-label="Reveal"
                                            icon={<FaRegEye />}
                                            isRound
                                            size="lg"
                                            m={2}
                                            onClick={handleRevealCards}
                                        />
                                    </Tooltip>
                                    <Tooltip label="Restart Session">
                                        <IconButton
                                            colorScheme="orange"
                                            aria-label="Restart"
                                            icon={<VscDebugRestart />}
                                            isRound
                                            size="lg"
                                            m={2}
                                            onClick={handleRestartSession}
                                        />
                                    </Tooltip>
                                    <Tooltip label="Save Issue">
                                        <IconButton
                                            colorScheme="teal"
                                            aria-label="Save Issue"
                                            icon={<FaSave />}
                                            isRound
                                            size="lg"
                                            m={2}
                                            onClick={handleSaveIssueCards}
                                        />
                                    </Tooltip>
                                    <SaveSprintPoker
                                        isOpen={model.isOpen}
                                        onOpen={model.onOpen}
                                        onClose={model.onClose}
                                        initialRef={initialRef}
                                        finalRef={finalRef}
                                        title={'Save Issue'}
                                        sprintId={props.game.sprintId}
                                    />
                                </>
                            )}
                            <Tooltip label="Exit Session">
                                <IconButton
                                    colorScheme="red"
                                    aria-label="Exit"
                                    icon={<MdExitToApp />}
                                    isRound
                                    size="lg"
                                    m={2}
                                    onClick={onOpen}
                                />
                            </Tooltip>
                            <AlertBox
                                isOpen={isOpen}
                                onOpen={onOpen}
                                onClose={onClose}
                                cancelRef={cancelRef}
                                onAction={handleExitSession}
                                btnText={'Exit'}
                                btnColor={'red'}
                                title={'Exit Session'}
                                body={`Are you sure want to exit the session?`}
                            />
                            <Tooltip label="Copy Invitation Link">
                                <IconButton
                                    colorScheme="blue"
                                    aria-label="Invite"
                                    icon={<FaLink />}
                                    isRound
                                    size="lg"
                                    m={2}
                                    onClick={handleCopyInviteLink}
                                />
                            </Tooltip>
                        </Box>
                        <Flex alignItems="center" justifyContent="center">
                            <TimerComponent />
                        </Flex>
                        <Flex alignItems="center" justifyContent="center" mt={2}>
                            <Button onClick={drawer.onOpen}>View Assignee Details</Button>
                            <Drawer
                                isOpen={drawer.isOpen}
                                placement="right"
                                onClose={drawer.onClose}
                                finalFocusRef={drawerBtnRef}
                                size="sm"
                            >
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerCloseButton />
                                    <DrawerHeader alignContent="center">
                                        Assignee Details
                                    </DrawerHeader>
                                    <DrawerBody>
                                        <StoryPointsEngineerDetails
                                            sprintId={props.game.sprintId}
                                        />
                                    </DrawerBody>
                                </DrawerContent>
                            </Drawer>
                        </Flex>
                    </Box>
                </Box>
            </Stack>
        </>
    );
};

export default PokerController;
