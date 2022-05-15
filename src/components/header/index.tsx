import { Button, Flex, Heading, HStack, IconProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { AiFillSwitcher, AiOutlineAppstoreAdd, AiOutlineBarChart } from 'react-icons/ai';
import { ColorModeSwitcher } from '../color-mode-switcher';

interface IconPropsExtended extends IconProps {
    size: number;
    style: {};
}

export const Logo = (props: IconPropsExtended) => {
    return (
        <img
            src="/static/agile.png"
            alt="agile"
            style={props.style}
            width={props.size}
            height={props.size}
        />
    );
};

export const Header = () => (
    <header>
        <Flex px={5} py={5} justifyContent="space-between" alignItems="center" mb={4}>
            <Flex justifyContent="space-between" alignItems="center">
                <nav>
                    <HStack spacing={12}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <NextLink href="/">
                                <>
                                    <Logo
                                        style={{ margin: '0 10px' }}
                                        size={50}
                                        h="1.5rem"
                                        pointerEvents="none"
                                        mr={8}
                                    />
                                    <Heading size="lg">Sprint Planner</Heading>
                                </>
                            </NextLink>
                        </div>
                        <NextLink href="/sprints">
                            <Button
                                rightIcon={<AiOutlineAppstoreAdd />}
                                colorScheme="teal"
                                variant="outline"
                                width={'10em'}
                            >
                                Sprints
                            </Button>
                        </NextLink>
                        <NextLink href="/retrospective">
                            <Button
                                rightIcon={<AiOutlineBarChart />}
                                colorScheme="teal"
                                variant="outline"
                                width={'10em'}
                            >
                                Retrospective
                            </Button>
                        </NextLink>
                        <NextLink href="/sprint-poker">
                            <Button
                                rightIcon={<AiFillSwitcher />}
                                colorScheme="teal"
                                variant="outline"
                                width={'10em'}
                            >
                                Sprint Poker
                            </Button>
                        </NextLink>
                    </HStack>
                </nav>
            </Flex>
            <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
    </header>
);
