import {
    ChakraProvider,
    createCookieStorageManager,
    localStorageManager,
} from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';
import { ChakraProps } from '../interfaces';

export const Chakra = ({ children, cookies }: ChakraProps) => {
    return (
        <ChakraProvider
            colorModeManager={
                cookies ? createCookieStorageManager(cookies) : localStorageManager
            }
        >
            {children}
        </ChakraProvider>
    );
};

export type ServerSideProps<T> = { props: T } | Promise<{ props: T }>;

export function getServerSideProps({
    req,
}: GetServerSidePropsContext): ServerSideProps<{ cookies?: string }> {
    return {
        props: {
            cookies: req.headers.cookie ?? '',
        },
    };
}
