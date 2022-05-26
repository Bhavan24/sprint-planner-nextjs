import {
    IconButton,
    IconButtonProps,
    Tooltip,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>;

export const ColorModeSwitcher = (props: ColorModeSwitcherProps) => {
    const { toggleColorMode } = useColorMode();
    const text = useColorModeValue('dark', 'light');
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);

    return (
        <Tooltip label={`Switch to ${text} mode`}>
            <IconButton
                size="md"
                fontSize="lg"
                variant="ghost"
                color="current"
                marginLeft="2"
                onClick={toggleColorMode}
                icon={<SwitchIcon />}
                aria-label={`Switch to ${text} mode`}
                {...props}
            />
        </Tooltip>
    );
};
