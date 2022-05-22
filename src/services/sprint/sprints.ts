import { ulid } from 'ulid';
import { ISprintColData } from './../../interfaces/index';
import {
    addSprintToStore,
    getSprintFromStore,
    getSprintsFromStore,
    updateSprintDataInStore,
} from './firebase';

export const addNewSprint = async (data: ISprintColData): Promise<string> => {
    const progess = {
        open: data.progess.open,
        reopen: data.progess.reopen,
        inprogress: data.progess.inprogress,
        prcreated: data.progess.prcreated,
        prmerged: data.progess.prmerged,
        inverification: data.progess.inverification,
        resolved: data.progess.resolved,
    };
    const retro = {
        wentwell: data.retro.wentwell,
        toimprove: data.retro.toimprove,
        action: data.retro.action,
    };
    const poker = {
        title: data.poker.title,
        desc: data.poker.desc,
        link: data.poker.link,
        points: data.poker.points,
    };
    const sprintData = {
        id: ulid(),
        name: data.name,
        progess: progess,
        retro: retro,
        poker: poker,
    };
    await addSprintToStore(sprintData.id, sprintData);
    return sprintData.id;
};

export const getSprints = async () => {
    const result = await getSprintsFromStore();
    return result;
};

export const getSprint = async (sprintId: string) => {
    const result = await getSprintFromStore(sprintId);
    return result;
};

export const updateSprintData = async (sprintId: string, data: any): Promise<boolean> => {
    const sprint = await getSprint(sprintId);
    if (!sprint) {
        console.log('Sprint not found');
        return false;
    }
    await updateSprintDataInStore(sprintId, data);
    return true;
};
