import { Box, Grid, VStack } from '@chakra-ui/react';
import { MainComponent } from '../components/main';
import { APP_NAME } from '../constants';
import { IndexProps } from '../interfaces';
import { DashboardLayout } from '../layouts/dashboard';
import { Chakra } from '../theme/Chakra';

const IndexPage = ({ cookies }: IndexProps) => (
    <Chakra cookies={cookies}>
        <DashboardLayout title={APP_NAME}>
            <MainComponent />
        </DashboardLayout>
    </Chakra>
);

export default IndexPage;
