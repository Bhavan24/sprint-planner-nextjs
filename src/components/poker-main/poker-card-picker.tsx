import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { GAME_STATUS } from '../../constants';
import { ICardConfig, ICardPickerProps, IGame, IPlayer } from '../../interfaces';
import { updatePlayerValue } from '../../services/poker/players';
import { getCards } from '../../utils/poker-util';

const PokerCardPicker: React.FC<ICardPickerProps> = ({
    game,
    players,
    currentPlayerId,
}) => {
    const cards = getCards(game.gameType);

    const playPlayer = (gameId: string, playerId: string, card: ICardConfig) => {
        if (game.gameStatus !== GAME_STATUS.FINISHED) {
            updatePlayerValue(gameId, playerId, card.value);
        }
    };

    return (
        <>
            <Box alignItems="center" justifyContent="center">
                {cards.map((card: ICardConfig, index: number) => (
                    <Button
                        key={index}
                        maxW="sm"
                        maxH="lg"
                        borderWidth="2px"
                        borderRadius="lg"
                        onClick={() => {
                            playPlayer(game.id, currentPlayerId, card);
                        }}
                        height="8em"
                        width="5em"
                        m="1"
                        flexDirection="column"
                        style={{
                            ...getCardStyle(players, currentPlayerId, card),
                            pointerEvents: getPointerEvent(game),
                        }}
                    >
                        <Flex textAlign="left" w="100%">
                            <Text fontSize="xs">{card.displayValue}</Text>
                        </Flex>
                        <Flex
                            p="6"
                            alignItems="center"
                            justifyContent="center"
                            alignContent="center"
                            w="100%"
                        >
                            <Text fontSize="2xl">{card.displayValue}</Text>
                        </Flex>
                        <Flex textAlign="right" w="100%" justifyContent="flex-end">
                            <Text fontSize="xs">{card.displayValue}</Text>
                        </Flex>
                    </Button>
                ))}
            </Box>
        </>
    );
};

const getCardStyle = (players: IPlayer[], playerId: string, card: ICardConfig) => {
    const player = players.find(player => player.id === playerId);
    if (player && player.value !== undefined && player.value === card.value) {
        return {
            marginTop: '-15px',
            backgroundColor: card.color,
            border: '2px dashed black',
            boxShadow: '0 0px 12px 0 grey',
        };
    }
    return { backgroundColor: card.color };
};

const getPointerEvent = (game: IGame) => {
    if (game.gameStatus === GAME_STATUS.FINISHED) {
        return 'none';
    }
    return 'inherit';
};

export default PokerCardPicker;
