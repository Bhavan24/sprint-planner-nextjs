import { Box } from '@chakra-ui/react';
import { SPRINT_POKER_PAGE_NAME } from '../../constants';
import { DashboardLayout } from '../../layouts/dashboard';
import { Chakra } from '../../theme/Chakra';

const SprintPoker = () => (
    <Chakra>
        <DashboardLayout title={SPRINT_POKER_PAGE_NAME}>
            <Box textAlign="center" fontSize="xl" m={5}>
                {SPRINT_POKER_PAGE_NAME}
            </Box>
        </DashboardLayout>
    </Chakra>
);

export default SprintPoker;
