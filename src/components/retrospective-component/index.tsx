import {
    AddIcon,
    DeleteIcon,
    DownloadIcon,
    MinusIcon,
    NotAllowedIcon,
    RepeatClockIcon,
    TimeIcon
} from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    IconButton,
    Tag,
    TagLabel,
    Text,
    Textarea,
    Tooltip,
    useColorModeValue
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
}> = ({ content, onDelete }) => {
    const bg = useColorModeValue('cyan.100', 'cyan.700');
    return (
        <Box p={4} maxWidth="inherit" borderWidth={1} my={2} borderRadius="lg" bg={bg}>
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
    const addColor = useColorModeValue('green.400', 'green.400');
    const clearColor = useColorModeValue('red.600', 'red.400');
    return (
        <Flex justifyContent="flex-end">
            <Button variant="outline" onClick={onAdd} sx={{ mx: 2, color: addColor }}>
                <span style={{ marginRight: '10px' }}>Add</span>
                <AddIcon />
            </Button>
            <Button variant="outline" onClick={onClear} sx={{ mx: 2, color: clearColor }}>
                <span style={{ marginRight: '10px' }}>Clear</span>
                <MinusIcon />
            </Button>
        </Flex>
    );
};

const RetrospectiveComponent = () => {
    const [seconds, setSeconds] = useState(0);
    const [isTimerActive, setTimerActive] = useState(false);
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

    const exportbtnColor = useColorModeValue('purple.600', 'purple.400');
    const deleteBtnColor = useColorModeValue('red.600', 'red.400');

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

        var result_str = `Sprint: ${1}\n\n`;
        result_str += `\nWent well\n -${result.went_well.join('\n -')}\n`;
        result_str += `\nTo improve\n -${result.to_improve.join('\n -')}\n`;
        result_str += `\nAction items\n -${result.action_items.join('\n -')}\n`;

        const file = new Blob([result_str], {
            type: 'text/plain',
        });

        const element = document.createElement('a');
        element.href = URL.createObjectURL(file);
        element.download = 'retro.txt';
        document.body.appendChild(element);
        element.click();
    };

    const handleTimer = () => {
        setTimerActive(!isTimerActive);
    };

    const resetTimer = () => {
        setSeconds(0);
    };

    const getTime = (seconds: number) => {
        var date = new Date(0);
        date.setSeconds(seconds);
        var timeString = date.toISOString().substr(11, 8);
        return timeString;
    };

    useEffect(() => {
        let interval: any = null;
        if (isTimerActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isTimerActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, seconds]);

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
            <Flex w="100%" my={5} justifyContent="space-between">
                <Flex gap={2}>
                    <Tag
                        size="lg"
                        colorScheme={seconds > 540 ? 'red' : 'green'}
                        borderRadius="full"
                        width="6em"
                        justifyContent="center"
                    >
                        <TagLabel>{getTime(seconds)}</TagLabel>
                    </Tag>
                    <Button
                        leftIcon={<TimeIcon />}
                        colorScheme="blue"
                        variant="solid"
                        width="10em"
                        onClick={handleTimer}
                    >
                        {isTimerActive ? 'Stop Timer' : 'Start Timer'}
                    </Button>
                    <Button onClick={resetTimer}>
                        <Tooltip label="Reset Timer" fontSize="md">
                            <RepeatClockIcon />
                        </Tooltip>
                    </Button>
                </Flex>
                <Flex alignItems="center">
                    <Text>SPRINT: 1</Text>
                </Flex>
                <Flex>
                    <Button
                        variant="outline"
                        sx={{ mx: 2, color: exportbtnColor }}
                        onClick={exportItems}
                        rightIcon={<DownloadIcon />}
                    >
                        Export
                    </Button>
                    <Button
                        variant="outline"
                        sx={{ mx: 2, color: deleteBtnColor }}
                        onClick={resetItems}
                        rightIcon={<NotAllowedIcon />}
                    >
                        Clear All
                    </Button>
                </Flex>
            </Flex>
            <Grid gap={1} templateColumns="repeat(3, 1fr)">
                <GridItem w="100%">
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
                                👌 Went well
                            </Text>
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
                        </Flex>
                        <Textarea
                            width={'100%'}
                            placeholder={'What do you like about your agile practice?'}
                            margin="normal"
                            variant="filled"
                            rows={5}
                            name="went_well"
                            value={formValues.went_well}
                            onChange={handleChange}
                            maxWidth="initial"
                        />
                        {data.went_well.map((went_well_item: string, index: number) => (
                            <DetailedCard
                                key={index}
                                content={went_well_item}
                                onDelete={() => {
                                    deleteValue(WENT_WELL_ITEMS, index);
                                }}
                            />
                        ))}
                    </Box>
                </GridItem>
                <GridItem w="100%">
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
                                📈 To improve
                            </Text>
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
                        </Flex>
                        <Textarea
                            width={'100%'}
                            placeholder={
                                'What do want to improve about your agile practice?'
                            }
                            margin="normal"
                            variant="filled"
                            rows={5}
                            name="to_improve"
                            value={formValues.to_improve}
                            onChange={handleChange}
                            maxWidth="initial"
                        />
                        {data.to_improve.map((to_improve_item: string, index: number) => (
                            <DetailedCard
                                key={index}
                                content={to_improve_item}
                                onDelete={() => {
                                    deleteValue(TO_IMRPOVE_ITEMS, index);
                                }}
                            />
                        ))}
                    </Box>
                </GridItem>
                <GridItem w="100%">
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
                                📍 Action items
                            </Text>
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
                        </Flex>
                        <Textarea
                            width={'100%'}
                            placeholder={'What would your agile practice look like?'}
                            margin="normal"
                            variant="filled"
                            rows={5}
                            name="action_item"
                            value={formValues.action_item}
                            onChange={handleChange}
                            maxWidth="initial"
                        />
                        {data.action_items.map((action_item: string, index: number) => (
                            <DetailedCard
                                key={index}
                                content={action_item}
                                onDelete={() => {
                                    deleteValue(ACTION_ITEMS, index);
                                }}
                            />
                        ))}
                    </Box>
                </GridItem>
            </Grid>
        </>
    );
};

export default RetrospectiveComponent;
