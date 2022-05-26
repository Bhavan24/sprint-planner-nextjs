import { Flex, Spinner } from '@chakra-ui/react';
import styles from './loading.module.css';

export const Loading = () => {
    return (
        <Flex className={styles.loadingBox}>
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
