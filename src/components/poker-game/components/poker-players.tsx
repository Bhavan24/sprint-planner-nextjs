import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { getCardColor, getCardValue } from '../../../controller/poker-players';
import { IPlayerCardProps, IPokerPlayersProps } from '../../../interfaces';

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
            bg={getCardColor(props.player, props.game)}
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
            <Flex
                alignContent="center"
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
            >
                {props.players.map(
                    (player, index: number) =>
                        !player.isSpectator && (
                            <PlayerCard key={index} game={props.game} player={player} />
                        )
                )}
            </Flex>
        </>
    );
};

export default PokerPlayers;
