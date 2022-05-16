import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import { SPRINTS_PAGE_NAME } from '../../constants';
import { DashboardLayout } from '../../layouts/dashboard';
import { Chakra } from '../../theme/Chakra';

const SprintDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <Chakra>
            <DashboardLayout title={SPRINTS_PAGE_NAME}>
                <Box textAlign="center" fontSize="xl" m={5}>
                    {SPRINTS_PAGE_NAME} {id}
                </Box>
            </DashboardLayout>
        </Chakra>
    );
};

export default SprintDetails;
