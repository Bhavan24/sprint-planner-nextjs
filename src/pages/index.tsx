import { Box, Grid, VStack } from '@chakra-ui/react';
import { CookieProps } from '../interfaces';
import { DashboardLayout } from '../layouts/dashboard';
import { Chakra } from '../theme/Chakra';

const IndexPage = ({ cookies }: CookieProps) => (
    <Chakra cookies={cookies}>
        <DashboardLayout title="Sprint Planner">
            <Box textAlign="center" fontSize="xl">
                <Grid minH="100vh" p={3}>
                    <VStack spacing={8}></VStack>
                </Grid>
            </Box>
        </DashboardLayout>
    </Chakra>
);

export default IndexPage;
