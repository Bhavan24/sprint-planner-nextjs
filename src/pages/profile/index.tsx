import { Box } from '@chakra-ui/react';
import { PROFILE_PAGE_NAME } from '../../constants';
import { DashboardLayout } from '../../layouts/dashboard';
import { Chakra } from '../../theme/Chakra';

const Profile = () => (
    <Chakra>
        <DashboardLayout title={PROFILE_PAGE_NAME}>
            <Box textAlign="center" fontSize="xl" m={5}>
                {PROFILE_PAGE_NAME}
            </Box>
        </DashboardLayout>
    </Chakra>
);

export default Profile;
