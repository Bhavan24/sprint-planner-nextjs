import { ulid } from 'ulid';
import { GAME_STATUS } from '../../constants';
import { INewSession, IPlayer } from './../../interfaces/index';
import {
    addGameToStore,
    addPlayerToGameInStore,
    getGameFromStore,
    getPlayersFromStore,
    streamData,
    streamPlayersFromStore,
    updateGameDataInStore,
} from './firebase';
import { resetPlayers, updatePlayerGames } from './players';

export const addNewGame = async (newSession: INewSession): Promise<string> => {
    const player = {
        name: newSession.userName,
        id: newSession.userId,
        status: GAME_STATUS.NOT_STARTED,
    };
    const gameData = {
        id: ulid(),
        name: newSession.name,
        gameType: newSession.gameType,
        createdAt: newSession.createdAt,
        createdById: player.id,
        gameStatus: GAME_STATUS.STARTED,
        average: 0,
        sprintId: newSession.sprintId,
    };
    await addGameToStore(gameData.id, gameData);
    await addPlayerToGameInStore(gameData.id, player);
    updatePlayerGames(gameData.id, player.id);
    return gameData.id;
};

export const streamGame = (id: string) => {
    return streamData(id);
};

export const streamPlayers = (id: string) => {
    return streamPlayersFromStore(id);
};

export const getGame = (id: string) => {
    return getGameFromStore(id);
};

export const updateGame = async (gameId: string, updatedGame: any): Promise<boolean> => {
    await updateGameDataInStore(gameId, updatedGame);
    return true;
};

export const resetGame = async (gameId: string) => {
    const game = await getGameFromStore(gameId);
    if (game) {
        const updatedGame = {
            average: 0,
            gameStatus: GAME_STATUS.STARTED,
        };
        updateGame(gameId, updatedGame);
        await resetPlayers(gameId);
    }
};

export const finishGame = async (gameId: string) => {
    const game = await getGameFromStore(gameId);
    const players = await getPlayersFromStore(gameId);

    if (game && players) {
        const updatedGame = {
            average: getAverage(players),
            gameStatus: GAME_STATUS.FINISHED,
        };
        updateGame(gameId, updatedGame);
    }
};

export const getAverage = (players: IPlayer[]): number => {
    let values = 0;
    let numberOfPlayersPlayed = 0;
    players.forEach(player => {
        if (player.status === GAME_STATUS.FINISHED && player.value && player.value >= 0) {
            values = values + player.value;
            numberOfPlayersPlayed++;
        }
    });
    return values / numberOfPlayersPlayed;
};

export const getGameStatus = (players: IPlayer[]): GAME_STATUS => {
    let numberOfPlayersPlayed = 0;
    players.forEach((player: IPlayer) => {
        if (player.status === GAME_STATUS.FINISHED) {
            numberOfPlayersPlayed++;
        }
    });
    if (numberOfPlayersPlayed === 0) {
        return GAME_STATUS.STARTED;
    }
    return GAME_STATUS.IN_PROGRESS;
};

export const updateGameStatus = async (gameId: string): Promise<boolean> => {
    const game = await getGame(gameId);
    if (!game) {
        console.log('Game not found');
        return false;
    }
    const players = await getPlayersFromStore(gameId);
    if (players) {
        const status = getGameStatus(players);
        const dataToUpdate = {
            gameStatus: status,
        };
        const result = await updateGameDataInStore(gameId, dataToUpdate);
        return result;
    }
    return false;
};
