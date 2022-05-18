import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PokerController = () => {
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
        <>
            <Stack spacing="6">
                <p>PokerController</p>
            </Stack>
        </>
    );
};

export default PokerController;
