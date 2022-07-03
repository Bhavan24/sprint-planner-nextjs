// React imports
import { useState } from 'react';
// Chakra-UI imports
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    FormControl,
    Input,
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
    useToast,
} from '@chakra-ui/react';
// Component imports
import Papa from 'papaparse';
import SelectCurrentIssue from '../../select-current-issue';
import { updateIssueId } from '../../../services/poker/games';
import { setCurrentJiraIssue } from '../../../services/poker/storage';
// Type imports
import { IJiraIssue, ISSettingsPokerControllerSprintBoxProps } from '../../../interfaces';

export const SettingsSprintPoker = (props: ISSettingsPokerControllerSprintBoxProps) => {
    // toast
    const toast = useToast();

    // states
    const [csvFile, setCsvFile] = useState('');
    const [jiraIssues, setJiraIssues] = useState<IJiraIssue[]>([]);

    const updateIssue = (id: any) => {
        updateIssueId(props.gameId, id).then(r => console.log(r));

        toast({
            title: `${id} Selected!!!`,
            status: 'success',
            isClosable: true,
            position: 'bottom-left',
        });

        const currentIssue = jiraIssues.find(jiraIssue => jiraIssue.issueKey === id);
        currentIssue && setCurrentJiraIssue(currentIssue);

        props.onClose();
    };

    const handleChange = (e: any) => {
        const issueId = e.target.value;
        issueId && updateIssue(issueId);
    };

    const importCsvFile = () => {
        Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: function (results: any) {
                const currentJiraIssues: IJiraIssue[] = [];
                results.data.forEach((result: any) => {
                    currentJiraIssues.push({
                        issueKey: result['Issue key'],
                        priority: result['Priority'],
                        summary: result['Summary'],
                        description: result['Description'],
                    });
                });
                setJiraIssues(currentJiraIssues);
                toast({
                    title: 'Issues Imported!!!',
                    status: 'success',
                    isClosable: true,
                    position: 'bottom-left',
                });
            },
        });
    };

    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.onClose} size="3xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{props.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Accordion allowToggle defaultIndex={[0]}>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left">
                                            Select Current Jira Issue
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <FormControl isRequired m={1}>
                                        <SelectCurrentIssue
                                            onChange={handleChange}
                                            issues={jiraIssues}
                                        />
                                    </FormControl>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left">
                                            Import Jira Issues
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <FormControl isRequired m={1}>
                                        <Input
                                            type="file"
                                            variant="flushed"
                                            id="file"
                                            accept=".csv"
                                            onChange={(event: any) => {
                                                setCsvFile(event.target.files[0]);
                                            }}
                                            style={{
                                                display: 'block',
                                                margin: '10px auto',
                                            }}
                                        />
                                        <Button
                                            colorScheme="blue"
                                            mr={3}
                                            onClick={importCsvFile}
                                            w="inherit"
                                            disabled={csvFile === ''}
                                        >
                                            Import
                                        </Button>
                                    </FormControl>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left">
                                            View Jira Issues
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <TableContainer>
                                        <Table>
                                            <Thead>
                                                <Tr>
                                                    <Th>Issue key</Th>
                                                    <Th>Summary</Th>
                                                    <Th>Priority</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {jiraIssues.map(
                                                    (
                                                        jiraIssue: IJiraIssue,
                                                        i: number
                                                    ) => (
                                                        <Tr key={i}>
                                                            <Td>{jiraIssue.issueKey}</Td>
                                                            <Td>{jiraIssue.summary}</Td>
                                                            <Td>{jiraIssue.priority}</Td>
                                                        </Tr>
                                                    )
                                                )}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
