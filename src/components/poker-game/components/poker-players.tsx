// React imports
import React from 'react';
// Chakra-UI imports
import { Box, Flex, Text, Tooltip, CloseButton, useToast } from '@chakra-ui/react';
// Component imports
import { getCardColor, getCardValue } from '../../../controller/poker-players';
// Type imports
import { IPlayerCardProps, IPokerPlayersProps } from '../../../interfaces';
import { deletePlayerFromGame } from '../../../services/poker/players';

const PlayerCard: React.FC<IPlayerCardProps> = props => {
    // toast
    const toast = useToast();

    const removePlayer = () => {
        deletePlayerFromGame(props.game.id, props.player.id)
            .then(() => {
                toast({
                    title: `Player Removed!`,
                    status: 'success',
                    isClosable: true,
                    position: 'bottom-left',
                });
            })
            .catch(error => {
                toast({
                    title: `${error}`,
                    status: 'error',
                    isClosable: true,
                    position: 'bottom-left',
                });
            });
    };

    return (
        <Box
            maxW="sm"
            maxH="lg"
            borderWidth="2px"
            borderRadius="lg"
            onClick={() => {}}
            height="9.5em"
            width="7.5em"
            m="1"
            bg={getCardColor(props.player, props.game)}
        >
            {props.isAdmin && (
                <Flex
                    alignItems="center"
                    justifyContent="flex-end"
                    alignContent="center"
                    p="1"
                >
                    <CloseButton size="sm" onClick={removePlayer} />
                </Flex>
            )}
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
                            <PlayerCard
                                key={index}
                                game={props.game}
                                player={player}
                                isAdmin={props.game.createdById === props.currentPlayerId}
                            />
                        )
                )}
            </Flex>
        </>
    );
};

export default PokerPlayers;
