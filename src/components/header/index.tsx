import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Button,
    Flex,
    Heading,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Portal,
    useColorModeValue,
    useMediaQuery,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { AiFillProfile, AiOutlineLogin } from 'react-icons/ai';
import { ELEMENT_TEXT, LOGO_IMG_PATH } from '../../constants';
import { HeaderProps } from '../../interfaces';
import { routes } from '../../routes';
import { colors } from '../../theme/colors';
import { ColorModeSwitcher } from '../color-mode-switcher';
import styles from './header.module.css';

const LogoImage = () => (
    <img src={LOGO_IMG_PATH} alt="logo" className={styles.headerLogo} />
);

const Logo = () => (
    <Flex className={styles.justifyCenter}>
        <NextLink href="/" passHref>
            <Button variant="ghost">
                <LogoImage />
                <Heading size="lg"> {ELEMENT_TEXT.APP_LOGO_NAME}</Heading>
            </Button>
        </NextLink>
    </Flex>
);

const HamburgerMenu = () => (
    <Menu>
        <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
        />
        <MenuList>
            {routes.map(route => (
                <NextLink key={route.key} href={route.path}>
                    <MenuItem icon={route.icon}>{route.name}</MenuItem>
                </NextLink>
            ))}
        </MenuList>
    </Menu>
);

const HeaderLogoMenu = () => {
    return (
        <>
            {routes.map(route => (
                <NextLink key={route.key} href={route.path}>
                    <Button
                        rightIcon={route.icon}
                        color={useColorModeValue(
                            colors.nav_button.light,
                            colors.nav_button.dark
                        )}
                        className={styles.navButton}
                        variant="outline"
                    >
                        {route.name}
                    </Button>
                </NextLink>
            ))}
        </>
    );
};

export const Header = ({ avatar, logOut }: HeaderProps) => {
    const [isPhoneScreen] = useMediaQuery('(max-width: 580px)');

    return (
        <header
            style={{
                background: useColorModeValue(
                    colors.header_bg.light,
                    colors.header_bg.dark
                ),
            }}
        >
            <Flex className={styles.header}>
                <Flex className={styles.justifySpaceBetween}>
                    <nav>
                        <HStack className={styles.navItems} spacing={12}>
                            {isPhoneScreen ? (
                                <HamburgerMenu />
                            ) : (
                                <>
                                    <Logo />
                                    <HeaderLogoMenu />
                                </>
                            )}
                        </HStack>
                    </nav>
                </Flex>
                <Flex className={styles.justifySpaceBetween}>
                    <Menu>
                        <MenuButton>
                            <Avatar size="sm" name={avatar.name} src={avatar.src} />
                        </MenuButton>
                        <Portal>
                            <MenuList>
                                <NextLink href="/profile">
                                    <MenuItem icon={<AiFillProfile />}>
                                        {ELEMENT_TEXT.HEADER_PROFILE_BUTTON}
                                    </MenuItem>
                                </NextLink>
                                <MenuItem icon={<AiOutlineLogin />} onClick={logOut}>
                                    {ELEMENT_TEXT.HEADER_LOGOUT_BUTTON}
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
