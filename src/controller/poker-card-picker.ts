import { useColorModeValue } from '@chakra-ui/react';
import { GAME_STATUS } from '../constants';
import { IPlayer, ICardConfig, IGame } from '../interfaces';
import { colors } from '../theme/colors';

export const getCardStyle = (players: IPlayer[], playerId: string, card: ICardConfig) => {
    const player = players.find(player => player.id === playerId);
    if (player && player.value !== undefined && player.value === card.value) {
        return {
            marginTop: '-15px',
            backgroundColor: useColorModeValue(
                colors.poker_card_1.light,
                colors.poker_card_1.dark
            ),
            border: '2px dashed black',
            boxShadow: '0 0px 12px 0 grey',
        };
    }
    return {
        backgroundColor: useColorModeValue(
            colors.poker_card_1.light,
            colors.poker_card_1.dark
        ),
    };
};

export const getPointerEvent = (game: IGame) => {
    if (game.gameStatus === GAME_STATUS.FINISHED) {
        return 'none';
    }
    return 'inherit';
};
