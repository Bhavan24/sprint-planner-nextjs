import { DeleteIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { NOTES } from '../../constants';
import { TextEditorComponent } from './editor';

const NotesComponent = () => {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState<string[]>([]);

    useEffect(() => {
        localStorage.getItem(NOTES) &&
            setNotes(JSON.parse(localStorage.getItem(NOTES) || ''));
    }, []);

    const onChange = useCallback((value: string) => {
        setNote(value);
    }, []);

    const addNote = () => {
        const new_array = note ? [...notes, note] : [...notes];
        localStorage.setItem(NOTES, '');
        localStorage.setItem(NOTES, JSON.stringify(new_array));
        setNotes(new_array);
    };

    const clearNote = () => {
        setNote('');
    };

    const deleteNotes = () => {
        localStorage.removeItem(NOTES);
        setNotes([]);
    };

    const removeNote = (index: number) => {
        const new_array = [...notes];
        new_array.splice(index, 1);
        localStorage.setItem(NOTES, '');
        localStorage.setItem(NOTES, JSON.stringify(new_array));
        setNotes(new_array);
    };

    return (
        <>
            <Flex m={3} flexDir="row" justifyContent="center">
                <Box p={2} justifyContent="center">
                    <TextEditorComponent value={note} onChange={onChange} />
                </Box>
                <Flex flexDir="column" alignItems="center" justifyContent="center">
                    <Tooltip title="Add Note">
                        <Button
                            rightIcon={<AiOutlinePlus />}
                            onClick={addNote}
                            m={1}
                            w="15em"
                        >
                            Add Note
                        </Button>
                    </Tooltip>
                    <Tooltip title="Clear Note">
                        <Button
                            rightIcon={<AiOutlineMinus />}
                            onClick={clearNote}
                            m={1}
                            w="15em"
                        >
                            Clear Note
                        </Button>
                    </Tooltip>
                    <Tooltip title="Delete All Notes">
                        <Button
                            rightIcon={<DeleteIcon />}
                            onClick={deleteNotes}
                            m={1}
                            w="15em"
                        >
                            Delete All Notes
                        </Button>
                    </Tooltip>
                </Flex>
            </Flex>
            <Box p={2} m="5em 0">
                <Box m={1}>
                    <Box>
                        <TableContainer>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th width="90%">Note</Th>
                                        <Th width="10%">
                                            <Flex justifyContent="center">Actions</Flex>
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {notes.map((note: string, index: number) => (
                                        <Tr key={index}>
                                            <Td>
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: note,
                                                    }}
                                                />
                                            </Td>
                                            <Td>
                                                <Flex justifyContent="center">
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
