import { Box } from '@chakra-ui/react';
import BasePage from '../../components/base';
import SprintsMainComponent from '../../components/sprints';
import { SPRINTS_PAGE_NAME } from '../../constants';

const Sprints = () => (
    <BasePage title={SPRINTS_PAGE_NAME}>
        <Box textAlign="center" fontSize="xl" m={5}>
            <SprintsMainComponent />
        </Box>
    </BasePage>
);

export default Sprints;
