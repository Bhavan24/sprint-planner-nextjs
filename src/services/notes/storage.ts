import { NOTES } from '../../constants';

// Local Storage
export const getNotesFromStorage = () => {
    const notes = localStorage.getItem(NOTES);
    const list: string[] = notes ? JSON.parse(notes) : [];
    console.log(list);
    return list;
};

export const addNoteToStorage = (new_array: string[]) => {
    localStorage.setItem(NOTES, JSON.stringify(new_array));
};

export const deleteNotesFromStorage = () => {
    localStorage.removeItem(NOTES);
};

export const removeNoteFromStorage = (new_array: string[]) => {
    localStorage.setItem(NOTES, JSON.stringify(new_array));
};
