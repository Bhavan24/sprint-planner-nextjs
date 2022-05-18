import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    Tab,
    Table,
    TableContainer,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/config';
import { GAME_TYPES } from '../../constants';
import { IGame, INewSession } from '../../interfaces';
import { addNewGame } from '../../services/poker/games';
import { getPlayerRecentGames } from '../../services/poker/players';

const PokerMainComponent = () => {
    // router
    const router = useRouter();
    // user
    const [user] = useAuthState(auth);
    // states
    const [sessionName, setSessionName] = useState('');
    const [cardsMode, setCardsMode] = useState(GAME_TYPES[0].type);
    const [sessionCode, setSessionCode] = useState('');
    const [tabIndex, setTabIndex] = useState(0);
    const [recentGames, setRecentGames] = useState<IGame[] | undefined>(undefined);
    // toast
    const toast = useToast();

    useEffect(() => {
        async function fetchData() {
            const games = await getPlayerRecentGames();
            if (games) {
                setRecentGames(games);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (!router.isReady) return;
        const { join } = router.query;
        join && setTabIndex(1);
        setSessionCode(join?.toString() || '');
    }, [router.isReady]);

    const handleSessionNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSessionName(e.target.value);
    };

    const handleCardsModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCardsMode(e.target.value);
    };

    const handleSessionCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSessionCode(e.target.value);
    };

    const createSession = async () => {
        if (sessionName && user?.displayName && cardsMode) {
            const game: INewSession = {
                name: sessionName,
                userName: user.displayName,
                userId: user.uid,
                gameType: cardsMode,
                createdAt: new Date(),
            };
            const newGameId = await addNewGame(game);
            console.log('newGameId:', newGameId);
            router.push(`/sprint-poker/${newGameId}`);
        } else {
            toast({
                title: 'Please fill all fields !!!',
                status: 'error',
                isClosable: true,
            });
        }
    };

    const joinSession = () => {
        if (sessionCode) {
            // add player to game
            router.push(`/sprint-poker/${sessionCode}`);
        } else {
            toast({
                title: 'Please fill all fields !!!',
                status: 'error',
                isClosable: true,
            });
        }
    };

    const joinSelectedSession = (code: string) => {
        if (code) {
            // add player to game
            router.push(`/sprint-poker/${code}`);
        } else {
            toast({
                title: 'An error occured !!!',
                status: 'error',
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Container
                maxW="max-content"
                py={{ base: '12', md: '24' }}
                px={{ base: '0', sm: '8' }}
            >
                <Stack spacing="8">
                    <Box
                        py={{ base: '0', sm: '8' }}
                        px={{ base: '4', sm: '10' }}
                        bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
                        boxShadow={{
                            base: 'none',
                            sm: useColorModeValue('md', 'md-dark'),
                        }}
                        borderRadius={{ base: 'none', sm: 'xl' }}
                    >
                        <Stack spacing="5">
                            <Stack spacing="4">
                                <Tabs
                                    variant="soft-rounded"
                                    colorScheme="green"
                                    index={tabIndex}
                                >
                                    <TabList sx={{ justifyContent: 'space-around' }}>
                                        <Tab
                                            onClick={() => {
                                                setTabIndex(0);
                                            }}
                                        >
                                            Create Session
                                        </Tab>
                                        <Tab
                                            onClick={() => {
                                                setTabIndex(1);
                                            }}
                                        >
                                            Join Session
                                        </Tab>
                                        <Tab
                                            onClick={() => {
                                                setTabIndex(2);
                                            }}
                                        >
                                            Select Session
                                        </Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>
                                            <Stack spacing="6">
                                                <FormControl isRequired>
                                                    <FormLabel htmlFor="poker-session-name">
                                                        Session Name
                                                    </FormLabel>
                                                    <Input
                                                        value={sessionName}
                                                        id="poker-session-name"
                                                        placeholder="Session Name"
                                                        onChange={handleSessionNameChange}
                                                    />
                                                </FormControl>
                                                <FormControl isRequired>
                                                    <FormLabel htmlFor="cards-mode">
                                                        Cards Mode
                                                    </FormLabel>
                                                    <Select
                                                        value={cardsMode}
                                                        id="cards-mode"
                                                        onChange={handleCardsModeChange}
                                                    >
                                                        {GAME_TYPES.map(game => (
                                                            <option
                                                                key={game.id}
                                                                value={game.type}
                                                            >
                                                                {game.label}
                                                            </option>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Stack>
                                            <Button
                                                mt={8}
                                                w="100%"
                                                variant="solid"
                                                color={useColorModeValue(
                                                    'green.800',
                                                    'green.300'
                                                )}
                                                onClick={createSession}
                                            >
                                                Create Session
                                            </Button>
                                        </TabPanel>
                                        <TabPanel>
                                            <Stack spacing="6">
                                                <FormControl isRequired>
                                                    <FormLabel htmlFor="poker-session-code">
                                                        Session Code
                                                    </FormLabel>
                                                    <Input
                                                        value={sessionCode}
                                                        id="poker-session-code"
                                                        placeholder="Room Code"
                                                        onChange={handleSessionCodeChange}
                                                    />
                                                </FormControl>
                                            </Stack>
                                            <Button
                                                mt={8}
                                                w="100%"
                                                variant="solid"
                                                color={useColorModeValue(
                                                    'green.800',
                                                    'green.300'
                                                )}
                                                onClick={joinSession}
                                            >
                                                Join Session
                                            </Button>
                                        </TabPanel>
                                        <TabPanel>
                                            <Stack spacing="6">
                                                <TableContainer>
                                                    <Table variant="striped">
                                                        <Thead>
                                                            <Tr>
                                                                <Th>Session Name</Th>
                                                                <Th colSpan={2}>
                                                                    Session Code
                                                                </Th>
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                            {recentGames &&
                                                                recentGames.map(
                                                                    recentGame => (
                                                                        <Tr
                                                                            key={
                                                                                recentGame.id
                                                                            }
                                                                        >
                                                                            <Td>
                                                                                {
                                                                                    recentGame.name
                                                                                }
                                                                            </Td>
                                                                            <Td>
                                                                                {
                                                                                    recentGame.id
                                                                                }
                                                                            </Td>
                                                                            <Td>
                                                                                <Button
                                                                                    color="cyan.500"
                                                                                    onClick={() => {
                                                                                        joinSelectedSession(
                                                                                            recentGame.id
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    JOIN
                                                                                </Button>
                                                                            </Td>
                                                                        </Tr>
                                                                    )
                                                                )}
                                                        </Tbody>
                                                    </Table>
                                                </TableContainer>
                                            </Stack>
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </>
    );
};

export default PokerMainComponent;
