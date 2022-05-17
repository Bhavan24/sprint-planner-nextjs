import { Box, Grid, VStack } from '@chakra-ui/react';
import BasePage from '../../components/auth-base-component';
import RetrospectiveComponent from '../../components/retrospective-component';
import { RETROSPECTIVE_PAGE_NAME } from '../../constants';
import { DashboardLayout } from '../../layouts/dashboard';
import { Chakra } from '../../theme/Chakra';

const Retrospective = () => (
    <BasePage title={RETROSPECTIVE_PAGE_NAME}>
        <Box textAlign="center" fontSize="xl" m={5}>
            <RetrospectiveComponent />
        </Box>
    </BasePage>
);

export default Retrospective;
