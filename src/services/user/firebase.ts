import {
    collection,
    doc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore';
import { firestore } from '../../../firebase/config';
import { ICommonUser } from '../../interfaces';
import { FB_DB_USERS } from './../../constants/index';

// Firebase
export const getUsersFromFirebase = async (): Promise<ICommonUser[]> => {
    const docQuery = query(collection(firestore, FB_DB_USERS));
    const snap = await getDocs(docQuery);
    let users: ICommonUser[] = [];
    snap.forEach((result: any) => {
        const data = result.data();
        users.push({
            uid: data.uid,
            email: data.email,
            displayName: data.displayName,
            photoURL: data.photoURL,
        });
    });
    return users;
};

export const updateCurrentUserDetails = async (user: any) => {
    const userId = user.uid;
    console.log(`UID: ${userId} LOGGED IN`);
    const userDoc = doc(collection(firestore, FB_DB_USERS), userId);
    setDoc(
        userDoc,
        {
            uid: userId,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        },
        { merge: true } // update fields if exists
    );
};
