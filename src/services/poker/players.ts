import { GAME_STATUS } from './../../constants/index';
import { IGame, IPlayer, IPlayerGame } from './../../interfaces';
import {
    addPlayerToGameInStore,
    getGameFromStore,
    getPlayerFromStore,
    getPlayersFromStore,
    updatePlayerInStore,
    deletePlayerFromStore,
} from './firebase';
import { updateGameStatus } from './games';
import {
    getPlayerGamesFromCache,
    isGameInPlayerCache,
    updatePlayerGamesInCache,
} from './storage';

export const addPlayer = async (gameId: string, player: IPlayer) => {
    const game = await getGameFromStore(gameId);
    if (game) {
        addPlayerToGameInStore(gameId, player);
    }
};

export const updatePlayerValue = async (
    gameId: string,
    playerId: string,
    value: number
) => {
    const player = await getPlayerFromStore(gameId, playerId);

    if (player) {
        const updatedPlayer = {
            ...player,
            value: value,
            status: GAME_STATUS.FINISHED,
        };
        await updatePlayerInStore(gameId, updatedPlayer);
        await updateGameStatus(gameId);
        return true;
    }
    return false;
};

export const getPlayerRecentGames = async (): Promise<IGame[]> => {
    let playerGames: IPlayerGame[] = getPlayerGamesFromCache();
    let games: IGame[] = [];

    await Promise.all(
        playerGames.map(async (playerGame: IPlayerGame) => {
            const game = await getGameFromStore(playerGame.gameId);
            game && games.push(game);
        })
    );

    games.sort((a: IGame, b: IGame) => +b.createdAt - +a.createdAt);
    return games;
};

export const getCurrentPlayerId = (gameId: string): string | undefined => {
    let playerGames: IPlayerGame[] = getPlayerGamesFromCache();
    const game = playerGames.find(playerGame => playerGame.gameId === gameId);
    return game && game.playerId;
};

export const updatePlayerGames = (gameId: string, playerId: string) => {
    let playerGames: IPlayerGame[] = getPlayerGamesFromCache();
    playerGames.push({ gameId, playerId });
    updatePlayerGamesInCache(playerGames);
};

export const isCurrentPlayerInGame = (gameId: string): boolean => {
    return isGameInPlayerCache(gameId);
};

export const isCurrentPlayerIdInGame = async (
    gameId: string,
    playerId: string
): Promise<boolean> => {
    if (isGameInPlayerCache(gameId)) {
        return true;
    } else {
        const player = await getPlayerFromStore(gameId, playerId);
        return player ? true : false;
    }
};

export const addPlayerToGame = async (
    gameId: string,
    playerId: string,
    playerName: string,
    isSpectator: boolean
): Promise<boolean> => {
    const joiningGame = await getGameFromStore(gameId);

    if (!joiningGame) {
        console.log('Game not found');
        return false;
    }
    const newPlayer = {
        name: playerName,
        id: playerId,
        isSpectator: isSpectator,
        status: GAME_STATUS.NOT_STARTED,
    };

    updatePlayerGames(gameId, newPlayer.id);
    await addPlayerToGameInStore(gameId, newPlayer);

    return true;
};

export const resetPlayers = async (gameId: string) => {
    const players = await getPlayersFromStore(gameId);

    players.forEach(async player => {
        const updatedPlayer: IPlayer = {
            ...player,
            status: GAME_STATUS.NOT_STARTED,
            value: 0,
        };
        await updatePlayerInStore(gameId, updatedPlayer);
    });
};

export const deletePlayerFromGame = async (gameId: string, playerId: string) => {
    const player = await deletePlayerFromStore(gameId, playerId);
    return player ? true : false;
};
