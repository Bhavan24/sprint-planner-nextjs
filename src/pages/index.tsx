import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MainComponent } from '../components/main';
import { APP_NAME } from '../constants';
import { IndexProps } from '../interfaces';
import { DashboardLayout } from '../layouts/dashboard';
import { Chakra } from '../theme/Chakra';
import LoginPage from './auth';
import { auth, firestore } from '../../firebase/config';

const IndexPage = ({ cookies }: IndexProps) => {
    const [user, loading, error] = useAuthState(auth);

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

    if (loading) return <p>Loading...</p>;

    if (!user) {
        return (
            <Chakra cookies={cookies}>
                <LoginPage />
            </Chakra>
        );
    } else {
        return (
            <Chakra cookies={cookies}>
                <DashboardLayout title={APP_NAME}>
                    <MainComponent />
                </DashboardLayout>
            </Chakra>
        );
    }
};

export default IndexPage;
