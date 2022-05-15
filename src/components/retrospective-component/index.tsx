import {
    AddIcon,
    DeleteIcon,
    DownloadIcon,
    MinusIcon,
    NotAllowedIcon,
} from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    IconButton,
    Stack,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { MouseEventHandler, useEffect, useState } from 'react';

import { ACTION_ITEMS, TO_IMRPOVE_ITEMS, WENT_WELL_ITEMS } from '../../constants';

export const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const DetailedCard: React.FC<{
    content: string;
    onDelete: MouseEventHandler;
}> = ({ content, onDelete }) => (
    <Stack sx={{ maxWidth: 345, my: 2, mx: 2 }} spacing={8} direction="row">
        <Box p={5} shadow="md" borderWidth="1px">
            <Text fontSize="md">{content}</Text>
        </Box>
        <Box>
            <IconButton aria-label="delete" onClick={onDelete}>
                <DeleteIcon />
            </IconButton>
        </Box>
    </Stack>
);

const FormActionButtons: React.FC<{
    onAdd: MouseEventHandler;
    onClear: MouseEventHandler;
}> = ({ onAdd, onClear }) => (
    <Flex justifyContent="flex-end" my={2}>
        <Button variant="outline" onClick={onAdd} sx={{ mx: 2, color: 'green.400' }}>
            <span style={{ marginRight: '10px' }}>Add</span>
            <AddIcon />
        </Button>
        <Button variant="outline" onClick={onClear} sx={{ mx: 2, color: 'red.600' }}>
            <span style={{ marginRight: '10px' }}>Clear</span>
            <MinusIcon />
        </Button>
    </Flex>
);

const RetrospectiveComponent = () => {
    const [formValues, setFormValues] = useState({
        went_well: '',
        to_improve: '',
        action_item: '',
    });

    const [data, setData] = useState<{
        went_well: string[];
        to_improve: string[];
        action_items: string[];
    }>({
        went_well: [],
        to_improve: [],
        action_items: [],
    });

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormValues(values => ({ ...values, [name]: value }));
    };

    const saveItems = (item: string, item_array: string[]) => {
        localStorage.setItem(item, JSON.stringify([]));
        localStorage.setItem(item, JSON.stringify(item_array));
    };

    const resetItems = () => {
        localStorage.setItem(WENT_WELL_ITEMS, JSON.stringify([]));
        localStorage.setItem(TO_IMRPOVE_ITEMS, JSON.stringify([]));
        localStorage.setItem(ACTION_ITEMS, JSON.stringify([]));
    };

    const exportItems = () => {
        interface resultObj {
            went_well: string[];
            to_improve: string[];
            action_items: string[];
        }

        var result: resultObj = {
            went_well: [],
            to_improve: [],
            action_items: [],
        };

        result.went_well = JSON.parse(
            localStorage.getItem(WENT_WELL_ITEMS) || JSON.stringify([])
        );
        result.to_improve = JSON.parse(
            localStorage.getItem(TO_IMRPOVE_ITEMS) || JSON.stringify([])
        );
        result.action_items = JSON.parse(
            localStorage.getItem(ACTION_ITEMS) || JSON.stringify([])
        );

        const file = new Blob([JSON.stringify(result, null, 4)], {
            type: 'text/plain',
        });

        const element = document.createElement('a');
        element.href = URL.createObjectURL(file);
        element.download = 'retro.txt';
        document.body.appendChild(element);
        element.click();
    };

    useEffect(() => {
        const went_well: string[] = JSON.parse(
            localStorage.getItem(WENT_WELL_ITEMS) || JSON.stringify([])
        );
        const to_improve: string[] = JSON.parse(
            localStorage.getItem(TO_IMRPOVE_ITEMS) || JSON.stringify([])
        );
        const action_items: string[] = JSON.parse(
            localStorage.getItem(ACTION_ITEMS) || JSON.stringify([])
        );
        setData({
            ...data,
            went_well: went_well,
            to_improve: to_improve,
            action_items: action_items,
        });
    }, [data]);

    return (
        <>
            <Box w="100%" my={5}>
                <Button
                    variant="outline"
                    sx={{ mx: 2, color: 'purple.400' }}
                    onClick={exportItems}
                >
                    <span style={{ marginRight: '10px' }}>Export</span>
                    <DownloadIcon />
                </Button>
                <Button
                    variant="outline"
                    sx={{ mx: 2, color: 'red.500' }}
                    onClick={resetItems}
                >
                    <span style={{ marginRight: '10px' }}>Delete All</span>
                    <NotAllowedIcon />
                </Button>
            </Box>
            <Grid gap={1} templateColumns="repeat(3, 1fr)">
                <GridItem w="100%">
                    <Textarea
                        width={'100%'}
                        placeholder={'👌 Went well'}
                        margin="normal"
                        variant="filled"
                        rows={5}
                        name="went_well"
                        value={formValues.went_well}
                        onChange={handleChange}
                    />
                    {formValues.went_well && (
                        <FormActionButtons
                            onAdd={() => {
                                const newArray = [
                                    ...data.went_well,
                                    formValues.went_well,
                                ];
                                setData({
                                    ...data,
                                    went_well: newArray,
                                });
                                saveItems(WENT_WELL_ITEMS, newArray);
                            }}
                            onClear={() => {
                                setFormValues({
                                    ...formValues,
                                    went_well: '',
                                });
                            }}
                        />
                    )}
                </GridItem>
                <GridItem w="100%">
                    <Textarea
                        width={'100%'}
                        placeholder={'📈 To improve'}
                        margin="normal"
                        variant="filled"
                        rows={5}
                        name="to_improve"
                        value={formValues.to_improve}
                        onChange={handleChange}
                    />
                    {formValues.to_improve && (
                        <FormActionButtons
                            onAdd={() => {
                                const newArray = [
                                    ...data.to_improve,
                                    formValues.to_improve,
                                ];
                                setData({
                                    ...data,
                                    to_improve: newArray,
                                });
                                saveItems(TO_IMRPOVE_ITEMS, newArray);
                            }}
                            onClear={() => {
                                setFormValues({
                                    ...formValues,
                                    to_improve: '',
                                });
                            }}
                        />
                    )}
                </GridItem>
                <GridItem w="100%">
                    <Textarea
                        width={'100%'}
                        placeholder={'📍 Action items'}
                        margin="normal"
                        variant="filled"
                        rows={5}
                        name="action_item"
                        value={formValues.action_item}
                        onChange={handleChange}
                    />
                    {formValues.action_item && (
                        <FormActionButtons
                            onAdd={() => {
                                const newArray = [
                                    ...data.action_items,
                                    formValues.action_item,
                                ];
                                setData({
                                    ...data,
                                    action_items: newArray,
                                });
                                saveItems(ACTION_ITEMS, newArray);
                            }}
                            onClear={() => {
                                setFormValues({
                                    ...formValues,
                                    action_item: '',
                                });
                            }}
                        />
                    )}
                </GridItem>
            </Grid>
            <Grid gap={1} sx={{ mt: 2 }} templateColumns="repeat(3, 1fr)">
                <GridItem w="100%">
                    {data.went_well.map((went_well_item: string, index: number) => (
                        <DetailedCard
                            key={index}
                            content={went_well_item}
                            onDelete={() => {
                                var newArray = [...data.went_well];
                                newArray.splice(index, 1);
                                setData({
                                    ...data,
                                    went_well: newArray,
                                });
                                saveItems(WENT_WELL_ITEMS, newArray);
                            }}
                        />
                    ))}
                </GridItem>
                <GridItem w="100%">
                    {data.to_improve.map((to_improve_item: string, index: number) => (
                        <DetailedCard
                            key={index}
                            content={to_improve_item}
                            onDelete={() => {
                                const newArray = [...data.to_improve];
                                newArray.splice(index, 1);
                                setData({
                                    ...data,
                                    to_improve: newArray,
                                });
                                saveItems(TO_IMRPOVE_ITEMS, newArray);
                            }}
                        />
                    ))}
                </GridItem>
                <GridItem w="100%">
                    {data.action_items.map((action_item: string, index: number) => (
                        <DetailedCard
                            key={index}
                            content={action_item}
                            onDelete={() => {
                                const newArray = [...data.action_items];
                                newArray.splice(index, 1);
                                setData({
                                    ...data,
                                    action_items: newArray,
                                });
                                saveItems(ACTION_ITEMS, newArray);
                            }}
                        />
                    ))}
                </GridItem>
            </Grid>
        </>
    );
};

export default RetrospectiveComponent;
