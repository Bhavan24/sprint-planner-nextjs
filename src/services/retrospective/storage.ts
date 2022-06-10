import { ACTION_ITEMS, TO_IMPROVE_ITEMS, WENT_WELL_ITEMS } from '../../constants';

// Local Storage
export const saveRetroList = (name: string, array: string[]) => {
    localStorage.setItem(name, JSON.stringify(array));
};

export const getRetroList = (name: string) => {
    const store = localStorage.getItem(name);
    const list: string[] = store ? JSON.parse(store) : [];
    console.log(list);
    return list;
};

export const resetAllItems = () => {
    localStorage.setItem(WENT_WELL_ITEMS, JSON.stringify([]));
    localStorage.setItem(TO_IMPROVE_ITEMS, JSON.stringify([]));
    localStorage.setItem(ACTION_ITEMS, JSON.stringify([]));
};
