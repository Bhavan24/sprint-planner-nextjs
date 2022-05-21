import { AddIcon, DeleteIcon, MinusIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    IconButton,
    Text,
    Textarea,
    useColorModeValue,
} from '@chakra-ui/react';
import { MouseEventHandler, useEffect, useState } from 'react';
import { INewRetroItemProps } from '../../interfaces';
import { getRetroList, saveRetroList } from '../../services/retrospective/storage';
import { colors } from '../../theme/colors';

const DetailedCard: React.FC<{
    content: string;
    onDelete: MouseEventHandler;
}> = ({ content, onDelete }) => {
    return (
        <Box
            p={4}
            maxWidth="inherit"
            borderWidth={1}
            my={2}
            borderRadius="lg"
            bg={useColorModeValue(colors.detailed_card.light, colors.detailed_card.dark)}
        >
            <Text
                fontSize="md"
                letterSpacing="inherit"
                maxWidth="inherit"
                style={{
                    wordBreak: 'break-all',
                    whiteSpace: 'normal',
                }}
            >
                {content}
            </Text>
            <Flex justifyContent="flex-end" mt={2}>
                <IconButton aria-label="delete" onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </Flex>
        </Box>
    );
};

const FormActionButtons: React.FC<{
    onAdd: MouseEventHandler;
    onClear: MouseEventHandler;
}> = ({ onAdd, onClear }) => {
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

const NewRetroItem = (props: INewRetroItemProps) => {
    const [formValue, setFormValue] = useState('');
    const [data, setData] = useState<string[]>([]);

    const handleChange = (event: any) => {
        setFormValue(event.target.value);
    };

    const addValue = () => {
        const newArray = [...data, formValue];
        saveRetroList(props.name, newArray);
        setData(getRetroList(props.name));
        setFormValue('');
    };

    const clearValue = () => {
        setFormValue('');
    };

    const deleteValue = (index: number) => {
        var newArray = [...data];
        newArray.splice(index, 1);
        saveRetroList(props.name, newArray);
        setData(getRetroList(props.name));
    };

    useEffect(() => {
        setData(getRetroList(props.name));
    }, [setData, props.refresh]);

    return (
        <>
            <Box
                p={4}
                maxWidth="inherit"
                minHeight="100vh"
                borderWidth={1}
                my={2}
                borderRadius="lg"
            >
                <Flex alignItems="center" justifyContent="space-between" my={2}>
                    <Text fontSize="lg" my={2}>
                        {props.title}
                    </Text>
                    {formValue && (
                        <FormActionButtons onAdd={addValue} onClear={clearValue} />
                    )}
                </Flex>
                <Textarea
                    width={'100%'}
                    placeholder={props.desc}
                    margin="normal"
                    variant="filled"
                    rows={5}
                    value={formValue}
                    onChange={handleChange}
                    maxWidth="initial"
                />
                {data.map((value: string, index: number) => (
                    <DetailedCard
                        key={index}
                        content={value}
                        onDelete={() => {
                            deleteValue(index);
                        }}
                    />
                ))}
            </Box>
        </>
    );
};

export default NewRetroItem;
