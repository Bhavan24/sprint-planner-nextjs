import { IGame, ISprintPokerColData } from './../interfaces/index';
import { GAME_TYPES } from '../constants';
import { ICardConfig } from '../interfaces';

export const getCards = (game: IGame | undefined) => {
    let id = 0;
    const gameType = game?.gameType;
    switch (gameType) {
        case GAME_TYPES[0].type:
            id = 0;
            break;
        case GAME_TYPES[1].type:
            id = 1;
            break;
        case GAME_TYPES[2].type:
            id = 2;
            break;
    }

    let cards: ICardConfig[] = [];
    let array = GAME_TYPES[id];
    for (let i = 0; i < array.values.length; i++) {
        cards.push({
            value: array.values[i],
            displayValue: array.displayValues[i],
        });
    }

    return cards;
};

// TEMP
export const getAssigneeDetails = (sprint: ISprintPokerColData) => {
    console.log(sprint);
};

export const assigneeDetails = [
    { name: 'bhavan', points: 10 },
    { name: 'sahas', points: 8 },
    { name: 'venura', points: 9 },
    { name: 'senesh', points: 5 },
    { name: 'eranga', points: 6 },
    { name: 'methmal', points: 4 },
    { name: 'achila', points: 3 },
];
