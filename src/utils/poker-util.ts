import { GAME_TYPES } from '../constants';
import { IAssigneeDetails, ICardConfig, IGame, ISprintPokerColData } from '../interfaces';

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
            displayValue: array.displayValues[i]
        });
    }

    return cards;
};

function mapToProp(data: any) {
    const holder: any = {};
    data.forEach((e: any) => {
        holder[e.name] = holder.hasOwnProperty(e.name)
            ? Number(holder[e.name]) + Number(e.point)
            : Number(e.point);
    });
    return holder;
}

export const getAssigneeDetails = (tickets: ISprintPokerColData[]) => {
    const tempList: IAssigneeDetails[] = [];
    const mainList: IAssigneeDetails[] = [];
    tickets.forEach((ticket: ISprintPokerColData) => {
        tempList.push({ name: ticket.assignee, point: ticket.points });
    });
    if (tempList) {
        const details = mapToProp(tempList);
        for (const key of Object.keys(details)) {
            mainList.push({
                name: key,
                point: details[key]
            });
        }
    }
    return mainList;
};

export const getPoints = (game: IGame | undefined) => {
    switch (game?.gameType) {
        case GAME_TYPES[0].type:
            return GAME_TYPES[0].values;
        case GAME_TYPES[1].type:
            return GAME_TYPES[1].values;
        case GAME_TYPES[2].type:
            return GAME_TYPES[2].values;
    }
    return [];
};