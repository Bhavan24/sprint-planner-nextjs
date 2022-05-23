import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../../firebase/config';
import { GAME_TYPES } from '../../../constants';
import { INewSession } from '../../../interfaces';
import { addNewGame } from '../../../services/poker/games';
import SelectSprint from '../../select-sprint';

const CreateSession = () => {
    // router
    const router = useRouter();
    // user
    const [user] = useAuthState(auth);
    // states
    const [sessionName, setSessionName] = useState('');
    const [cardsMode, setCardsMode] = useState(GAME_TYPES[0].type);
    const [sprintId, setSprintId] = useState('');

    // toast
    const toast = useToast();

    const handleSessionNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSessionName(e.target.value);
    };

    const handleCardsModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCardsMode(e.target.value);
    };

    const createSession = async () => {
        if (sessionName && user?.displayName && cardsMode) {
            const game: INewSession = {
                name: sessionName,
                userName: user.displayName,
                userId: user.uid,
                gameType: cardsMode,
                createdAt: new Date(),
                sprintId: sprintId,
            };
            const newGameId = await addNewGame(game);
            console.log('newGameId:', newGameId);
            router.push(`/sprint-poker/${newGameId}`);
        } else {
            toast({
                title: 'Please fill all fields !!!',
                status: 'error',
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Stack spacing="6">
                <FormControl isRequired>
                    <FormLabel htmlFor="poker-sprint">Sprint</FormLabel>
                    <SelectSprint
                        onChange={(e: any) => {
                            setSprintId(e.target.value);
                        }}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="poker-session-name">Session Name</FormLabel>
                    <Input
                        value={sessionName}
                        id="poker-session-name"
                        placeholder="Session Name"
                        onChange={handleSessionNameChange}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel htmlFor="cards-mode">Cards Mode</FormLabel>
                    <Select
                        value={cardsMode}
                        id="cards-mode"
                        onChange={handleCardsModeChange}
                    >
                        {GAME_TYPES.map(game => (
                            <option key={game.id} value={game.type}>
                                {game.label}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
            <Button
                mt={8}
                w="100%"
                variant="solid"
                color={useColorModeValue('green.800', 'green.300')}
                onClick={createSession}
            >
                Create Session
            </Button>
        </>
    );
};

export default CreateSession;
