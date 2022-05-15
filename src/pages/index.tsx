import { Box, Code, Text, Link, VStack, Grid } from '@chakra-ui/react';
import { Chakra } from '../theme/Chakra';
import { DashboardLayout } from '../layouts/dashboard';

interface IndexProps {
    cookies?: string;
}

const IndexPage = ({ cookies }: IndexProps) => (
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
// export { getServerSideProps } from '../theme/Chakra';
