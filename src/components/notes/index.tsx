// React imports
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
// Chakra-UI imports
import {
    Box,
    Button,
    Flex,
    IconButton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tooltip,
    Tr,
    useDisclosure,
    useMediaQuery
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
// Component imports
import { TextEditorComponent } from './editor';
import AlertBox from '../alertbox';
import {
    addNoteToStorage,
    deleteNotesFromStorage,
    getNotesFromStorage,
    removeNoteFromStorage
} from '../../services/notes/storage';
// Icon imports
import { DeleteIcon } from '@chakra-ui/icons';
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
// Constant imports
import { ELEMENT_TEXT } from '../../constants';


const NotesComponent = () => {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState<string[]>([]);

    // screen
    const [isPhone] = useMediaQuery('(max-width: 580px)');

    // alerts
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef() as RefObject<FocusableElement>;

    useEffect(() => {
        setNotes(getNotesFromStorage());
    }, []);

    const onChange = useCallback((newValue: any, editor: any) => {
        setNote(newValue);
    }, []);

    const addNote = () => {
        const new_array = note ? [...notes, note] : [...notes];
        addNoteToStorage(new_array);
        setNotes(new_array);
    };

    const clearNote = () => {
        setNote('');
    };

    const deleteNotes = () => {
        deleteNotesFromStorage();
        setNotes([]);
        onClose();
    };

    const removeNote = (index: number) => {
        const new_array = [...notes];
        new_array.splice(index, 1);
        removeNoteFromStorage(new_array);
        setNotes(new_array);
    };

    return (
        <>
            <Flex m={3} flexDir='column' justifyContent='center'>
                <Box p={2} justifyContent='center'>
                    <TextEditorComponent value={note} onChange={onChange} />
                </Box>
                <Flex
                    flexDir={isPhone ? 'column' : 'row'}
                    alignItems='center'
                    justifyContent='center'
                >
                    <Tooltip title='Add Note'>
                        <Button
                            rightIcon={<AiOutlinePlus />}
                            onClick={addNote}
                            m={1}
                            w='15em'
                        >
                            {ELEMENT_TEXT.NOTES_ADD_BUTTON}
                        </Button>
                    </Tooltip>
                    <Tooltip title='Clear Note'>
                        <Button
                            rightIcon={<AiOutlineMinus />}
                            onClick={clearNote}
                            m={1}
                            w='15em'
                        >
                            {ELEMENT_TEXT.NOTES_CLEAR_BUTTON}
                        </Button>
                    </Tooltip>
                    <Tooltip title='Delete All Notes'>
                        <Button
                            rightIcon={<DeleteIcon />}
                            onClick={onOpen}
                            m={1}
                            w='15em'
                        >
                            {ELEMENT_TEXT.NOTES_DELETE_ALL_BUTTON}
                        </Button>
                    </Tooltip>
                    <AlertBox
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        cancelRef={cancelRef}
                        onAction={deleteNotes}
                        btnText={'Delete'}
                        btnColor={'red'}
                        title={'Clear All Items'}
                        body={`Are you sure? You can't undo this action afterwards.`}
                    />
                </Flex>
            </Flex>
            <Box p={2}>
                <Box m={1}>
                    <Box>
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th width='90%'>Note</Th>
                                        <Th width='10%'>
                                            <Flex justifyContent='center'>Actions</Flex>
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {notes.map((note: string, index: number) => (
                                        <Tr key={index}>
                                            <Td>
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: note
                                                    }}
                                                />
                                            </Td>
                                            <Td>
                                                <Flex justifyContent='center'>
                                                    <IconButton
                                                        onClick={() => {
                                                            removeNote(index);
                                                        }}
                                                        aria-label={'removeNote'}
                                                    >
                                                        <AiOutlineDelete />
                                                    </IconButton>
                                                </Flex>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default NotesComponent;
