import { Box } from '@chakra-ui/react';
import BasePage from '../../components/base';
import NotesComponent from '../../components/notes';
import { NOTES_PAGE_NAME } from '../../constants';

const Notes = () => (
    <BasePage title={NOTES_PAGE_NAME}>
        <Box textAlign="center" fontSize="xl" m={5}>
            <NotesComponent />
        </Box>
    </BasePage>
);

export default Notes;
