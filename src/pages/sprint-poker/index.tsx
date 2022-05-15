import { CookieProps } from '../../interfaces';
import { DashboardLayout } from '../../layouts/dashboard';
import { routes } from '../../routes';
import { Chakra } from '../../theme/Chakra';

const current_page_name = routes[2].name;

const SprintPoker = ({ cookies }: CookieProps) => (
    <Chakra cookies={cookies}>
        <DashboardLayout title={current_page_name}>{current_page_name}</DashboardLayout>
    </Chakra>
);

export default SprintPoker;
