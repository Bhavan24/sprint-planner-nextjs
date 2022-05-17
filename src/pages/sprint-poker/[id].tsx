import { Box, Button, createStandaloneToast, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BasePage from '../../components/auth-base-component';
import { SPRINT_POKER_PAGE_NAME } from '../../constants';

const SprintDetails = () => {
    const router = useRouter();
    const [gameId, setGameId] = useState('');

    useEffect(() => {
        if (!router.isReady) return;
        const { id } = router.query;
        id && setGameId(id?.toString() || '');
    }, [router.isReady]);

    const copyInviteLink = () => {
        const url = `${window.location.origin}/sprint-poker?join=${gameId}`;
        navigator.clipboard.writeText(url);
    };

    return (
        <BasePage title={SPRINT_POKER_PAGE_NAME}>
            <Box textAlign="center" fontSize="xl" m={5}>
                <Text>
                    {SPRINT_POKER_PAGE_NAME} {gameId}
                </Text>
                <Button onClick={copyInviteLink}>Copy</Button>
            </Box>
        </BasePage>
    );
};

export default SprintDetails;
