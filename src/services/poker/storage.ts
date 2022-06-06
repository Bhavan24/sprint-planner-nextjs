import { CURRENT_JIRA_ISSUE, POKER_PLAYER_GAMES } from '../../constants';
import { IJiraIssue, IPlayerGame } from '../../interfaces';

// Local Storage
export const getPlayerGamesFromCache = (): IPlayerGame[] => {
    const store = localStorage.getItem(POKER_PLAYER_GAMES);
    const playerGames: IPlayerGame[] = store ? JSON.parse(store) : [];
    return playerGames;
};

export const isGameInPlayerCache = (gameId: string): boolean => {
    const playerGames = getPlayerGamesFromCache();
    const found = playerGames.find(playerGames => playerGames.gameId === gameId);
    const result = Boolean(found);
    return result;
};

export const updatePlayerGamesInCache = (playerGames: IPlayerGame[]) => {
    localStorage.setItem(POKER_PLAYER_GAMES, JSON.stringify(playerGames));
};

export const setCurrentJiraIssue = (jiraIssue: IJiraIssue) => {
    localStorage.setItem(CURRENT_JIRA_ISSUE, JSON.stringify(jiraIssue));
};

export const getCurrentJiraIssue = (): IJiraIssue => {
    const store = localStorage.getItem(CURRENT_JIRA_ISSUE);
    return store ? JSON.parse(store) : {};
};
