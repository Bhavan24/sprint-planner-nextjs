import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack,
    Text,
    Textarea,
    Tooltip,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { arrayUnion } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { RefObject, useEffect, useRef, useState } from 'react';
import { FaLink, FaRegEye, FaSave } from 'react-icons/fa';
import { MdExitToApp } from 'react-icons/md';
import { VscDebugRestart } from 'react-icons/vsc';
import {
    IPokerControllerProps,
    ISaveSprintBoxProps,
    ISprintColData,
    ISprintPokerColData,
} from '../../../interfaces';
import { finishGame, resetGame } from '../../../services/poker/games';
import { getSprints, updateSprintData } from '../../../services/sprint/sprints';
import AlertBox from '../../alertbox';
import TimerComponent from '../../timer';

const SaveSprint = (props: ISaveSprintBoxProps) => {
    const [sprintId, setSprintId] = useState('');
    const [sprints, setSprints] = useState<ISprintColData[]>();
    const [inputs, setInputs] = useState<ISprintPokerColData>({
        title: '',
        desc: '',
        link: '',
        points: 0,
    });

    // toast
    const toast = useToast();

    useEffect(() => {
        getSprints()
            .then(sprints => {
                setSprints(sprints);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleChange = (event: any) => {
        const name = event.target.id;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = () => {
        const done =
            sprintId &&
            inputs &&
            updateSprintData(sprintId, {
                poker: arrayUnion({
                    title: inputs.title,
                    desc: inputs.desc,
                    link: inputs.link,
                    points: inputs.points,
                }),
            });
        props.onClose();
        done
            ? toast({
                  title: 'Issue Details Added!!!',
                  status: 'success',
                  isClosable: true,
              })
            : toast({
                  title: 'Cannot Add!!!',
                  status: 'error',
                  isClosable: true,
              });
    };

    return (
        <>
            <Modal
                initialFocusRef={props.initialRef}
                finalFocusRef={props.finalRef}
                isOpen={props.isOpen}
                onClose={props.onClose}
                size="lg"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{props.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex justifyContent="center" flexDir="column" p={4}>
                            <FormControl isRequired m={1}>
                                <FormLabel htmlFor="sprint-name">Sprint name</FormLabel>
                                <Select
                                    id="sprint-name"
                                    placeholder="Sprint name"
                                    onChange={(e: any) => {
                                        setSprintId(e.target.value);
                                    }}
                                >
                                    {sprints &&
                                        sprints.map(sprint => (
                                            <option key={sprint.id} value={sprint.id}>
                                                {sprint.name}
                                            </option>
                                        ))}
                                </Select>
                            </FormControl>
                            <FormControl isRequired m={1}>
                                <FormLabel htmlFor="poker-title">Title</FormLabel>
                                <Input
                                    id="title"
                                    placeholder="Title"
                                    value={inputs.title}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl m={1}>
                                <FormLabel htmlFor="poker-desc">Description</FormLabel>
                                <Textarea
                                    id="desc"
                                    placeholder="Description"
                                    value={inputs.desc}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl isRequired m={1}>
                                <FormLabel htmlFor="poker-link">Link</FormLabel>
                                <Input
                                    id="link"
                                    placeholder="Link"
                                    value={inputs.link}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl isRequired m={1}>
                                <FormLabel htmlFor="poker-points">Points</FormLabel>
                                <Input
                                    id="points"
                                    type="number"
                                    placeholder="Points"
                                    value={inputs.points}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

const PokerController: React.FC<IPokerControllerProps> = props => {
    const router = useRouter();
    const [gameId, setGameId] = useState('');

    // popup
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef() as RefObject<FocusableElement>;

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
        navigator.clipboard.writeText(url);
        toast({
            position: 'top-right',
            title: 'Invite Link copied to clipboard!',
            status: 'success',
            isClosable: true,
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
                                    <SaveSprint
                                        isOpen={model.isOpen}
                                        onOpen={model.onOpen}
                                        onClose={model.onClose}
                                        initialRef={initialRef}
                                        finalRef={finalRef}
                                        title={'Save Issue'}
                                    />
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
                    </Box>
                </Box>
            </Stack>
        </>
    );
};

export default PokerController;
