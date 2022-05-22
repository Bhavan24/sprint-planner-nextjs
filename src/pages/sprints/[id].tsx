import { Box } from '@chakra-ui/react';
import BasePage from '../../components/base';
import SprintDetailComponent from '../../components/sprint-details';
import { SPRINTS_PAGE_NAME } from '../../constants';

const SprintDetails = () => {
    return (
        <BasePage title={SPRINTS_PAGE_NAME}>
            <Box textAlign="center" fontSize="xl" m={5}>
                <SprintDetailComponent />
            </Box>
        </BasePage>
    );
};

export default SprintDetails;
