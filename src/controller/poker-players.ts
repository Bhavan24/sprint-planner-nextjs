import { useColorModeValue } from '@chakra-ui/react';
import { GAME_STATUS } from '../constants';
import { IGame, IPlayer } from '../interfaces';
import { colors } from '../theme/colors';
import { getCards } from '../utils/poker-util';

export const getCardColor = (player: IPlayer, game: IGame): string => {
    if (game.gameStatus !== GAME_STATUS.FINISHED) {
        if (player.status === GAME_STATUS.FINISHED) {
            return useColorModeValue(colors.poker_card_2.light, colors.poker_card_2.dark);
        }
        return useColorModeValue(colors.poker_card_3.light, colors.poker_card_3.dark);
    }
    return useColorModeValue(colors.poker_card_2.light, colors.poker_card_2.dark);
};

export const getCardValue = (player: IPlayer, game: IGame) => {
    if (game.gameStatus !== GAME_STATUS.FINISHED) {
        return player.status === GAME_STATUS.FINISHED ? '👍' : '🤔';
    }

    if (game.gameStatus === GAME_STATUS.FINISHED) {
        if (player.status === GAME_STATUS.FINISHED) {
            return getCardDisplayValue(game, player.value);
        }
        return '🤔';
    }
};

export const getCardDisplayValue = (
    game: IGame,
    cardValue: number | undefined
): string | number | undefined => {
    return (
        getCards(game).find(card => card.value === cardValue)?.displayValue || cardValue
    );
};
