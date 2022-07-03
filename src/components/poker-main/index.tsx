// React imports
import { useEffect, useState } from 'react';
// Next imports
import { useRouter } from 'next/router';
// Chakra-UI imports
import {
    Box,
    Container,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react';
// Component imports
import CreateSession from './components/create-session';
import JoinSession from './components/join-session';
import SelectSession from './components/select-session';
import OnGoingSessions from './components/ongoing-sessions';

const PokerMainComponent = () => {
    // router
    const router = useRouter();
    // states
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        if (!router.isReady) return;
        const { join } = router.query;
        join && setTabIndex(1);
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
                                        <Tab
                                            onClick={() => {
                                                setTabIndex(3);
                                            }}
                                        >
                                            Ongoing Sessions
                                        </Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>
                                            <CreateSession />
                                        </TabPanel>
                                        <TabPanel>
                                            <JoinSession />
                                        </TabPanel>
                                        <TabPanel>
                                            <SelectSession />
                                        </TabPanel>
                                        <TabPanel>
                                            <OnGoingSessions />
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
