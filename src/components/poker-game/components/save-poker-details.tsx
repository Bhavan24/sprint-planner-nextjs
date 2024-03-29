// React imports
import { useEffect, useState } from 'react';
// Firebase imports
import { arrayUnion } from 'firebase/firestore';
// Chakra-UI imports
import {
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
    Select,
    Textarea,
    useToast
} from '@chakra-ui/react';
// Component imports
import SelectUsers from '../../select-users';
import { updateSprintData } from '../../../services/sprint/sprints';
import { getCurrentJiraIssue } from '../../../services/poker/storage';
// Type imports
import { ISavePokerSprintBoxProps, ISprintPokerColData } from '../../../interfaces';
// Constant imports
import { JIRA_BASE_LINK } from '../../../constants';
import { getPoints } from '../../../utils/poker-util';


export const SaveSprintPoker = (props: ISavePokerSprintBoxProps) => {
    const sprintId = props.game.sprintId;
    const points = getPoints(props.game);

    const [inputs, setInputs] = useState<ISprintPokerColData>({
        title: '',
        desc: '',
        link: `${JIRA_BASE_LINK}`,
        assignee: '',
        points: 0
    });

    useEffect(() => {
        const jiraIssue = getCurrentJiraIssue();
        jiraIssue && setInputs({
            title: `${jiraIssue.summary}`,
            desc: `${jiraIssue.description}`,
            link: `${JIRA_BASE_LINK}${jiraIssue.issueKey}`,
            assignee: '',
            points: 0
        });
    }, [props.isOpen]);

    // toast
    const toast = useToast();

    const handleChange = (event: any) => {
        const name = event.target.id;
        const value = event.target.value;
        setInputs(values => (
            { ...values, [name]: value }
        ));
    };

    const handleSubmit = () => {
        const done =
            sprintId &&
            inputs &&
            updateSprintData(sprintId, {
                poker: arrayUnion({
                    title: inputs.title,
                    desc: inputs.desc,
                    link: inputs.link,
                    assignee: inputs.assignee,
                    points: inputs.points
                })
            });
        props.onClose();
        done
            ? toast({
                title: 'Issue Details Added!!!',
                status: 'success',
                isClosable: true,
                position: 'bottom-left'
            })
            : toast({
                title: 'Cannot Add!!!',
                status: 'error',
                isClosable: true,
                position: 'bottom-left'
            });
    };

    return (
        <>
            <Modal
                initialFocusRef={props.initialRef}
                finalFocusRef={props.finalRef}
                isOpen={props.isOpen}
                onClose={props.onClose}
                size='lg'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{props.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex justifyContent='center' flexDir='column' p={4}>
                            <FormControl isRequired m={1}>
                                <FormLabel htmlFor='title'>Title</FormLabel>
                                <Input
                                    id='title'
                                    placeholder='Title'
                                    value={inputs.title}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl m={1}>
                                <FormLabel htmlFor='desc'>Description</FormLabel>
                                <Textarea
                                    id='desc'
                                    placeholder='Description'
                                    value={inputs.desc}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl isRequired m={1}>
                                <FormLabel htmlFor='link'>Link</FormLabel>
                                <Input
                                    id='link'
                                    placeholder='Link'
                                    value={inputs.link}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl isRequired m={1}>
                                <FormLabel htmlFor='assignee'>Assignee</FormLabel>
                                <SelectUsers id='assignee' onChange={handleChange} />
                            </FormControl>
                            <FormControl isRequired m={1}>
                                <FormLabel htmlFor='points'>Points</FormLabel>
                                <Select id='points' placeholder='--Select Points--' onChange={handleChange}>
                                    {points &&
                                        points.map((point: number, index: number) => (
                                            <option key={index} value={point}>
                                                {point}
                                            </option>
                                        ))}
                                </Select>
                            </FormControl>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
