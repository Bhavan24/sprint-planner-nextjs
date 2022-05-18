import { Box, Button, Flex, Text, Tooltip } from '@chakra-ui/react';
import { IPlayerCardProps } from '../../interfaces';

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
        >
            <Flex
                p="8"
                alignItems="center"
                justifyContent="center"
                alignContent="center"
                w="100%"
            >
                <Text fontSize="2xl">{props.value}</Text>
            </Flex>
            <Tooltip label={props.name}>
                <Text fontSize="md" overflow="hidden">
                    {props.name}
                </Text>
            </Tooltip>
        </Box>
    );
};

const PokerPlayers = () => {
    return (
        <>
            <Text fontSize="md" m={2}>
                👍 - Voting Done 🤔 - Yet to Vote
            </Text>
            <Flex alignContent="center" alignItems="center" justifyContent="center">
                <PlayerCard name={'bhavaneetharan'} value={'1'} />
                <PlayerCard name={'keerthu'} value={'4'} />
            </Flex>
        </>
    );
};

export default PokerPlayers;
