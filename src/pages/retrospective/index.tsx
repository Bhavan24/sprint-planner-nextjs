import { Box } from '@chakra-ui/react';
import BasePage from '../../components/base';
import RetrospectiveComponent from '../../components/retro';
import { RETROSPECTIVE_PAGE_NAME } from '../../constants';

const Retrospective = () => (
    <BasePage title={RETROSPECTIVE_PAGE_NAME}>
        <Box textAlign="center" fontSize="xl" m={5}>
            <RetrospectiveComponent />
        </Box>
    </BasePage>
);

export default Retrospective;
