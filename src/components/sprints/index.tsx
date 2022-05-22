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
    useToast
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RefObject, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdLibraryAdd } from 'react-icons/md';
import { auth as authCofig } from '../../../firebase/config';
import { ISaveSprintBoxProps } from '../../interfaces';
import { addNewSprint } from '../../services/sprint/sprints';
import { colors } from '../../theme/colors';
import { details } from '../../utils/sample-data';
import styles from './sprints.module.css';

interface SprintBoxProps {
    link: string;
    title: string;
    content?: {
        open: string;
        reopen: string;
        inprogress: string;
        prcreated: string;
        prmerged: string;
        inverification: string;
        resolved: string;
    };
}

const SprintBox = (props: SprintBoxProps) => {
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
                            <div className={styles.text}>
                                <b>OPEN</b>
                                <i>{props.content.open}</i>
                            </div>
                            <div className={styles.text}>
                                <b>REOPENED</b>
                                <i>{props.content.reopen}</i>
                            </div>
                            <div className={styles.text}>
                                <b>IN PROGRESS</b>
                                <i>{props.content.inprogress}</i>
                            </div>
                            <div className={styles.text}>
                                <b>PR CREATED</b>
                                <i>{props.content.prcreated}</i>
                            </div>
                            <div className={styles.text}>
                                <b>PR MERGED</b>
                                <i>{props.content.prmerged}</i>
                            </div>
                            <div className={styles.text}>
                                <b>IN VERIFICATION</b>
                                <i>{props.content.inverification}</i>
                            </div>
                            <div className={styles.text}>
                                <b>RESOLVED</b>
                                <i>{props.content.resolved}</i>
                            </div>
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
        open: 0,
        reopen: 0,
        inprogress: 0,
        prcreated: 0,
        prmerged: 0,
        inverification: 0,
        resolved: 0,
    });

    const handleSubmit = async () => {
        if (form && form.name && user) {
            const progess = {
                open: form.open,
                reopen: form.reopen,
                inprogress: form.inprogress,
                prcreated: form.prcreated,
                prmerged: form.prmerged,
                inverification: form.inverification,
                resolved: form.resolved,
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
                                            <Tr>
                                                <Td>OPEN</Td>
                                                <Td>
                                                    <NumberInput>
                                                        <NumberInputField
                                                            id="OPEN"
                                                            onChange={(e: any) => {
                                                                setForm({
                                                                    ...form,
                                                                    open: e.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </NumberInput>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>REOPENED</Td>
                                                <Td>
                                                    <NumberInput>
                                                        <NumberInputField
                                                            id="REOPENED"
                                                            onChange={(e: any) => {
                                                                setForm({
                                                                    ...form,
                                                                    reopen: e.target
                                                                        .value,
                                                                });
                                                            }}
                                                        />
                                                    </NumberInput>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>IN PROGRESS</Td>
                                                <Td>
                                                    <NumberInput>
                                                        <NumberInputField
                                                            id="IN-PROGRESS"
                                                            onChange={(e: any) => {
                                                                setForm({
                                                                    ...form,
                                                                    inprogress:
                                                                        e.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </NumberInput>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>PR CREATED</Td>
                                                <Td>
                                                    <NumberInput>
                                                        <NumberInputField
                                                            id="PR-CREATED"
                                                            onChange={(e: any) => {
                                                                setForm({
                                                                    ...form,
                                                                    prcreated:
                                                                        e.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </NumberInput>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>PR MERGED</Td>
                                                <Td>
                                                    <NumberInput>
                                                        <NumberInputField
                                                            id="PR-MERGED"
                                                            onChange={(e: any) => {
                                                                setForm({
                                                                    ...form,
                                                                    prmerged:
                                                                        e.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </NumberInput>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>IN VERIFICATION</Td>
                                                <Td>
                                                    <NumberInput>
                                                        <NumberInputField
                                                            id="IN-VERIFICATION"
                                                            onChange={(e: any) => {
                                                                setForm({
                                                                    ...form,
                                                                    inverification:
                                                                        e.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </NumberInput>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>RESOLVED</Td>
                                                <Td>
                                                    <NumberInput>
                                                        <NumberInputField
                                                            id="RESOLVED"
                                                            onChange={(e: any) => {
                                                                setForm({
                                                                    ...form,
                                                                    resolved:
                                                                        e.target.value,
                                                                });
                                                            }}
                                                        />
                                                    </NumberInput>
                                                </Td>
                                            </Tr>
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
                        btnText={''}
                        btnColor={''}
                        title={''}
                    />
                </Flex>
            </Flex>
            <Box textAlign="center" fontSize="xl" p={3}>
                <Box p={3} className={styles.itemsContainer}>
                    {details.map(box => (
                        <GridItem w="100%" key={box.link}>
                            {box.content ? (
                                <SprintBox
                                    title={box.title}
                                    link={box.link}
                                    content={box.content}
                                />
                            ) : (
                                <SprintBox title={box.title} link={box.link} />
                            )}
                        </GridItem>
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default SprintsMainComponent;
