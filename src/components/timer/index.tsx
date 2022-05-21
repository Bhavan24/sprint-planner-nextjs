import { RepeatClockIcon, TimeIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    Tag,
    TagLabel,
    Tooltip,
    useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { colors } from '../../theme/colors';

const TimerComponent = () => {
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

    return (
        <>
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
                    bg={useColorModeValue(colors.btn_timer.light, colors.btn_timer.dark)}
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
        </>
    );
};

export default TimerComponent;
