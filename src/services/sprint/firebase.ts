import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { firestore } from '../../../firebase/config';
import { ISprintColData } from '../../interfaces';
import { FB_DB_SPRINTS } from './../../constants/index';

// Firebase
export const addSprintToStore = async (id: string, data: any) => {
    const docRef = doc(firestore, FB_DB_SPRINTS, id);
    await setDoc(docRef, data);
    return true;
};

export const getSprintsFromStore = async (): Promise<ISprintColData[]> => {
    const docQuery = query(collection(firestore, FB_DB_SPRINTS));
    const snap = await getDocs(docQuery);

    let sprints: ISprintColData[] = [];
    snap.forEach((result: any) => sprints.push(result.data() as ISprintColData));
    return sprints;
};

export const getSprintFromStore = async (
    sprintId: string
): Promise<ISprintColData | undefined> => {
    const docRef = doc(firestore, FB_DB_SPRINTS, sprintId);
    const snap = await getDoc(docRef);

    let sprint = undefined;
    if (snap.exists()) {
        sprint = snap.data();
        console.log('Document data:', sprint);
    } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
    }
    return sprint as ISprintColData;
};

export const updateSprintDataInStore = async (
    sprintId: string,
    data: any
): Promise<boolean> => {
    const docRef = doc(firestore, FB_DB_SPRINTS, sprintId);
    await updateDoc(docRef, data);
    return true;
};
