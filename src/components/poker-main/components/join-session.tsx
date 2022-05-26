import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Switch,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../../firebase/config';
import { getGame } from '../../../services/poker/games';
import { addPlayerToGame, isCurrentPlayerInGame } from '../../../services/poker/players';

const JoinSession = () => {
    // router
    const router = useRouter();
    // user
    const [user] = useAuthState(auth);
    // states
    const [sessionCode, setSessionCode] = useState('');
    const [isSpectator, setSpectator] = useState(false);
    // toast
    const toast = useToast();

    useEffect(() => {
        if (!router.isReady) return;
        const { join } = router.query;
        join && setSessionCode(join.toString());
    }, [router.isReady]);

    async function fetchData() {
        if (sessionCode) {
            if (await getGame(sessionCode)) {
                if (isCurrentPlayerInGame(sessionCode)) {
                    return true;
                }
            }
        }
        return false;
    }

    // TODO: fix
    // useEffect(() => {
    //     fetchData();
    // }, [sessionCode, router]);

    const handleSessionCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSessionCode(e.target.value);
    };

    const joinSession = async () => {
        fetchData().then(async isPlayer => {
            if (isPlayer) {
                router.push(`/sprint-poker/${sessionCode}`);
            } else {
                if (sessionCode) {
                    const res = user
                        ? await addPlayerToGame(
                              sessionCode,
                              user.displayName || user.email || '',
                              isSpectator
                          )
                        : null;
                    res && router.push(`/sprint-poker/${sessionCode}`);
                } else {
                    toast({
                        title: 'Please fill all fields !!!',
                        status: 'error',
                        isClosable: true,
                        position: 'bottom-left',
                    });
                }
            }
        });
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
                <FormControl display="flex" alignItems="center">
                    <Switch
                        id="switch-spectator"
                        mr={5}
                        onChange={() => {
                            setSpectator(!isSpectator);
                        }}
                    />
                    <FormLabel htmlFor="switch-spectator" mb="0">
                        Join as spectator
                    </FormLabel>
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
