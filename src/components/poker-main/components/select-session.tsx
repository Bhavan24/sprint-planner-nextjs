import {
    IconButton,
    Stack,
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
import { IGame } from '../../../interfaces';
import { getPlayerRecentGames } from '../../../services/poker/players';

const SelectSession = () => {
    // router
    const router = useRouter();
    // user
    const [user] = useAuthState(auth);
    // states
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

    const joinSelectedSession = (code: string) => {
        if (code) {
            // add player to game
            console.log(user);
            router.push(`/sprint-poker/${code}`);
        } else {
            toast({
                title: 'An error occured !!!',
                status: 'error',
                isClosable: true,
                position: 'bottom-left',
            });
        }
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
                            {recentGames &&
                                recentGames.map((recentGame, i: number) => (
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
            </Stack>
        </>
    );
};

export default SelectSession;
