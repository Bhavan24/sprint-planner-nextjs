import { Box, Grid, VStack } from '@chakra-ui/react';

export const MainComponent = () => {
    return (
        <Box textAlign="center" fontSize="xl">
            <Grid minH="80vh" p={3}>
                <VStack spacing={8}></VStack>
            </Grid>
        </Box>
    );
};
