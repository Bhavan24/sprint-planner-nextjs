import { Flex } from '@chakra-ui/react';
import BasePage from '../components/auth-base-component';
import { APP_NAME } from '../constants';
import { IndexProps } from '../interfaces';

const IndexPage = ({ cookies }: IndexProps) => {
    return (
        <BasePage cookies={cookies} title={APP_NAME}>
            <Flex
                justifyContent="center"
                alignContent="center"
                alignItems="center"
                mt="15%"
            >
                <h1>404 | The page could not be found.</h1>
            </Flex>
        </BasePage>
    );
};

export default IndexPage;
