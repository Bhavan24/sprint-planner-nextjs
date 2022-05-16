import { Box } from '@chakra-ui/react';
import { SPRINTS_PAGE_NAME } from '../../constants';
import { DashboardLayout } from '../../layouts/dashboard';
import { Chakra } from '../../theme/Chakra';

const Sprints = () => (
    <Chakra>
        <DashboardLayout title={SPRINTS_PAGE_NAME}>
            <Box textAlign="center" fontSize="xl" m={5}>
                {SPRINTS_PAGE_NAME}
            </Box>
        </DashboardLayout>
    </Chakra>
);

export default Sprints;
