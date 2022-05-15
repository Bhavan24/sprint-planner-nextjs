import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/config';
import { Header } from '../../components/header';
import { APP_NAME } from '../../constants';
import { DashboardLayoutProps } from '../../interfaces';

// styles
export const ContainerStyle = {
    maxWidth: '100%',
    padding: 0,
    margin: 0,
};

export const DashboardLayout = ({ children, title = APP_NAME }: DashboardLayoutProps) => {
    const [user] = useAuthState(auth);

    const avatar = {
        name: user?.displayName?.toString() || '',
        src: user?.photoURL?.toString() || '',
    };

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container sx={ContainerStyle}>
                <Header avatar={avatar} />
                {children}
            </Container>
        </>
    );
};
