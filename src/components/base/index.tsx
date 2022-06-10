// React imports
import { useEffect } from 'react';
// Chakra-UI imports
import { Chakra } from '../../theme/chakra-theme';
// Component imports
import { DashboardLayout } from '../../layouts/dashboard';
import LoginPage from '../../pages/auth';
import { Loading } from '../loading';
// Firebase imports
import { auth } from '../../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { loginToFirebase } from '../../services/user/users';
// Type imports
import { BasePageProps } from './types';


const BasePage = ({ cookies, children, title }: BasePageProps) => {
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            loginToFirebase(user);
        }
    }, [user]);

    return (
        <Chakra cookies={cookies}>
            {loading && <Loading />}
            {!loading &&
                (
                    user ? (
                        <DashboardLayout title={title}>{children}</DashboardLayout>
                    ) : (
                        <LoginPage />
                    )
                )}
        </Chakra>
    );
};

export default BasePage;
