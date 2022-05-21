import {
    CheckCircleIcon,
    DownloadIcon,
    NotAllowedIcon,
    RepeatClockIcon,
    TimeIcon,
} from '@chakra-ui/icons';
import {
    Button,
    Flex,
    Grid,
    GridItem,
    Tag,
    TagLabel,
    Tooltip,
    useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ACTION_ITEMS, TO_IMRPOVE_ITEMS, WENT_WELL_ITEMS } from '../../constants';
import { IRetrospectiveData } from '../../interfaces';
import { getRetroList, resetAllItems } from '../../services/retrospective/storage';
import { colors } from '../../theme/colors';
import TimerComponent from '../timer';
import NewRetroItem from './new-item';
import styles from './retrospective.module.css';

const RetrospectiveComponent = () => {
    // timer
    const [seconds, setSeconds] = useState(0);
    const [isTimerActive, setTimerActive] = useState(false);

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

    // retro data
    const [refresh, setRefresh] = useState(false);

    const resetItems = () => {
        resetAllItems();
        setRefresh(!refresh);
    };

    const exportItems = () => {
        var result: IRetrospectiveData = {
            went_well: getRetroList(WENT_WELL_ITEMS),
            to_improve: getRetroList(TO_IMRPOVE_ITEMS),
            action_items: getRetroList(ACTION_ITEMS),
        };

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

    return (
        <>
            <Flex
                w="100%"
                my={5}
                justifyContent="space-between"
                gap={2}
                className={styles.topBar}
            >
                <TimerComponent />
                <Flex alignItems="center">
                    <Button
                        variant="outline"
                        sx={{
                            mx: 2,
                            color: useColorModeValue(
                                colors.btn_save.light,
                                colors.btn_save.dark
                            ),
                            w: '10em',
                        }}
                        rightIcon={<CheckCircleIcon />}
                    >
                        Save
                    </Button>
                    <Button
                        variant="outline"
                        sx={{
                            mx: 2,
                            color: useColorModeValue(
                                colors.btn_export.light,
                                colors.btn_export.dark
                            ),
                            w: '10em',
                        }}
                        onClick={exportItems}
                        rightIcon={<DownloadIcon />}
                    >
                        Export
                    </Button>
                    <Button
                        variant="outline"
                        sx={{
                            mx: 2,
                            color: useColorModeValue(
                                colors.btn_delete.light,
                                colors.btn_delete.dark
                            ),
                            w: '10em',
                        }}
                        onClick={resetItems}
                        rightIcon={<NotAllowedIcon />}
                    >
                        Clear All
                    </Button>
                </Flex>
            </Flex>
            <Grid gap={1} templateColumns="repeat(3, 1fr)">
                <GridItem w="100%">
                    <NewRetroItem
                        name={WENT_WELL_ITEMS}
                        title={'👌 Went well'}
                        desc={'What do you like about your agile practice?'}
                        refresh={refresh}
                    />
                </GridItem>
                <GridItem w="100%">
                    <NewRetroItem
                        name={TO_IMRPOVE_ITEMS}
                        title={'📈 To improve'}
                        desc={'What do want to improve about your agile practice?'}
                        refresh={refresh}
                    />
                </GridItem>
                <GridItem w="100%">
                    <NewRetroItem
                        name={ACTION_ITEMS}
                        title={'📍 Action items'}
                        desc={'What would your agile practice look like?'}
                        refresh={refresh}
                    />
                </GridItem>
            </Grid>
        </>
    );
};

export default RetrospectiveComponent;
