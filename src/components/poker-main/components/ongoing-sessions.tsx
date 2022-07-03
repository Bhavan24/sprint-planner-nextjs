import {
    Divider,
    FormControl,
    FormLabel,
    IconButton,
    Stack,
    Switch,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tooltip,
    Tr,
    useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BiLogIn } from 'react-icons/bi';
import { auth } from '../../../../firebase/config';
import { getAllGames } from '../../../services/poker/games';
import {
    addPlayerToGame,
    isCurrentPlayerIdInGame,
} from '../../../services/poker/players';

const OnGoingSessions = () => {
    // router
    const router = useRouter();
    // user
    const [user] = useAuthState(auth);
    // states
    const [onGoingGames, setOnGoingGames] = useState<any[]>([]);
    const [isSpectator, setSpectator] = useState(false);
    // toast
    const toast = useToast();

    useEffect(() => {
        async function fetchData() {
            const games = await getAllGames();
            const currentGamesArray: { id: any; name: any }[] = [];

            games.forEach((game: any) => {
                currentGamesArray.push({
                    id: game.data().id,
                    name: game.data().name,
                });
            });

            setOnGoingGames(currentGamesArray);
        }
        fetchData();
    }, []);

    async function fetchData(code: string) {
        if (code && user) {
            if (await isCurrentPlayerIdInGame(code, user.uid)) {
                return true;
            }
        }
        return false;
    }

    const joinSelectedSession = (code: string) => {
        fetchData(code).then(async isPlayer => {
            if (isPlayer) {
                router.push(`/sprint-poker/${code}`);
            } else {
                if (code) {
                    const res = user
                        ? await addPlayerToGame(
                              code,
                              user.uid,
                              user.displayName || user.email || '',
                              isSpectator
                          )
                        : null;
                    res && router.push(`/sprint-poker/${code}`);
                } else {
                    toast({
                        title: 'An error occured !!!',
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
                <TableContainer>
                    <Table variant="striped" size="sm">
                        <Thead>
                            <Tr>
                                <Th>Session Name</Th>
                                <Th colSpan={2}>Session Code</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {onGoingGames &&
                                onGoingGames.map((recentGame, i: number) => (
                                    <Tr key={i}>
                                        <Td>{recentGame.name}</Td>
                                        <Td>{recentGame.id}</Td>
                                        <Td>
                                            <Tooltip label="Join Session">
                                                <IconButton
                                                    aria-label="session"
                                                    colorScheme="blue"
                                                    icon={<BiLogIn />}
                                                    onClick={() => {
                                                        joinSelectedSession(
                                                            recentGame.id
                                                        );
                                                    }}
                                                />
                                            </Tooltip>
                                        </Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </TableContainer>
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
        </>
    );
};

export default OnGoingSessions;
