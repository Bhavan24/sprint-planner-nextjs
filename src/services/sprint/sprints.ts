import { ulid } from 'ulid';
import { ISprintColData, ISprintPokerColData } from '../../interfaces';
import { addSprintToStore, getSprintFromStore, getSprintsFromStore, updateSprintDataInStore } from './firebase';

export const addNewSprint = async (data: ISprintColData): Promise<string> => {
    const sprintData = {
        id: ulid(),
        name: data.name,
        createdById: data.createdById,
        progress: data.progress,
        retro: data.retro
    };
    await addSprintToStore(sprintData.id, sprintData);
    return sprintData.id;
};

export const getSprints = async () => {
    return await getSprintsFromStore();
};

export const getSprint = async (sprintId: string) => {
    return await getSprintFromStore(sprintId);
};

export const getSprintPokerDetails = async (sprintId: string) => {
    const result = await getSprint(sprintId);
    return result?.poker as ISprintPokerColData[];
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
