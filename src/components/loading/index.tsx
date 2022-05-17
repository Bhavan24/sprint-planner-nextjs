import { Flex, Spinner } from '@chakra-ui/react';

export const Loading = () => {
    return (
        <Flex justifyContent="center" alignContent="center" alignItems="center" mt="22%">
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
            />
        </Flex>
    );
};
