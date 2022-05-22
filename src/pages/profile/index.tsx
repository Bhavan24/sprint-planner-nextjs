import { Box } from '@chakra-ui/react';
import BasePage from '../../components/base';
import ProfileMainComponent from '../../components/profile-main';
import { PROFILE_PAGE_NAME } from '../../constants';

const Profile = () => {
    return (
        <BasePage title={PROFILE_PAGE_NAME}>
            <Box textAlign="center" fontSize="xl" m={5}>
                <ProfileMainComponent />
            </Box>
        </BasePage>
    );
};

export default Profile;
