import { Box } from '@chakra-ui/react';
import BasePage from '../../components/base';
import SprintPokerGameComponent from '../../components/poker-game';
import { SPRINT_POKER_PAGE_NAME } from '../../constants';

const SprintPokerGame = () => {
    return (
        <BasePage title={SPRINT_POKER_PAGE_NAME}>
            <Box textAlign="center" fontSize="xl" m={5}>
                <SprintPokerGameComponent />
            </Box>
        </BasePage>
    );
};

export default SprintPokerGame;
