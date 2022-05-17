import {
    Box,
    Button,
    Container,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Stack,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const PokerMainComponent = () => {
    const [state, setState] = useState(0);
    useEffect(() => {}, []);

    return (
        <>
            <Container
                maxW="lg"
                py={{ base: '12', md: '24' }}
                px={{ base: '0', sm: '8' }}
            >
                <Stack spacing="8">
                    <Box
                        py={{ base: '0', sm: '8' }}
                        px={{ base: '4', sm: '10' }}
                        bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
                        boxShadow={{
                            base: 'none',
                            sm: useColorModeValue('md', 'md-dark'),
                        }}
                        borderRadius={{ base: 'none', sm: 'xl' }}
                    >
                        <Stack spacing="6">
                            <Stack spacing="5">
                                <FormControl isRequired>
                                    <FormLabel htmlFor="poker-room-id">
                                        Room Code
                                    </FormLabel>
                                    <Input id="poker-room-id" placeholder="Room Code" />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor="cards-mode">Cards Mode</FormLabel>
                                    <Select id="cards-mode" placeholder="Cards Mode">
                                        <option>
                                            Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55,
                                            89)
                                        </option>
                                        <option>
                                            Short Fibonacci (0, ½, 1, 2, 3, 5, 8, 13, 20,
                                            40, 100)
                                        </option>
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Stack spacing="6">
                                <Button
                                    variant="solid"
                                    color={useColorModeValue('green.800', 'green.300')}
                                >
                                    Create Session
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </>
    );
};

export default PokerMainComponent;
