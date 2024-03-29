// React imports
import React from 'react';
// Chakra-UI imports
import { Box, Button, Flex, Text } from '@chakra-ui/react';
// Component imports
import { getCardStyle, getPointerEvent } from '../../../controller/poker-card-picker';
import { updatePlayerValue } from '../../../services/poker/players';
import { getCards } from '../../../utils/poker-util';
// Type imports
import { ICardConfig, ICardPickerProps } from '../../../interfaces';
// Constant imports
import { GAME_STATUS } from '../../../constants';


const PokerCardPicker: React.FC<ICardPickerProps> = ({
    game,
    players,
    currentPlayerId
}) => {
    const cards = getCards(game);

    const playPlayer = (gameId: string, playerId: string, card: ICardConfig) => {
        if (game.gameStatus !== GAME_STATUS.FINISHED) {
            updatePlayerValue(gameId, playerId, card.value).then(r => console.log(r));
        }
    };

    return (
        <>
            <Box alignItems='center' justifyContent='center'>
                {cards.map((card: ICardConfig, index: number) => (
                    <Button
                        key={index}
                        maxW='sm'
                        maxH='lg'
                        borderWidth='2px'
                        borderRadius='lg'
                        onClick={() => {
                            playPlayer(game.id, currentPlayerId, card);
                        }}
                        height='8em'
                        width='5em'
                        m='1'
                        flexDirection='column'
                        style={{
                            ...getCardStyle(players, currentPlayerId, card),
                            pointerEvents: getPointerEvent(game)
                        }}
                    >
                        <Flex textAlign='left' w='100%'>
                            <Text fontSize='xs'>{card.displayValue}</Text>
                        </Flex>
                        <Flex
                            p='6'
                            alignItems='center'
                            justifyContent='center'
                            alignContent='center'
                            w='100%'
                        >
                            <Text fontSize='2xl'>{card.displayValue}</Text>
                        </Flex>
                        <Flex textAlign='right' w='100%' justifyContent='flex-end'>
                            <Text fontSize='xs'>{card.displayValue}</Text>
                        </Flex>
                    </Button>
                ))}
            </Box>
        </>
    );
};

export default PokerCardPicker;
