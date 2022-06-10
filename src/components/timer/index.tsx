import {
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tag,
    TagLabel,
    useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { GiBackwardTime } from 'react-icons/gi';
import { MdTimer, MdTimerOff } from 'react-icons/md';
import { RiTimerLine } from 'react-icons/ri';

const TimerComponent = () => {
    // timer
    const [seconds, setSeconds] = useState(0);
    const [isTimerActive, setTimerActive] = useState(false);

    // toast
    const toast = useToast();

    const startTimer = () => {
        setTimerActive(true);
    };

    const resetTimer = () => {
        setSeconds(0);
    };

    const stopTimer = () => {
        setSeconds(0);
        setTimerActive(false);
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
        if (seconds == 600) {
            toast({
                title: 'Time Limit Reached!!!',
                status: 'warning',
                isClosable: true,
                position: 'bottom-left',
            });
        }
        return () => clearInterval(interval);
    }, [isTimerActive, seconds]);

    return (
        <>
            <Flex gap={2}>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Start Timer"
                        icon={<RiTimerLine />}
                        size="lg"
                        fontSize="1.5em"
                        m={2}
                    />
                    <MenuList>
                        <MenuItem
                            icon={<MdTimer size="2em" />}
                            fontSize="0.8em"
                            onClick={startTimer}
                        >
                            Start Timer
                        </MenuItem>
                        <MenuItem
                            icon={<GiBackwardTime size="2em" />}
                            fontSize="0.8em"
                            onClick={resetTimer}
                        >
                            Restart Timer
                        </MenuItem>
                        <MenuItem
                            icon={<MdTimerOff size="2em" />}
                            fontSize="0.8em"
                            onClick={stopTimer}
                        >
                            Cancel Timer
                        </MenuItem>
                    </MenuList>
                </Menu>
                <Flex m={2}>
                    <Tag
                        size="lg"
                        colorScheme={seconds > 540 ? 'red' : 'green'}
                        borderRadius="full"
                        width="6em"
                        justifyContent="center"
                    >
                        <TagLabel>{getTime(seconds)}</TagLabel>
                    </Tag>
                </Flex>
            </Flex>
        </>
    );
};

export default TimerComponent;
