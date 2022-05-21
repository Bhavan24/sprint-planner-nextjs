import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../../firebase/config';
import { BasePageProps } from '../../interfaces';
import { DashboardLayout } from '../../layouts/dashboard';
import LoginPage from '../../pages/auth';
import { Chakra } from '../../theme/chakra-theme';
import { Loading } from '../loading';

const BasePage = ({ cookies, children, title }: BasePageProps) => {
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            const c = collection(firestore, 'users');
            setDoc(
                doc(c, user.uid),
                {
                    email: user.email,
                    lastSeen: serverTimestamp(),
                    photoURL: user.photoURL,
                },
                { merge: true } // update fields if exists
            );
        }
    }, [user]);

    if (loading) {
        return (
            <Chakra cookies={cookies}>
                <Loading />
            </Chakra>
        );
    }

    if (!user) {
        return (
            <Chakra cookies={cookies}>
                <LoginPage />
            </Chakra>
        );
    } else {
        return (
            <Chakra cookies={cookies}>
                <DashboardLayout title={title}>{children}</DashboardLayout>
            </Chakra>
        );
    }
};

export default BasePage;
