import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Spinner,
    Stack,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react';
import { JaaSMeeting } from '@jitsi/react-sdk';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/config';

const MeetComponent = () => {
    const [user] = useAuthState(auth);
    const appId = `${process.env.NEXT_PUBLIC_JITSI_APP_ID}`;
    const email = `${user?.email}`;

    const [roomName, setRoomName] = useState(`meet-${Date.now()}`);
    const [displayName, setDisplayName] = useState(`${user?.displayName}`);
    const [meetVisible, setMeetVisible] = useState(false);

    const handleJitsiIFrameRef = (iframeRef: any) => {
        iframeRef.style.border = '2em solid #FFFFFF';
        iframeRef.style.background = '#FFFFFF';
        iframeRef.style.height = '100vh';
    };

    const handleRoomNameChange = (e: any) => {
        setRoomName(e.target.value);
    };

    const handleDisplayNameChange = (e: any) => {
        setDisplayName(e.target.value);
    };

    const renderSpinner = () => (
        <Container py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
        </Container>
    );

    return (
        <>
            <Container
                py={{ base: '12', md: '24' }}
                px={{ base: '0', sm: '8' }}
                hidden={meetVisible}
            >
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
                        <FormControl isRequired>
                            <FormLabel htmlFor="poker-session-name">Room Name</FormLabel>
                            <Input
                                value={roomName}
                                id="poker-session-name"
                                placeholder="Session Name"
                                onChange={handleRoomNameChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="poker-session-name">
                                Display Name
                            </FormLabel>
                            <Input
                                value={displayName}
                                id="poker-session-name"
                                placeholder="Session Name"
                                onChange={handleDisplayNameChange}
                            />
                        </FormControl>
                    </Stack>
                    <Button
                        mt={8}
                        w="100%"
                        variant="solid"
                        color={useColorModeValue('green.800', 'green.300')}
                        onClick={() => {
                            setMeetVisible(true);
                        }}
                    >
                        Create Meeting
                    </Button>
                </Box>
            </Container>
            {meetVisible && (
                <JaaSMeeting
                    getIFrameRef={handleJitsiIFrameRef}
                    appId={appId}
                    roomName={roomName}
                    spinner={renderSpinner}
                    userInfo={{
                        displayName: displayName,
                        email: email,
                    }}
                    onReadyToClose={() => {
                        setMeetVisible(false);
                    }}
                />
            )}
        </>
    );
};

export default MeetComponent;
