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

function mapToProp(data: any) {
    var holder: any = {};
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
        for (var key of Object.keys(details)) {
            mainList.push({
                name: key,
                point: details[key],
            });
        }
    }
    return mainList;
};
