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
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ISettingsProkerControllerSprintBoxProps } from '../../../interfaces';
import { updateIssueId } from '../../../services/poker/games';

export const SettingsSprintPoker = (props: ISettingsProkerControllerSprintBoxProps) => {
    // toast
    const toast = useToast();
    const [issueId, setIssueId] = useState('');

    const handleSubmit = () => {
        updateIssueId(props.gameId, issueId);
        props.onClose();
        toast({
            title: 'Issue Updated!!!',
            status: 'success',
            isClosable: true,
            position: 'bottom-left',
        });
    };

    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{props.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex justifyContent="center" flexDir="column" p={4}>
                            <FormControl isRequired m={1}>
                                <FormLabel htmlFor="title">
                                    Current Jira Issue Id
                                </FormLabel>
                                <Input
                                    value={issueId}
                                    placeholder="Jira Issue Id"
                                    onChange={(e: any) => {
                                        setIssueId(e.target.value);
                                    }}
                                />
                            </FormControl>
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
