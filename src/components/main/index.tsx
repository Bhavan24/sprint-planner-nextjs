import { Box, GridItem } from '@chakra-ui/react';
import Link from 'next/link';
import { BOX_DETAILS } from '../../constants';
import styles from './main.module.css';
import { SprintBoxProps } from './types';

const SprintBox = ({ box }: SprintBoxProps) => {
    return (
        <Link href={box.link} passHref>
            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                minHeight="30em"
                cursor="pointer"
                m={2}
            >
                <img src={box.imageUrl} alt={box.imageAlt} width={500} height={200} />
                <Box p="6">
                    <Box as="h3" fontWeight="semibold" mt="1">
                        {box.title}
                    </Box>
                    <Box display="flex" alignItems="flex-start" fontWeight="light" mt="2">
                        {box.content}
                    </Box>
                </Box>
            </Box>
        </Link>
    );
};

export const MainComponent = () => {
    return (
        <Box textAlign="center" fontSize="xl" p={3}>
            <Box p={3} className={styles.itemsContainer}>
                {BOX_DETAILS.map(box => (
                    <GridItem w="100%" key={box.link}>
                        <SprintBox box={box} />
                    </GridItem>
                ))}
            </Box>
        </Box>
    );
};
