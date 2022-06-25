import { TICKET_STATUS } from '../constants';

export const getIssues = (data: any) => {
    return [
        {
            name: TICKET_STATUS[0].name,
            type: TICKET_STATUS[0].type,
            tickets: `${data.open} Tickets`,
            value: data.open,
        },
        {
            name: TICKET_STATUS[1].name,
            type: TICKET_STATUS[1].type,
            tickets: `${data.reopen} Tickets`,
            value: data.reopen,
        },
        {
            name: TICKET_STATUS[2].name,
            type: TICKET_STATUS[2].type,
            tickets: `${data.inprogress} Tickets`,
            value: data.inprogress,
        },
        {
            name: TICKET_STATUS[3].name,
            type: TICKET_STATUS[3].type,
            tickets: `${data.prcreated} Tickets`,
            value: data.prcreated,
        },
        {
            name: TICKET_STATUS[4].name,
            type: TICKET_STATUS[4].type,
            tickets: `${data.prmerged} Tickets`,
            value: data.prmerged,
        },
        {
            name: TICKET_STATUS[5].name,
            type: TICKET_STATUS[5].type,
            tickets: `${data.inverification} Tickets`,
            value: data.inverification,
        },
        {
            name: TICKET_STATUS[6].name,
            type: TICKET_STATUS[6].type,
            tickets: `${data.resolved} Tickets`,
            value: data.resolved,
        },
    ];
};

export const getTotal = (data: any) => {
    return (
        Number(data.open) +
        Number(data.reopen) +
        Number(data.resolved) +
        Number(data.inprogress) +
        Number(data.inverification) +
        Number(data.prmerged) +
        Number(data.prcreated)
    );
};

export const getUniqueId = () => {
    return Math.round(Date.now()).toString(36);
};
