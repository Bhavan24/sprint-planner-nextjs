import { Box, Flex, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { GAME_STATUS } from '../../constants';
import { IGame, IPlayer, IPlayerCardProps, IPokerPlayersProps } from '../../interfaces';
import { getCards } from '../../utils/poker-util';

const getCardColor = (game: IGame, value: number | undefined): string => {
    if (game.gameStatus !== GAME_STATUS.FINISHED) {
        return useColorModeValue('gray.300', 'gray.600');
    }
    const card = getCards(game).find(card => card.value === value);
    return card ? card.color : '#3993ff';
};

const getCardValue = (player: IPlayer, game: IGame) => {
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

const getCardDisplayValue = (
    game: IGame,
    cardValue: number | undefined
): string | number | undefined => {
    return (
        getCards(game).find(card => card.value === cardValue)?.displayValue || cardValue
    );
};

const PlayerCard: React.FC<IPlayerCardProps> = props => {
    return (
        <Box
            maxW="sm"
            maxH="lg"
            borderWidth="2px"
            borderRadius="lg"
            onClick={() => {}}
            height="8em"
            width="6em"
            m="1"
            bg={getCardColor(props.game, props.player.value)}
        >
            <Flex
                p="3"
                alignItems="center"
                justifyContent="center"
                alignContent="center"
                w="100%"
            >
                <Text fontSize="5xl">{getCardValue(props.player, props.game)}</Text>
            </Flex>
            <Tooltip label={props.player.name}>
                <Text fontSize="md" overflow="hidden">
                    {props.player.name}
                </Text>
            </Tooltip>
        </Box>
    );
};

const PokerPlayers: React.FC<IPokerPlayersProps> = props => {
    return (
        <>
            <Text fontSize="md" m={2}>
                👍 - Voting Done 🤔 - Yet to Vote
            </Text>
            <Flex alignContent="center" alignItems="center" justifyContent="center">
                {props.players.map((player, index: number) => (
                    <PlayerCard key={index} game={props.game} player={player} />
                ))}
            </Flex>
        </>
    );
};

export default PokerPlayers;
