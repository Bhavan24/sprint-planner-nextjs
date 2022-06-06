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
    useToast
} from '@chakra-ui/react';
import Papa from 'papaparse';
import { useState } from 'react';
import { IJiraIssues, ISettingsProkerControllerSprintBoxProps } from '../../../interfaces';
import { updateIssueId } from '../../../services/poker/games';
import SelectCurrentIssue from '../../select-current-issue';

export const SettingsSprintPoker = (props: ISettingsProkerControllerSprintBoxProps) => {
    // toast
    const toast = useToast();

    // states
    const [issueId, setIssueId] = useState('');
    const [csvFile, setCsvFile] = useState('');
    const [jiraIssues, setJiraIssues] = useState<IJiraIssues[]>([]);

    const handleSubmit = () => {
        updateIssueId(props.gameId, issueId).then(r => console.log(r));
        props.onClose();
        toast({
            title: 'Issue Updated!!!',
            status: 'success',
            isClosable: true,
            position: 'bottom-left'
        });
    };

    const importCsvFile = () => {
        Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: function(results: any) {
                const currentJiraIssues: IJiraIssues[] = [];
                results.data.forEach((result: any) => {
                    currentJiraIssues.push({
                        issueKey: result['Issue key'],
                        priority: result['Priority'],
                        summary: result['Summary'],
                        description: result['Description']
                    });
                });
                setJiraIssues(currentJiraIssues);
                toast({
                    title: 'Issues Imported!!!',
                    status: 'success',
                    isClosable: true,
                    position: 'bottom-left'
                });
            }
        });
    };

    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.onClose} size='2xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{props.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Accordion allowToggle>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            Select Current Jira Issue
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <FormControl isRequired m={1}>
                                        <SelectCurrentIssue
                                            onChange={(e: any) => {
                                                setIssueId(e.target.value);
                                            }}
                                            issues={jiraIssues}
                                        />
                                        <Button colorScheme='blue' m={2} onClick={handleSubmit}>
                                            Save
                                        </Button>
                                    </FormControl>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            Import Jira Issues
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <FormControl isRequired m={1}>
                                        <Input
                                            type='file'
                                            variant='flushed'
                                            id='file'
                                            accept='.csv'
                                            onChange={(event: any) => {
                                                setCsvFile(event.target.files[0]);
                                            }}
                                            style={{
                                                display: 'block',
                                                margin: '10px auto'
                                            }}
                                        />
                                        <Button
                                            colorScheme='blue'
                                            mr={3}
                                            onClick={importCsvFile}
                                            w='inherit'
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
                                        <Box flex='1' textAlign='left'>
                                            View Jira Issues
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <TableContainer>
                                        <Table size='sm'>
                                            <Thead>
                                                <Tr>
                                                    <Th>Issue key</Th>
                                                    <Th>Priority</Th>
                                                    <Th>Summary</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {
                                                    jiraIssues.map((jiraIssue: IJiraIssues, i: number) => (
                                                        <Tr key={i}>
                                                            <Td>{jiraIssue.issueKey}</Td>
                                                            <Td>{jiraIssue.priority}</Td>
                                                            <Td>{jiraIssue.summary}</Td>
                                                        </Tr>
                                                    ))
                                                }
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
