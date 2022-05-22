import { CheckCircleIcon, DownloadIcon, NotAllowedIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    GridItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { RefObject, useEffect, useRef, useState } from 'react';
import { ACTION_ITEMS, TO_IMRPOVE_ITEMS, WENT_WELL_ITEMS } from '../../constants';
import {
    IRetroDetails,
    IRetrospectiveData,
    ISaveSprintBoxProps,
    ISprintColData,
} from '../../interfaces';
import { getRetroList, resetAllItems } from '../../services/retrospective/storage';
import { getSprints, updateSprintData } from '../../services/sprint/sprints';
import { colors } from '../../theme/colors';
import { getRetro } from '../../utils/retro-util';
import AlertBox from '../alertbox';
import TimerComponent from '../timer';
import NewRetroItem from './new-item';
import styles from './retro.module.css';

const SaveSprint = (props: ISaveSprintBoxProps) => {
    const [sprintId, setSprintId] = useState('');
    const [sprints, setSprints] = useState<ISprintColData[]>();
    const [retro, setRetro] = useState<IRetroDetails[]>();

    useEffect(() => {
        getSprints()
            .then(sprints => {
                setSprints(sprints);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const retroDetails = getRetro({
            went_well: getRetroList(WENT_WELL_ITEMS),
            to_improve: getRetroList(TO_IMRPOVE_ITEMS),
            action_items: getRetroList(ACTION_ITEMS),
        });
        setRetro(retroDetails);
    }, [props]);

    const handleSubmit = () => {
        console.log(sprintId, {
            went_well: getRetroList(WENT_WELL_ITEMS),
            to_improve: getRetroList(TO_IMRPOVE_ITEMS),
            action_items: getRetroList(ACTION_ITEMS),
        });
        sprintId &&
            retro &&
            updateSprintData(sprintId, {
                retro: {
                    went_well: getRetroList(WENT_WELL_ITEMS),
                    to_improve: getRetroList(TO_IMRPOVE_ITEMS),
                    action_items: getRetroList(ACTION_ITEMS),
                },
            });
        props.onClose();
    };

    return (
        <>
            <Modal
                initialFocusRef={props.initialRef}
                finalFocusRef={props.finalRef}
                isOpen={props.isOpen}
                onClose={props.onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{props.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Select
                            placeholder="Sprint name"
                            onChange={(e: any) => {
                                setSprintId(e.target.value);
                            }}
                        >
                            {sprints &&
                                sprints.map(sprint => (
                                    <option key={sprint.id} value={sprint.id}>
                                        {sprint.name}
                                    </option>
                                ))}
                        </Select>
                        <Flex justifyContent="center">
                            <TableContainer>
                                <Table variant="striped">
                                    <Thead>
                                        <Tr>
                                            <Th>👌 Went well</Th>
                                            <Th>📈 To improve</Th>
                                            <Th>📍 Action items</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {retro &&
                                            retro.map((item, i: number) => (
                                                <Tr key={i}>
                                                    <Td>{item.went_well}</Td>
                                                    <Td>{item.to_improve}</Td>
                                                    <Td>{item.action_items}</Td>
                                                </Tr>
                                            ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

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
            to_improve: getRetroList(TO_IMRPOVE_ITEMS),
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
                    <SaveSprint
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
