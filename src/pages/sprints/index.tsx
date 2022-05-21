import { Box } from '@chakra-ui/react';
import BasePage from '../../components/base';
import { SprintTable } from '../../components/main';
import { SPRINTS_PAGE_NAME } from '../../constants';

const Sprints = () => (
    <BasePage title={SPRINTS_PAGE_NAME}>
        <Box textAlign="center" fontSize="xl" m={5}>
            {SPRINTS_PAGE_NAME}
            <SprintTable />
        </Box>
    </BasePage>
);

export default Sprints;
