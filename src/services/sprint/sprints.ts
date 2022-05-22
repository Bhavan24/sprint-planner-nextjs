import { ulid } from 'ulid';
import { ISprintColData } from './../../interfaces/index';
import {
    addSprintToStore,
    getSprintFromStore,
    getSprintsFromStore,
    updateSprintDataInStore,
} from './firebase';

export const addNewSprint = async (data: ISprintColData): Promise<string> => {
    const sprintData = {
        id: ulid(),
        name: data.name,
        createdById: data.createdById,
        progess: data.progess,
        retro: data.retro,
        poker: data.poker,
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
