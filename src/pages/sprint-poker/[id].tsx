import { Box, Text } from '@chakra-ui/react';
import { onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BasePage from '../../components/auth-base-component';
import { Loading } from '../../components/loading';
import PokerCardPicker from '../../components/poker-main/poker-card-picker';
import PokerController from '../../components/poker-main/poker-controller';
import PokerPlayers from '../../components/poker-main/poker-players';
import { SPRINT_POKER_PAGE_NAME } from '../../constants';
import { IGame, IPlayer } from '../../interfaces';
import { streamGame, streamPlayers } from '../../services/poker/games';
import { getCurrentPlayerId } from '../../services/poker/players';
import { Chakra } from '../../theme/Chakra';

const SprintPokerGame = () => {
    const router = useRouter();

    // state
    const [game, setGame] = useState<IGame | undefined>(undefined);
    const [players, setPlayers] = useState<IPlayer[] | undefined>(undefined);
    const [loading, setIsLoading] = useState(true);
    const [currentPlayerId, setCurrentPlayerId] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!router.isReady) return;
        const { id } = router.query;
        async function fetchData(id: string) {
            setIsLoading(true);

            onSnapshot(streamGame(id), snapshot => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    console.log(' data: ', data);
                    if (data) {
                        setGame(data as IGame);
                        setIsLoading(false);
                        return;
                    }
                }
                setIsLoading(false);
            });

            onSnapshot(streamPlayers(id), doc => {
                const players: IPlayer[] = [];
                doc.forEach(snapshot => {
                    players.push(snapshot.data() as IPlayer);
                });
                setPlayers(players);
            });

            const currentPlayerId = getCurrentPlayerId(id);
            if (!currentPlayerId) {
                router.push(`/?join=${id}`);
            }
            setCurrentPlayerId(currentPlayerId);
        }
        id && fetchData(id.toString());
    }, [router.isReady]);

    if (loading) {
        return (
            <Chakra>
                <Loading />
            </Chakra>
        );
    }

    return (
        <BasePage title={SPRINT_POKER_PAGE_NAME}>
            <Box textAlign="center" fontSize="xl" m={5}>
                {game && players && currentPlayerId ? (
                    <>
                        <Box textAlign="center" m={5}>
                            <PokerPlayers />
                        </Box>
                        <Box textAlign="center" m={5}>
                            <PokerController />
                        </Box>
                        <Box textAlign="center" m={5}>
                            <Box m={2}>{'Choose your card 👇'}</Box>
                            <PokerCardPicker
                                game={game}
                                players={players}
                                currentPlayerId={currentPlayerId}
                            />
                        </Box>
                    </>
                ) : (
                    <Text color="red.400"> Game not found!!! </Text>
                )}
            </Box>
        </BasePage>
    );
};

export default SprintPokerGame;
