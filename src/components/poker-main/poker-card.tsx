import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { MouseEventHandler, useState } from 'react';

const getCardStyle = (clicked: boolean) => {
    return clicked
        ? {
              marginTop: '-1em',
              zIndex: 5,
              backgroundColor: 'gray.400',
              border: '2px dashed black',
              boxShadow: '0 0px 12px 0 grey',
          }
        : {
              marginTop: '0',
              zIndex: 0,
          };
};

export const PokerCard = ({
    id,
    bgcolor,
    onPress,
}: {
    id: string;
    bgcolor: string;
    onPress: MouseEventHandler;
}) => {
    const [isCardClicked, setCardClicked] = useState(false);

    return (
        <>
            <Button
                maxW="sm"
                maxH="lg"
                borderWidth="2px"
                borderRadius="lg"
                bg={bgcolor}
                onClick={() => {
                    setCardClicked(!isCardClicked);
                }}
                height="8em"
                width="5em"
                m="1"
                flexDirection="column"
                sx={getCardStyle(isCardClicked)}
            >
                <Flex textAlign="left" w="100%">
                    <Text fontSize="xs">{id}</Text>
                </Flex>
                <Flex
                    p="6"
                    alignItems="center"
                    justifyContent="center"
                    alignContent="center"
                    w="100%"
                >
                    <Text fontSize="2xl">{id}</Text>
                </Flex>
                <Flex textAlign="right" w="100%" justifyContent="flex-end">
                    <Text fontSize="xs">{id}</Text>
                </Flex>
            </Button>
        </>
    );
};
