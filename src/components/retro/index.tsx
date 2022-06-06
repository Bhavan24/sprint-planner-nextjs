import { CheckCircleIcon, DownloadIcon, NotAllowedIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    GridItem,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { RefObject, useRef, useState } from 'react';
import { ACTION_ITEMS, TO_IMPROVE_ITEMS, WENT_WELL_ITEMS } from '../../constants';
import { IRetrospectiveData } from '../../interfaces';
import { getRetroList, resetAllItems } from '../../services/retrospective/storage';
import { colors } from '../../theme/colors';
import AlertBox from '../alertbox';
import TimerComponent from '../timer';
import NewRetroItem from './new-item';
import styles from './retro.module.css';
import { SaveSprintRetro } from './save-retro-details';

const RetrospectiveComponent = () => {
    // model
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef() as RefObject<FocusableElement>;
    const finalRef = useRef() as RefObject<FocusableElement>;
    // popup
    const model = useDisclosure();
    const cancelRef = useRef() as RefObject<FocusableElement>;
    // retro data
    const [refresh, setRefresh] = useState(false);

    const resetItems = () => {
        resetAllItems();
        setRefresh(!refresh);
        onClose();
    };

    const exportItems = () => {
        var result: IRetrospectiveData = {
            went_well: getRetroList(WENT_WELL_ITEMS),
            to_improve: getRetroList(TO_IMPROVE_ITEMS),
            action_items: getRetroList(ACTION_ITEMS),
        };

        var result_str = `Retrospective \n\n`;
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
                        onClick={model.onOpen}
                    >
                        Save
                    </Button>
                    <SaveSprintRetro
                        isOpen={model.isOpen}
                        onOpen={model.onOpen}
                        onClose={model.onClose}
                        initialRef={initialRef}
                        finalRef={finalRef}
                        title={'Select Sprint'}
                    />
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
                        onClick={onOpen}
                        rightIcon={<NotAllowedIcon />}
                    >
                        Clear All
                    </Button>
                </Flex>
            </Flex>
            <Box gap={1} className={styles.itemsContainer}>
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
                        name={TO_IMPROVE_ITEMS}
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
            </Box>
            <AlertBox
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                cancelRef={cancelRef}
                onAction={resetItems}
                btnText={'Delete'}
                btnColor={'red'}
                title={'Clear All Items'}
                body={`Are you sure? You can't undo this action afterwards.`}
            />
        </>
    );
};

export default RetrospectiveComponent;
