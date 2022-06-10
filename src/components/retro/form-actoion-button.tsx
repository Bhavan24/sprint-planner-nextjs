import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';
import { colors } from '../../theme/colors';

export const FormActionButtons = ({
    onAdd,
    onClear,
}: {
    onAdd: MouseEventHandler;
    onClear: MouseEventHandler;
}) => {
    return (
        <Flex justifyContent="flex-end">
            <Button
                variant="outline"
                onClick={onAdd}
                sx={{
                    mx: 2,
                    color: useColorModeValue(colors.btn_add.light, colors.btn_add.dark),
                }}
            >
                <span style={{ marginRight: '10px' }}>Add</span>
                <AddIcon />
            </Button>
            <Button
                variant="outline"
                onClick={onClear}
                sx={{
                    mx: 2,
                    color: useColorModeValue(
                        colors.btn_clear.light,
                        colors.btn_clear.dark
                    ),
                }}
            >
                <span style={{ marginRight: '10px' }}>Clear</span>
                <MinusIcon />
            </Button>
        </Flex>
    );
};
