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
import CreateSession from './create-session';
import JoinSession from './join-session';
import SelectSession from './select-session';

const PokerMainComponent = () => {
    // router
    const router = useRouter();
    // states
    const [sessionCode, setSessionCode] = useState('');
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        if (!router.isReady) return;
        const { join } = router.query;
        join && setTabIndex(1);
        join && setSessionCode(join.toString());
        console.log(join);
    }, [router.isReady]);

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
                                            <CreateSession />
                                        </TabPanel>
                                        <TabPanel>
                                            <JoinSession code={sessionCode} />
                                        </TabPanel>
                                        <TabPanel>
                                            <SelectSession />
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
