import { Box } from '@chakra-ui/react';
import { Login } from '../../components/login';
import { LOGIN_PAGE_NAME } from '../../constants';
import { AuthenticationLayout } from '../../layouts/authentication';
import { Chakra } from '../../theme/chakra-theme';

const LoginPage = () => (
    <Chakra>
        <AuthenticationLayout title={LOGIN_PAGE_NAME}>
            <Box textAlign="center" fontSize="xl" m={5}>
                <Login />
            </Box>
        </AuthenticationLayout>
    </Chakra>
);

export default LoginPage;
