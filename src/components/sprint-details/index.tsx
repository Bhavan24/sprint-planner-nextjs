import {
    Box,
    Button,
    Divider,
    Flex,
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
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { useRouter } from 'next/router';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BiEdit } from 'react-icons/bi';
import { auth as authCofig } from '../../../firebase/config';
import {
    ProgressDetails,
    RetrospectiveDetails,
    StoryPointsDetails,
} from '../../components/sprints/sprint-items';
import { IEditSprintBoxProps, ISprintColData } from '../../interfaces';
import { getSprint } from '../../services/sprint/sprints';
import { Chakra } from '../../theme/chakra-theme';
import { getIssues } from '../../utils/sprint-util';
import { Loading } from '../loading';

const EditSprint = (props: IEditSprintBoxProps) => {
    // user
    const [user] = useAuthState(authCofig);
    // toast
    const toast = useToast();
    // issues
    const issues = getIssues(props.sprint.progess);
    // form
    const [inputs, setInputs] = useState({
        open: issues[0].value,
        reopen: issues[1].value,
        inprogress: issues[2].value,
        prcreated: issues[3].value,
        prmerged: issues[4].value,
        inverification: issues[5].value,
        resolved: issues[6].value,
    });

    const handleChange = async (event: any) => {
        const name = event.target.name;
        const value = Number(event.target.value);
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = async () => {
        if (inputs && user) {
            const progess = {
                open: inputs.open,
                reopen: inputs.reopen,
                inprogress: inputs.inprogress,
                prcreated: inputs.prcreated,
                prmerged: inputs.prmerged,
                inverification: inputs.inverification,
                resolved: inputs.resolved,
            };
            // update details
            console.log(progess);
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
                    <ModalHeader>{props.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
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
                                            {issues.map(issue => (
                                                <Tr key={issue.name}>
                                                    <Td>{issue.name}</Td>
                                                    <Td>
                                                        <NumberInput
                                                            defaultValue={issue.value}
                                                        >
                                                            <NumberInputField
                                                                id={issue.type}
                                                                name={issue.type}
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

const SprintDetailComponent = () => {
    // router
    const router = useRouter();

    // state
    const [sprint, setSprint] = useState<ISprintColData>();
    const [loading, setIsLoading] = useState(true);
    const [isEditor, setEditor] = useState(false);

    // modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef() as RefObject<FocusableElement>;
    const finalRef = useRef() as RefObject<FocusableElement>;

    // user
    const [user] = useAuthState(authCofig);

    useEffect(() => {
        if (!router.isReady) return;
        const { id } = router.query;
        async function fetchData(id: string) {
            setIsLoading(true);
            getSprint(id)
                .then(sprint => {
                    setSprint(sprint);
                    sprint && user && setEditor(sprint?.createdById == user?.uid);
                })
                .catch(err => {
                    console.log('err: ', err);
                });
        }
        id && fetchData(id.toString());
        setIsLoading(false);
    }, [router.isReady]);

    if (loading) {
        return (
            <Chakra>
                <Loading />
            </Chakra>
        );
    }

    return (
        <>
            {sprint ? (
                <>
                    <Flex justifyContent="center" alignItems="center">
                        <Text textAlign="center"> {sprint?.name}</Text>
                        {isEditor && (
                            <>
                                <Button m={2} rightIcon={<BiEdit />} onClick={onOpen}>
                                    Edit
                                </Button>
                                <EditSprint
                                    isOpen={isOpen}
                                    onOpen={onOpen}
                                    onClose={onClose}
                                    initialRef={initialRef}
                                    finalRef={finalRef}
                                    title={'Edit Sprint'}
                                    sprint={sprint}
                                />
                            </>
                        )}
                    </Flex>
                    <Divider m={5} />
                    <ProgressDetails data={sprint} />
                    <Divider m={5} />
                    <RetrospectiveDetails data={sprint} />
                    <Divider m={5} />
                    <StoryPointsDetails data={sprint} />
                </>
            ) : (
                <Text textAlign="center">No Details Found</Text>
            )}
        </>
    );
};

export default SprintDetailComponent;
