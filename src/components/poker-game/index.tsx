// React imports
import { useEffect, useState } from 'react';
// Next imports
import { useRouter } from 'next/router';
// Firebase imports
import { auth } from '../../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { onSnapshot } from 'firebase/firestore';
// Chakra-UI imports
import { Box, Text } from '@chakra-ui/react';
// Component imports
import PokerCardPicker from './components/poker-card-picker';
import PokerController from './components/poker-controller';
import PokerPlayers from './components/poker-players';
import { Loading } from '../loading';
import { streamGame, streamPlayers } from '../../services/poker/games';
import { getCurrentPlayerId } from '../../services/poker/players';
import { Chakra } from '../../theme/chakra-theme';
// Type imports
import { IGame, IPlayer } from '../../interfaces';
// Constant imports


const SprintPokerGameComponent = () => {
    const router = useRouter();

    // state
    const [game, setGame] = useState<IGame | undefined>(undefined);
    const [players, setPlayers] = useState<IPlayer[] | undefined>(undefined);
    const [loading, setIsLoading] = useState(true);
    const [currentPlayerId, setCurrentPlayerId] = useState<string | undefined>(undefined);
    const [isSpectator, setSpectator] = useState(false);
    // user
    const [user] = useAuthState(auth);
    console.log({ user });

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
                await router.push(`/sprint-poker/${id}`);
            }
            setCurrentPlayerId(currentPlayerId);
        }

        id && fetchData(id.toString());
    }, [router.isReady]);

    useEffect(() => {
        // set isSpectator
        const player = players
            ? players.find(player => player.id === currentPlayerId)
            : null;
        player && setSpectator(player.isSpectator);
    }, [players, currentPlayerId]);

    if (loading) {
        return (
            <Chakra>
                <Loading />
            </Chakra>
        );
    }

    return (
        <>
            {game && players && currentPlayerId ? (
                <>
                    <Box textAlign='center' m={5}>
                        <PokerPlayers game={game} players={players} />
                    </Box>
                    <Box textAlign='center' m={5}>
                        <PokerController game={game} currentPlayerId={currentPlayerId} />
                    </Box>
                    {isSpectator ? (
                        <>You are on spectator mode 🧐</>
                    ) : (
                        <Box textAlign='center' m={5}>
                            <Box m={2}>{'Choose your card 👇'}</Box>
                            <PokerCardPicker
                                game={game}
                                players={players}
                                currentPlayerId={currentPlayerId}
                            />
                        </Box>
                    )}
                </>
            ) : (
                <Text color='red.400'> Game not found!!! </Text>
            )}
        </>
    );
};

export default SprintPokerGameComponent;
