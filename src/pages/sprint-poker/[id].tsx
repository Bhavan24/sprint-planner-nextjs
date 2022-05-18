import { Box } from '@chakra-ui/react';
import BasePage from '../../components/auth-base-component';
import PokerCardPicker from '../../components/poker-main/poker-card-picker';
import PokerController from '../../components/poker-main/poker-controller';
import PokerPlayers from '../../components/poker-main/poker-players';
import { SPRINT_POKER_PAGE_NAME } from '../../constants';
import { IGame } from '../../interfaces';

const SprintDetails = () => {
    return (
        <BasePage title={SPRINT_POKER_PAGE_NAME}>
            <Box textAlign="center" fontSize="xl" m={5}>
                <Box textAlign="center" m={5}>
                    <PokerPlayers />
                </Box>
                <Box textAlign="center" m={5}>
                    <PokerController />
                </Box>
                <Box textAlign="center" m={5}>
                    <PokerCardPicker
                        game={{} as IGame}
                        players={[]}
                        currentPlayerId={''}
                    />
                </Box>
            </Box>
        </BasePage>
    );
};

export default SprintDetails;
