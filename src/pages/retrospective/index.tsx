import RetrospectiveComponent from '../../components/retrospective-component';
import { RETROSPECTIVE_PAGE_NAME } from '../../constants';
import { DashboardLayout } from '../../layouts/dashboard';
import { Chakra } from '../../theme/Chakra';

const Retrospective = () => (
    <Chakra>
        <DashboardLayout title={RETROSPECTIVE_PAGE_NAME}>
            <RetrospectiveComponent />
        </DashboardLayout>
    </Chakra>
);

export default Retrospective;
