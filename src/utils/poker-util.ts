import { GAME_TYPES } from '../constants';
import { ICardConfig } from '../interfaces';

export const getCards = (gameType: string | undefined) => {
    let id = 0;

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
            color: array.colorValues[i],
        });
    }

    return cards;
};
