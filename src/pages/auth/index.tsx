import { Box } from '@chakra-ui/react';
import { Login } from '../../components/login-component';
import { AuthenticationLayout } from '../../layouts/authentication';
import { LOGIN_PAGE_NAME } from '../../constants';
import { Chakra } from '../../theme/Chakra';

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
