import { Container, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import { ReactNode } from 'react';
import { Header } from '../../components/header';

type Props = {
    children?: ReactNode;
    title?: string;
};

export const DashboardLayout = ({ children, title = 'Sprint Planner' }: Props) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container maxWidth={'100%'} padding={0} margin={0}>
                <Header />
                {children}
            </Container>
        </div>
    );
};
