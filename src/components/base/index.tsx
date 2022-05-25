import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/config';
import { BasePageProps } from '../../interfaces';
import { DashboardLayout } from '../../layouts/dashboard';
import LoginPage from '../../pages/auth';
import { loginToFirebase } from '../../services/user/users';
import { Chakra } from '../../theme/chakra-theme';
import { Loading } from '../loading';

const BasePage = ({ cookies, children, title }: BasePageProps) => {
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            loginToFirebase(user);
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
