import { collection, getDocs, query } from 'firebase/firestore';
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
            fname: data.email.split('@')[0].slice(0, -1),
            email: data.email,
            photoURL: data.photoURL,
        });
    });
    return users;
};
