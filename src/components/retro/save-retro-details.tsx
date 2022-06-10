import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ACTION_ITEMS, TO_IMPROVE_ITEMS, WENT_WELL_ITEMS } from '../../constants';
import { IRetroDetails, ISaveSprintBoxProps } from '../../interfaces';
import { getRetroList } from '../../services/retrospective/storage';
import { updateSprintData } from '../../services/sprint/sprints';
import { getRetro } from '../../utils/retro-util';
import SelectSprint from '../select-sprint';

export const SaveSprintRetro = (props: ISaveSprintBoxProps) => {
    const [sprintId, setSprintId] = useState('');
    const [retro, setRetro] = useState<IRetroDetails[]>();

    useEffect(() => {
        const retroDetails = getRetro({
            went_well: getRetroList(WENT_WELL_ITEMS),
            to_improve: getRetroList(TO_IMPROVE_ITEMS),
            action_items: getRetroList(ACTION_ITEMS),
        });
        setRetro(retroDetails);
    }, [props]);

    const handleSubmit = () => {
        console.log(sprintId, {
            went_well: getRetroList(WENT_WELL_ITEMS),
            to_improve: getRetroList(TO_IMPROVE_ITEMS),
            action_items: getRetroList(ACTION_ITEMS),
        });
        sprintId &&
            retro &&
            updateSprintData(sprintId, {
                retro: {
                    went_well: getRetroList(WENT_WELL_ITEMS),
                    to_improve: getRetroList(TO_IMPROVE_ITEMS),
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
                        <SelectSprint
                            onChange={(e: any) => {
                                setSprintId(e.target.value);
                            }}
                        />
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
