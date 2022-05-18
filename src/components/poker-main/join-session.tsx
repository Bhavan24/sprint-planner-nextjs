import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/config';

const JoinSession = ({ code }: { code: string }) => {
    // router
    const router = useRouter();
    // user
    const [user] = useAuthState(auth);
    // states
    const [sessionCode, setSessionCode] = useState(code);
    // toast
    const toast = useToast();

    const handleSessionCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSessionCode(e.target.value);
    };

    const joinSession = () => {
        if (sessionCode) {
            // add player to game
            console.log(user);
            router.push(`/sprint-poker/${sessionCode}`);
        } else {
            toast({
                title: 'Please fill all fields !!!',
                status: 'error',
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Stack spacing="6">
                <FormControl isRequired>
                    <FormLabel htmlFor="poker-session-code">Session Code</FormLabel>
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
                color={useColorModeValue('green.800', 'green.300')}
                onClick={joinSession}
            >
                Join Session
            </Button>
        </>
    );
};

export default JoinSession;
