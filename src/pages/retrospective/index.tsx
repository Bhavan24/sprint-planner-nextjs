import { RETROSPECTIVE_PAGE_NAME } from '../../constants';
import { DashboardLayout } from '../../layouts/dashboard';
import { Chakra } from '../../theme/Chakra';

const Retrospective = () => (
    <Chakra>
        <DashboardLayout title={RETROSPECTIVE_PAGE_NAME}>
            {RETROSPECTIVE_PAGE_NAME}
        </DashboardLayout>
    </Chakra>
);

export default Retrospective;
