import { useColorModeValue } from '@chakra-ui/react';

export const appColors = {
    header: {
        navButtons: useColorModeValue('blue.400', 'blue.500'),
    },
    page_1: {},
    page_2: {
        btn_save: useColorModeValue('green.600', 'green.400'),
        btn_export: useColorModeValue('purple.600', 'purple.400'),
        btn_delete: useColorModeValue('red.600', 'red.400'),
        btn_timer: useColorModeValue('blue.400', 'blue.500'),
    },
    page_3: {},
    page_4: {},
};
