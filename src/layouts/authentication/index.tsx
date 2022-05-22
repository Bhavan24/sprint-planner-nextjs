import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import { APP_NAME } from '../../constants';
import { AuthenticationLayoutProps } from '../../interfaces';

// styles
export const ContainerStyle = {
    maxWidth: '100%',
    padding: 0,
    margin: 0,
};

export const AuthenticationLayout = ({
    children,
    title = APP_NAME,
}: AuthenticationLayoutProps) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container sx={ContainerStyle}>{children}</Container>
        </>
    );
};
