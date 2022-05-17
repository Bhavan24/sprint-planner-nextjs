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
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GAME_TYPES } from '../../constants';

const PokerMainComponent = () => {
    const router = useRouter();
    const [sessionName, setSessionName] = useState('');
    const [cardsMode, setCardsMode] = useState(1);
    const [sessionCode, setSessionCode] = useState('');
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        if (!router.isReady) return;
        const { join } = router.query;
        join && setTabIndex(1);
        setSessionCode(join?.toString() || '');
    }, [router.isReady]);

    const handleSessionNameChange = (e: any) => {
        setSessionName(e.target.value);
    };

    const handleCardsModeChange = (e: any) => {
        setCardsMode(e.target.value);
    };

    const handleSessionCodeChange = (e: any) => {
        setSessionCode(e.target.value);
    };

    const createSession = (e: any) => {
        console.log(sessionName, cardsMode);
    };

    const joinSession = (e: any) => {
        console.log(sessionCode);
    };

    useEffect(() => {}, []);

    return (
        <>
            <Container
                maxW="lg"
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
                        <Stack spacing="6">
                            <Stack spacing="5">
                                <Tabs
                                    variant="soft-rounded"
                                    colorScheme="green"
                                    index={tabIndex}
                                >
                                    <TabList>
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
                                                        placeholder="Cards Mode"
                                                        onChange={handleCardsModeChange}
                                                    >
                                                        {GAME_TYPES.map(game => (
                                                            <option
                                                                key={game.id}
                                                                value={game.id}
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
