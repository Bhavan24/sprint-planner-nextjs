import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { firestore } from '../../../firebase/config';
import { FB_DB_GAMES, FB_DB_PLAYERS } from '../../constants';
import { IGame, IPlayer } from '../../interfaces';

// Firebase
export const addGameToStore = async (gameId: string, data: any) => {
    const docRef = doc(firestore, FB_DB_GAMES, gameId);
    await setDoc(docRef, data);
    return true;
};

export const getGameFromStore = async (id: string): Promise<IGame | undefined> => {
    const gamesRef = doc(firestore, FB_DB_GAMES, id);
    const gamesSnap = await getDoc(gamesRef);

    let game = undefined;
    if (gamesSnap.exists()) {
        game = gamesSnap.data();
        console.log('Document data:', game);
    } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
    }
    return game as IGame;
};

export const getPlayersFromStore = async (gameId: string): Promise<IPlayer[]> => {
    const playersQuery = query(collection(firestore, FB_DB_GAMES, gameId, FB_DB_GAMES));
    const playersSnap = await getDocs(playersQuery);

    let players: IPlayer[] = [];
    playersSnap.forEach((result: any) => players.push(result.data() as IPlayer));
    return players;
};

export const getPlayerFromStore = async (
    gameId: string,
    playerId: string
): Promise<IPlayer | undefined> => {
    const playerRef = doc(firestore, FB_DB_GAMES, gameId, FB_DB_GAMES, playerId);
    const playerSnap = await getDoc(playerRef);

    let player = undefined;
    if (playerSnap.exists()) {
        player = playerSnap.data();
        console.log('Document data:', player);
    } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
    }
    return player as IPlayer;
};

export const streamData = (id: string) => {
    const docRef = doc(firestore, FB_DB_GAMES, id);
    return docRef;
};
export const streamPlayersFromStore = (id: string) => {
    const docRef = doc(firestore, FB_DB_GAMES, id, FB_DB_PLAYERS);
    return docRef;
};

export const updateGameDataInStore = async (
    gameId: string,
    data: any
): Promise<boolean> => {
    const docRef = doc(firestore, FB_DB_GAMES, gameId);
    await updateDoc(docRef, data);
    return true;
};

export const addPlayerToGameInStore = async (gameId: string, player: IPlayer) => {
    const docRef = doc(firestore, FB_DB_GAMES, gameId, FB_DB_PLAYERS, player.id);
    await setDoc(docRef, player);
    return true;
};

export const updatePlayerInStore = async (gameId: string, player: any) => {
    const docRef = doc(firestore, FB_DB_GAMES, gameId, FB_DB_PLAYERS, player.id);
    await updateDoc(docRef, player);
    return true;
};
