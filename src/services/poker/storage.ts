import { POKER_PLAYER_GAMES } from '../../constants';
import { IPlayerGame } from '../../interfaces';

// Local Storage
export const getPlayerGamesFromCache = (): IPlayerGame[] => {
    const store = localStorage.getItem(POKER_PLAYER_GAMES);
    const playerGames: IPlayerGame[] = store ? JSON.parse(store) : [];
    console.log(playerGames);
    return playerGames;
};

export const isGameInPlayerCache = (gameId: string): boolean => {
    const playerGames = getPlayerGamesFromCache();
    const found = playerGames.find(playerGames => playerGames.gameId === gameId);
    const result = Boolean(found);
    console.log(result);
    return result;
};

export const updatePlayerGamesInCache = (playerGames: IPlayerGame[]) => {
    localStorage.setItem(POKER_PLAYER_GAMES, JSON.stringify(playerGames));
};
