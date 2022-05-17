import { Box } from '@chakra-ui/react';
import BasePage from '../../components/auth-base-component';
import PokerMainComponent from '../../components/poker-main';
import { SPRINT_POKER_PAGE_NAME } from '../../constants';

const SprintPoker = () => (
    <BasePage title={SPRINT_POKER_PAGE_NAME}>
        <Box textAlign="center" fontSize="xl" m={5}>
            <PokerMainComponent />
        </Box>
    </BasePage>
);

export default SprintPoker;
