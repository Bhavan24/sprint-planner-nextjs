import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberInput,
    NumberInputField,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth as authCofig } from '../../../firebase/config';
import { TICKET_STATUS } from '../../constants';
import { ISaveSprintBoxProps } from '../../interfaces';
import { addNewSprint } from '../../services/sprint/sprints';

export const SaveSprint = (props: ISaveSprintBoxProps) => {
    // router
    const router = useRouter();
    // user
    const [user] = useAuthState(authCofig);
    // toast
    const toast = useToast();
    // form
    const [form, setForm] = useState({
        name: '',
    });
    const [inputs, setInputs] = useState({
        open: 0,
        reopen: 0,
        inprogress: 0,
        prcreated: 0,
        prmerged: 0,
        inverification: 0,
        resolved: 0,
    });

    const handleChange = async (event: any) => {
        const name = event.target.name;
        const value = Number(event.target.value);
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = async () => {
        if (form && form.name && user) {
            const progess = {
                open: inputs.open,
                reopen: inputs.reopen,
                inprogress: inputs.inprogress,
                prcreated: inputs.prcreated,
                prmerged: inputs.prmerged,
                inverification: inputs.inverification,
                resolved: inputs.resolved,
            };
            const retro = {
                went_well: [''],
                to_improve: [''],
                action_items: [''],
            };
            const sprint = {
                name: form.name,
                createdById: user.uid,
                progess: progess,
                retro: retro,
            };
            const newSprintId = await addNewSprint(sprint);
            console.log('newSprintId: ', newSprintId);
            router.push(`/sprints/${newSprintId}`);
        } else {
            toast({
                title: 'Please fill all fields !!!',
                status: 'error',
                isClosable: true,
                position: 'bottom-left',
            });
        }
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
                    <ModalHeader>Create Sprint</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Sprint name</FormLabel>
                            <Input
                                placeholder="Sprint name"
                                onChange={(e: any) => {
                                    setForm({ ...form, name: e.target.value });
                                }}
                            />
                        </FormControl>

                        <Flex justifyContent="center">
                            <Box maxW="25em">
                                <TableContainer>
                                    <Table variant="striped">
                                        <Thead>
                                            <Tr>
                                                <Th>Status</Th>
                                                <Th>Tickets</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {TICKET_STATUS.map(status => (
                                                <Tr key={status.type}>
                                                    <Td>{status.name}</Td>
                                                    <Td>
                                                        <NumberInput>
                                                            <NumberInputField
                                                                id={status.type}
                                                                name={status.type}
                                                                onChange={handleChange}
                                                            />
                                                        </NumberInput>
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Box>
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
