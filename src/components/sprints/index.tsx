import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    GridItem,
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
    useColorModeValue,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdLibraryAdd } from 'react-icons/md';
import { auth as authCofig } from '../../../firebase/config';
import { TICKET_STATUS } from '../../constants';
import {
    ISaveSprintBoxProps,
    ISprintColData,
    ISprintDetailsBoxProps,
} from '../../interfaces';
import { addNewSprint, getSprints } from '../../services/sprint/sprints';
import { colors } from '../../theme/colors';
import { getIssues } from '../../utils/sprint-util';
import styles from './sprints.module.css';

const SprintBox = (props: ISprintDetailsBoxProps) => {
    const issues = getIssues(props.content);

    return (
        <Link href={props.link} passHref>
            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                m={2}
                minHeight="15em"
                cursor="pointer"
            >
                <Box p="6">
                    <Box mt="1" fontWeight="semibold" as="h3">
                        {props.title}
                    </Box>
                    {props.content && (
                        <Box
                            display="flex"
                            mt="2"
                            fontWeight="light"
                            alignItems="flex-start"
                            flexDir="column"
                        >
                            {issues.map(issue => (
                                <div className={styles.text} key={issue.name}>
                                    <b>{issue.name}</b>
                                    <i>{issue.tickets}</i>
                                </div>
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
        </Link>
    );
};

const SaveSprint = (props: ISaveSprintBoxProps) => {
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
                wentwell: [''],
                toimprove: [''],
                action: [''],
            };
            const poker = [{ title: '', desc: '', link: '', points: 0 }];
            const sprint = {
                name: form.name,
                createdById: user.uid,
                progess: progess,
                retro: retro,
                poker: poker,
            };
            const newSprintId = await addNewSprint(sprint);
            console.log('newSprintId: ', newSprintId);
            router.push(`/sprints/${newSprintId}`);
        } else {
            toast({
                title: 'Please fill all fields !!!',
                status: 'error',
                isClosable: true,
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

const SprintsMainComponent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef() as RefObject<FocusableElement>;
    const finalRef = useRef() as RefObject<FocusableElement>;

    // sprints
    const [sprints, setSprints] = useState<ISprintColData[]>();

    useEffect(() => {
        getSprints()
            .then(sprint => {
                sprint && setSprints(sprint);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Flex w="100%" my={5} justifyContent="center" gap={2}>
                <Flex alignItems="center">
                    <Button
                        variant="outline"
                        sx={{
                            mx: 2,
                            color: useColorModeValue(
                                colors.btn_save_sprint.light,
                                colors.btn_save_sprint.dark
                            ),
                            w: '15em',
                        }}
                        rightIcon={<MdLibraryAdd />}
                        onClick={onOpen}
                    >
                        Add Sprint
                    </Button>
                    <SaveSprint
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        initialRef={initialRef}
                        finalRef={finalRef}
                        title={''}
                    />
                </Flex>
            </Flex>
            <Box textAlign="center" fontSize="xl" p={3}>
                <Box p={3} className={styles.itemsContainer}>
                    {sprints &&
                        sprints.map(sprint => (
                            <GridItem w="100%" key={sprint.id}>
                                <SprintBox
                                    title={sprint.name}
                                    link={`/sprints/${sprint.id}`}
                                    content={sprint.progess}
                                />
                            </GridItem>
                        ))}
                </Box>
            </Box>
        </>
    );
};

export default SprintsMainComponent;
