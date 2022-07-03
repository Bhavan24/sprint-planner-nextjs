// React imports
import React, { RefObject, useEffect, useRef, useState } from 'react';
// Next imports
import { useRouter } from 'next/router';
// Chakra-UI imports
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
// Component imports
import AlertBox from '../../alertbox';
import TimerComponent from '../../timer';
import { StoryPointsEngineerDetails } from '../../sprint-details/assignee-details';
import { finishGame, resetGame } from '../../../services/poker/games';
import { SettingsSprintPoker } from './poker-controller-settings';
import { SaveSprintPoker } from './save-poker-details';
// Icon imports
import { SettingsIcon } from '@chakra-ui/icons';
import { FaLink, FaRegEye, FaSave } from 'react-icons/fa';
import { MdExitToApp } from 'react-icons/md';
import { VscDebugRestart } from 'react-icons/vsc';
// Type imports
import { IPokerControllerProps } from '../../../interfaces';
// Constant imports
import { JIRA_BASE_LINK } from '../../../constants';

const PokerController: React.FC<IPokerControllerProps> = props => {
    const router = useRouter();
    const [gameId, setGameId] = useState('');

    // popup
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef() as RefObject<FocusableElement>;

    // drawer
    const drawer = useDisclosure();
    const drawerBtnRef = useRef() as RefObject<FocusableElement>;

    // save issue modal
    const modal = useDisclosure();
    const initialRef = useRef() as RefObject<FocusableElement>;
    const finalRef = useRef() as RefObject<FocusableElement>;

    // view issue modal
    const viewModal = useDisclosure();

    // toast
    const toast = useToast();

    useEffect(() => {
        if (!router.isReady) return;
        const { id } = router.query;
        id && setGameId(id?.toString() || '');
    }, [router.isReady]);

    const handleRevealCards = () => {
        finishGame(gameId).then(r => console.log(r));
    };

    const handleSaveIssueCards = () => {
        modal.onOpen();
    };

    const handleControllerSettings = () => {
        viewModal.onOpen();
    };

    const handleRestartSession = () => {
        resetGame(gameId).then(r => console.log(r));
    };

    const handleExitSession = () => {
        router.push('/').then(r => console.log(r));
    };

    const handleCopyInviteLink = () => {
        //TODO: fix this!!! const url = `${window.location.origin}/sprint-poker?join=${gameId}`;
        navigator.clipboard.writeText(gameId).then(r => console.log(r));
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
                                        isOpen={modal.isOpen}
                                        onOpen={modal.onOpen}
                                        onClose={modal.onClose}
                                        initialRef={initialRef}
                                        finalRef={finalRef}
                                        title={'Save Issue'}
                                        game={props.game}
                                    />
                                    <Tooltip label="Settings">
                                        <IconButton
                                            colorScheme="purple"
                                            aria-label="Settings"
                                            icon={<SettingsIcon />}
                                            isRound
                                            size="lg"
                                            m={2}
                                            onClick={handleControllerSettings}
                                        />
                                    </Tooltip>
                                    <SettingsSprintPoker
                                        isOpen={viewModal.isOpen}
                                        onOpen={viewModal.onOpen}
                                        onClose={viewModal.onClose}
                                        title={'Settings'}
                                        gameId={props.game.id}
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
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            flexDir="column"
                            mt={2}
                        >
                            {props.game.issueId && (
                                <Text m={2}>
                                    Current Issue: <b>{props.game.issueId}</b>
                                </Text>
                            )}
                            <Button
                                onClick={() => {
                                    window.open(JIRA_BASE_LINK + props.game.issueId);
                                }}
                                m={2}
                                w="12em"
                            >
                                View Issue
                            </Button>
                        </Flex>
                        <Flex alignItems="center" justifyContent="center" mt={2}>
                            <Button onClick={drawer.onOpen} w="12em">
                                View Assignee Details
                            </Button>
                            <Drawer
                                isOpen={drawer.isOpen}
                                placement="right"
                                onClose={drawer.onClose}
                                finalFocusRef={drawerBtnRef}
                                size="lg"
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
