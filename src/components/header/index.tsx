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
import styles from './header.module.css';
import { colors } from '../../theme/colors';

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
    return (
        <header
            style={{
                background: useColorModeValue(
                    colors.header_bg.light,
                    colors.header_bg.dark
                ),
            }}
        >
            <Flex px={5} py={5} justifyContent="space-between" alignItems="center" mb={4}>
                <Flex justifyContent="space-between" alignItems="center">
                    <nav>
                        <HStack className={styles.navStack} spacing={12} gap={5}>
                            <Flex justifyContent="center" alignItems="center">
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
                            </Flex>
                            {routes.map(route => (
                                <NextLink key={route.key} href={route.path}>
                                    <Button
                                        rightIcon={route.icon}
                                        color={useColorModeValue(
                                            colors.nav_button.light,
                                            colors.nav_button.dark
                                        )}
                                        variant="outline"
                                        width={'10em'}
                                        sx={{
                                            margin: '0 1em !important',
                                        }}
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
                                <NextLink href="/profile">
                                    <MenuItem icon={<AiFillProfile />}>Profile</MenuItem>
                                </NextLink>
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
