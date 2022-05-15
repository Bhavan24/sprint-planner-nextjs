import { ReactNode } from 'react';
import Head from 'next/head';
import { Container, Flex, Heading, HStack, useColorModeValue } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { NextChakraLink } from './NextChakraLink';

type Props = {
    children?: ReactNode;
    title?: string;
};

export const Layout = ({ children, title = 'This is the default title' }: Props) => {
    const headerColor = useColorModeValue('gray.600', 'gray.400');
    console.log(headerColor);
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container maxWidth={'100%'} padding={0} margin={0}>
                <header style={{ background: headerColor }}>
                    <Flex px={5} py={5} justifyContent="space-between" alignItems="center" mb={4}>
                        <Flex justifyContent="space-between" alignItems="center">
                            <nav>
                                <HStack spacing={12}>
                                    <NextChakraLink href="/" display="flex" alignItems="center" justifyContent="center">
                                        <Logo
                                            style={{ margin: '0 10px' }}
                                            size={50}
                                            h="1.5rem"
                                            pointerEvents="none"
                                            mr={8}
                                        />
                                        <Heading size="lg">Sprint Planner</Heading>
                                    </NextChakraLink>
                                    <NextChakraLink href="/properties" fontWeight="bold">
                                        View Properties
                                    </NextChakraLink>
                                </HStack>
                            </nav>
                        </Flex>
                        <ColorModeSwitcher justifySelf="flex-end" />
                    </Flex>
                </header>
                {children}
            </Container>
        </div>
    );
};
