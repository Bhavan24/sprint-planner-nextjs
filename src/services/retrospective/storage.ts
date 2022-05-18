import { WENT_WELL_ITEMS } from '../../constants';
import { ACTION_ITEMS, TO_IMRPOVE_ITEMS } from './../../constants/index';

// Local Storage
export const saveWentWellList = (array: string[]) => {
    localStorage.setItem(WENT_WELL_ITEMS, JSON.stringify(array));
};

export const saveActionItemsList = (array: string[]) => {
    localStorage.setItem(ACTION_ITEMS, JSON.stringify(array));
};

export const saveToImproveItemsList = (array: string[]) => {
    localStorage.setItem(TO_IMRPOVE_ITEMS, JSON.stringify(array));
};

export const getWentWellList = (): string[] => {
    const store = localStorage.getItem(WENT_WELL_ITEMS);
    const went_well_items: string[] = store ? JSON.parse(store) : [];
    console.log(went_well_items);
    return went_well_items;
};

export const getActionItemsList = (): string[] => {
    const store = localStorage.getItem(ACTION_ITEMS);
    const action_items: string[] = store ? JSON.parse(store) : [];
    console.log(action_items);
    return action_items;
};

export const getToImproveItemsList = (): string[] => {
    const store = localStorage.getItem(TO_IMRPOVE_ITEMS);
    const to_improve_items: string[] = store ? JSON.parse(store) : [];
    console.log(to_improve_items);
    return to_improve_items;
};

export const resetAllItems = () => {
    localStorage.setItem(WENT_WELL_ITEMS, JSON.stringify([]));
    localStorage.setItem(TO_IMRPOVE_ITEMS, JSON.stringify([]));
    localStorage.setItem(ACTION_ITEMS, JSON.stringify([]));
};
