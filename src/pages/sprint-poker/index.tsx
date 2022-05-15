import { SPRINT_POKER_PAGE_NAME } from '../../constants';
import { DashboardLayout } from '../../layouts/dashboard';
import { Chakra } from '../../theme/Chakra';

const SprintPoker = () => (
    <Chakra>
        <DashboardLayout title={SPRINT_POKER_PAGE_NAME}>
            {SPRINT_POKER_PAGE_NAME}
        </DashboardLayout>
    </Chakra>
);

export default SprintPoker;
