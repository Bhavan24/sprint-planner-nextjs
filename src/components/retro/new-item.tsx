import { AddIcon, DeleteIcon, EditIcon, MinusIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    IconButton,
    Text,
    Textarea,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { MouseEventHandler, RefObject, useEffect, useRef, useState } from 'react';
import { INewRetroItemProps } from '../../interfaces';
import { getRetroList, saveRetroList } from '../../services/retrospective/storage';
import { colors } from '../../theme/colors';
import AlertBox from '../alertbox';

const DetailedCard: React.FC<{
    content: string;
    onDelete: MouseEventHandler;
    onEdit: MouseEventHandler;
}> = ({ content, onDelete, onEdit }) => {
    // popup
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef() as RefObject<FocusableElement>;

    return (
        <Box
            maxWidth="inherit"
            borderRadius="lg"
            borderWidth={1}
            my={2}
            p={4}
            bg={useColorModeValue(colors.detailed_card.light, colors.detailed_card.dark)}
        >
            <Text
                letterSpacing="inherit"
                fontSize="md"
                maxWidth="inherit"
                align="left"
                style={{
                    wordBreak: 'break-all',
                    whiteSpace: 'normal',
                }}
            >
                {content}
            </Text>
            <Flex justifyContent="flex-end" mt={2}>
                <>
                    <IconButton aria-label="delete" m={2} onClick={onEdit}>
                        <EditIcon />
                    </IconButton>
                </>
                <>
                    <IconButton aria-label="delete" m={2} onClick={onOpen}>
                        <DeleteIcon />
                    </IconButton>
                    <AlertBox
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        cancelRef={cancelRef}
                        onAction={e => {
                            onDelete(e);
                            onClose();
                        }}
                        btnText={'Delete'}
                        btnColor={'red'}
                        title={'Delete Item'}
                        body={`Are you sure? You can't undo this action afterwards.`}
                    />
                </>
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

const NewRetroItem = ({ name, title, desc, refresh }: INewRetroItemProps) => {
    const [formValue, setFormValue] = useState('');
    const [data, setData] = useState<string[]>([]);

    useEffect(() => {
        setData(getRetroList(name));
    }, [setData, refresh]);

    const addValue = () => {
        const new_array = formValue ? [...data, formValue] : [...data];
        saveRetroList(name, new_array);
        setData(new_array);
    };

    const clearValue = () => {
        setFormValue('');
    };

    const editValue = (index: number) => {
        setFormValue(data[index]);
        deleteValue(index);
    };

    const deleteValue = (index: number) => {
        const new_array = [...data];
        new_array.splice(index, 1);
        saveRetroList(name, new_array);
        setData(new_array);
    };

    const handleChange = (event: any) => {
        setFormValue(event.target.value);
    };

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
                        {title}
                    </Text>
                    {formValue && (
                        <FormActionButtons onAdd={addValue} onClear={clearValue} />
                    )}
                </Flex>
                <Textarea
                    width={'100%'}
                    placeholder={desc}
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
                        onEdit={() => {
                            editValue(index);
                        }}
                    />
                ))}
            </Box>
        </>
    );
};

export default NewRetroItem;
