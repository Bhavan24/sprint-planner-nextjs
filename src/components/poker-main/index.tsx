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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CreateSession from './create-session';
import JoinSession from './join-session';
import SelectSession from './select-session';

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
