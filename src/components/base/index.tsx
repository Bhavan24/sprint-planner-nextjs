import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/config';
import { DashboardLayout } from '../../layouts/dashboard';
import LoginPage from '../../pages/auth';
import { loginToFirebase } from '../../services/user/users';
import { Chakra } from '../../theme/chakra-theme';
import { Loading } from '../loading';
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
                (user ? (
                    <DashboardLayout title={title}>{children}</DashboardLayout>
                ) : (
                    <LoginPage />
                ))}
        </Chakra>
    );
};

export default BasePage;
