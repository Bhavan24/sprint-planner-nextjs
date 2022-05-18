import { Box, Button } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

export const PokerCard = ({
    id,
    bgcolor,
    onPress,
}: {
    id: string;
    bgcolor: string;
    onPress: MouseEventHandler;
}) => {
    return (
        <>
            <Button
                maxW="sm"
                maxH="lg"
                borderWidth="1px"
                borderRadius="lg"
                bg={bgcolor}
                onClick={onPress}
                height="8em"
                m="1"
            >
                <Box
                    p="6"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    alignContent="center"
                >
                    {id}
                </Box>
            </Button>
        </>
    );
};
