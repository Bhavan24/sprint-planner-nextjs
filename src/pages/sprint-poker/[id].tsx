import { Box } from '@chakra-ui/react';
import BasePage from '../../components/auth-base-component';
import { PokerCard } from '../../components/poker-main/poker-card';
import PokerController from '../../components/poker-main/poker-controller';
import PokerPlayers from '../../components/poker-main/poker-players';
import { GAME_TYPES, SPRINT_POKER_PAGE_NAME } from '../../constants';

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
                    {/* <Slide direction="bottom" in={true} style={{ zIndex: 10 }}> */}
                    {GAME_TYPES[0].values.map(val => (
                        <PokerCard
                            id={val.toString()}
                            bgcolor="blue.500"
                            onPress={() => {}}
                        />
                    ))}
                    <PokerCard id={'🙄'} bgcolor="blue.500" onPress={() => {}} />
                    {/* </Slide> */}
                </Box>
            </Box>
        </BasePage>
    );
};

export default SprintDetails;
