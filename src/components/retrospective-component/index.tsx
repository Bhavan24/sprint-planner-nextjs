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
    <Box p={4} maxWidth="inherit" borderWidth={1} margin={2}>
        <Text fontSize="md" letterSpacing="inherit" maxWidth="inherit">
            {content}
        </Text>
        <Flex justifyContent="flex-end" mt={2}>
            <IconButton aria-label="delete" onClick={onDelete}>
                <DeleteIcon />
            </IconButton>
        </Flex>
    </Box>
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

    const addValue = (item: string) => {
        var newArray: string[] = [];
        switch (item) {
            case WENT_WELL_ITEMS:
                newArray = [...data.went_well, formValues.went_well];
                setData({
                    ...data,
                    went_well: newArray,
                });
                saveItems(WENT_WELL_ITEMS, newArray);
                setFormValues({
                    ...formValues,
                    went_well: '',
                });

                break;
            case TO_IMRPOVE_ITEMS:
                newArray = [...data.to_improve, formValues.to_improve];
                setData({
                    ...data,
                    to_improve: newArray,
                });
                saveItems(TO_IMRPOVE_ITEMS, newArray);
                setFormValues({
                    ...formValues,
                    to_improve: '',
                });
                break;
            case ACTION_ITEMS:
                newArray = [...data.action_items, formValues.action_item];
                setData({
                    ...data,
                    action_items: newArray,
                });
                saveItems(ACTION_ITEMS, newArray);
                setFormValues({
                    ...formValues,
                    action_item: '',
                });
                break;
            default:
                break;
        }
    };

    const clearValue = (item: string) => {
        switch (item) {
            case WENT_WELL_ITEMS:
                setFormValues({
                    ...formValues,
                    went_well: '',
                });
                break;
            case TO_IMRPOVE_ITEMS:
                setFormValues({
                    ...formValues,
                    to_improve: '',
                });
                break;
            case ACTION_ITEMS:
                setFormValues({
                    ...formValues,
                    action_item: '',
                });
                break;
            default:
                break;
        }
    };

    const deleteValue = (item: string, index: number) => {
        var newArray: string[] = [];
        switch (item) {
            case WENT_WELL_ITEMS:
                newArray = [...data.went_well];
                newArray.splice(index, 1);
                setData({
                    ...data,
                    went_well: newArray,
                });
                saveItems(WENT_WELL_ITEMS, newArray);
                break;
            case TO_IMRPOVE_ITEMS:
                newArray = [...data.to_improve];
                newArray.splice(index, 1);
                setData({
                    ...data,
                    to_improve: newArray,
                });
                saveItems(TO_IMRPOVE_ITEMS, newArray);
                break;
            case ACTION_ITEMS:
                newArray = [...data.action_items];
                newArray.splice(index, 1);
                setData({
                    ...data,
                    action_items: newArray,
                });
                saveItems(ACTION_ITEMS, newArray);
                break;
            default:
                break;
        }
    };

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
                    <Text fontSize="lg" my={2}>
                        What do you like about your agile practice?
                    </Text>
                    <Textarea
                        width={'100%'}
                        placeholder={'👌 Went well'}
                        margin="normal"
                        variant="filled"
                        rows={5}
                        name="went_well"
                        value={formValues.went_well}
                        onChange={handleChange}
                        maxWidth="initial"
                    />
                    {formValues.went_well && (
                        <FormActionButtons
                            onAdd={() => {
                                addValue(WENT_WELL_ITEMS);
                            }}
                            onClear={() => {
                                clearValue(WENT_WELL_ITEMS);
                            }}
                        />
                    )}
                    {data.went_well.map((went_well_item: string, index: number) => (
                        <DetailedCard
                            key={index}
                            content={went_well_item}
                            onDelete={() => {
                                deleteValue(WENT_WELL_ITEMS, index);
                            }}
                        />
                    ))}
                </GridItem>
                <GridItem w="100%">
                    <Text fontSize="lg" my={2}>
                        What do want to improve about your agile practice?
                    </Text>
                    <Textarea
                        width={'100%'}
                        placeholder={'📈 To improve'}
                        margin="normal"
                        variant="filled"
                        rows={5}
                        name="to_improve"
                        value={formValues.to_improve}
                        onChange={handleChange}
                        maxWidth="initial"
                    />
                    {formValues.to_improve && (
                        <FormActionButtons
                            onAdd={() => {
                                addValue(TO_IMRPOVE_ITEMS);
                            }}
                            onClear={() => {
                                clearValue(TO_IMRPOVE_ITEMS);
                            }}
                        />
                    )}
                    {data.to_improve.map((to_improve_item: string, index: number) => (
                        <DetailedCard
                            key={index}
                            content={to_improve_item}
                            onDelete={() => {
                                deleteValue(TO_IMRPOVE_ITEMS, index);
                            }}
                        />
                    ))}
                </GridItem>
                <GridItem w="100%">
                    <Text fontSize="lg" my={2}>
                        What would your agile practice look like?
                    </Text>
                    <Textarea
                        width={'100%'}
                        placeholder={'📍 Action items'}
                        margin="normal"
                        variant="filled"
                        rows={5}
                        name="action_item"
                        value={formValues.action_item}
                        onChange={handleChange}
                        maxWidth="initial"
                    />
                    {formValues.action_item && (
                        <FormActionButtons
                            onAdd={() => {
                                addValue(ACTION_ITEMS);
                            }}
                            onClear={() => {
                                clearValue(ACTION_ITEMS);
                            }}
                        />
                    )}
                    {data.action_items.map((action_item: string, index: number) => (
                        <DetailedCard
                            key={index}
                            content={action_item}
                            onDelete={() => {
                                deleteValue(ACTION_ITEMS, index);
                            }}
                        />
                    ))}
                </GridItem>
            </Grid>
        </>
    );
};

export default RetrospectiveComponent;
