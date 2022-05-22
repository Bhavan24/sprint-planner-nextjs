import { TICKET_STATUS } from '../constants';

export const getIssues = (data: any) => {
    return [
        {
            name: TICKET_STATUS[0].name,
            tickets: `${data.open} Tickets`,
        },
        {
            name: TICKET_STATUS[1].name,
            tickets: `${data.reopen} Tickets`,
        },
        {
            name: TICKET_STATUS[2].name,
            tickets: `${data.inprogress} Tickets`,
        },
        {
            name: TICKET_STATUS[3].name,
            tickets: `${data.prcreated} Tickets`,
        },
        {
            name: TICKET_STATUS[4].name,
            tickets: `${data.prmerged} Tickets`,
        },
        {
            name: TICKET_STATUS[5].name,
            tickets: `${data.inverification} Tickets`,
        },
        {
            name: TICKET_STATUS[6].name,
            tickets: `${data.resolved} Tickets`,
        },
    ];
};

export const getTotal = (data: any) => {
    const total =
        Number(data.open) +
        Number(data.reopen) +
        Number(data.resolved) +
        Number(data.inprogress) +
        Number(data.inverification) +
        Number(data.prmerged) +
        Number(data.prcreated);
    return total;
};
