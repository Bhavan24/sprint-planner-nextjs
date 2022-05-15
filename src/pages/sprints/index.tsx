import { SPRINTS_PAGE_NAME } from '../../constants';
import { DashboardLayout } from '../../layouts/dashboard';
import { Chakra } from '../../theme/Chakra';

const Sprints = () => (
    <Chakra>
        <DashboardLayout title={SPRINTS_PAGE_NAME}>{SPRINTS_PAGE_NAME}</DashboardLayout>
    </Chakra>
);

export default Sprints;
