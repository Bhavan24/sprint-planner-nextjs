import {
    Avatar,
    Button,
    Flex,
    Heading,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Portal,
    useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { HeaderProps, IconPropsExtended } from '../../interfaces';
import { routes } from '../../routes';
import { ColorModeSwitcher } from '../color-mode-switcher';
import { AiFillProfile, AiOutlineLogin } from 'react-icons/ai';

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

export const Header = (props: HeaderProps) => {
    const headerColor = useColorModeValue('#EDF2F7', '#2D3748');
    return (
        <header style={{ background: headerColor }}>
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
                                <NextLink href="/" passHref>
                                    <Button variant="ghost">
                                        <Logo
                                            style={{ margin: '0 10px' }}
                                            size={50}
                                            h="1.5rem"
                                            pointerEvents="none"
                                            mr={8}
                                        />
                                        <Heading size="lg">Sprint Planner</Heading>
                                    </Button>
                                </NextLink>
                            </div>
                            {routes.map(route => (
                                <NextLink key={route.key} href={route.path}>
                                    <Button
                                        rightIcon={route.icon}
                                        colorScheme="teal"
                                        variant="outline"
                                        width={'10em'}
                                    >
                                        {route.name}
                                    </Button>
                                </NextLink>
                            ))}
                        </HStack>
                    </nav>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                    <Menu>
                        <MenuButton>
                            <Avatar
                                size="sm"
                                name={props.avatar.name}
                                src={props.avatar.src}
                            />
                        </MenuButton>
                        <Portal>
                            <MenuList>
                                <MenuItem icon={<AiFillProfile />}>Profile</MenuItem>
                                <MenuItem
                                    icon={<AiOutlineLogin />}
                                    onClick={props.logOut}
                                >
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu>
                    <ColorModeSwitcher justifySelf="flex-end" />
                </Flex>
            </Flex>
        </header>
    );
};
