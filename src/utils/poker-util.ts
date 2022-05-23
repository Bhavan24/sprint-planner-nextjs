import { GAME_TYPES } from '../constants';
import { IAssigneeDetails, ICardConfig } from '../interfaces';
import { IGame, ISprintPokerColData } from './../interfaces/index';

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

function mapToProp(data: any, prop: any) {
    return data.reduce(
        (res: any, item: any) =>
            Object.assign(res, {
                [item[prop]]: 1 + (res[item[prop]] || 0),
            }),
        Object.create(null)
    );
}

export const getAssigneeDetails = (tickets: ISprintPokerColData[]) => {
    const tempList: IAssigneeDetails[] = [];
    const mainList: IAssigneeDetails[] = [];
    tickets.forEach((ticket: ISprintPokerColData) => {
        tempList.push({ name: ticket.assignee, points: ticket.points });
    });
    if (tempList) {
        const details = mapToProp(tempList, 'name');
        for (var key of Object.keys(details)) {
            mainList.push({
                name: key,
                points: details[key],
            });
        }
    }
    return mainList;
};
