import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
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

    const removeNote = (index: number) => {
        const new_array = [...notes];
        new_array.splice(index, 1);
        localStorage.setItem(NOTES, '');
        localStorage.setItem(NOTES, JSON.stringify(new_array));
        setNotes(new_array);
    };

    return (
        <>
            <Grid m={3}>
                <GridItem p={2}>
                    <TextEditorComponent value={note} onChange={onChange} />
                    <Tooltip title="Add Note">
                        <Button rightIcon={<AiOutlinePlus />} onClick={addNote} m={1}>
                            Add Note
                        </Button>
                    </Tooltip>
                    <Tooltip title="Clear Note">
                        <Button rightIcon={<AiOutlineMinus />} onClick={clearNote} m={1}>
                            Clear Note
                        </Button>
                    </Tooltip>
                </GridItem>
                <GridItem p={2}>
                    <Box m={1}>
                        <Box sx={{ minWidth: 1050 }}>
                            <TableContainer>
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th width="90%">Note</Th>
                                            <Th width="10%">
                                                <Flex justifyContent="center">
                                                    Actions
                                                </Flex>
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
                </GridItem>
            </Grid>
        </>
    );
};

export default NotesComponent;
