import { Box, IconButton, Stack, Text, Tooltip, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaLink, FaRegEye } from 'react-icons/fa';
import { MdExitToApp } from 'react-icons/md';
import { VscDebugRestart } from 'react-icons/vsc';

const PokerController = () => {
    const router = useRouter();
    const [gameId, setGameId] = useState('');

    // toast
    const toast = useToast();

    useEffect(() => {
        if (!router.isReady) return;
        const { id } = router.query;
        id && setGameId(id?.toString() || '');
    }, [router.isReady]);

    const handleRevealCards = () => {
        toast({
            position: 'top-right',
            title: 'Cards Revealed!',
            status: 'success',
            isClosable: true,
        });
    };

    const handleRestartSession = () => {
        toast({
            position: 'top-right',
            title: 'Session Restarted!',
            status: 'info',
            isClosable: true,
        });
    };

    const handleExitSession = () => {
        router.push('/');
    };

    const handleCopyInviteLink = () => {
        const url = `${window.location.origin}/sprint-poker?join=${gameId}`;
        navigator.clipboard.writeText(url);
        toast({
            position: 'top-right',
            title: 'Invite Link copied to clipboard!',
            status: 'success',
            isClosable: true,
        });
    };

    return (
        <>
            <Stack spacing="6" alignItems="center">
                <Box
                    maxW="max-content"
                    maxH="lg"
                    borderWidth="2px"
                    borderRadius="lg"
                    m="1"
                >
                    <Box p="6">
                        <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            alignContent="center"
                            gap="1"
                        >
                            <Text>Session Name</Text>
                            <Text>Session Status</Text>
                        </Box>
                        <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            noOfLines={1}
                        >
                            Average : 2.5
                        </Box>
                        <Box gap="2" p="2">
                            <Tooltip label="Reveal Cards">
                                <IconButton
                                    colorScheme="blue"
                                    aria-label="Reveal"
                                    icon={<FaRegEye />}
                                    isRound
                                    size="lg"
                                    m={2}
                                    onClick={handleRevealCards}
                                />
                            </Tooltip>
                            <Tooltip label="Restart Session">
                                <IconButton
                                    colorScheme="blue"
                                    aria-label="Restart"
                                    icon={<VscDebugRestart />}
                                    isRound
                                    size="lg"
                                    m={2}
                                    onClick={handleRestartSession}
                                />
                            </Tooltip>
                            <Tooltip label="Exit Session">
                                <IconButton
                                    colorScheme="blue"
                                    aria-label="Exit"
                                    icon={<MdExitToApp />}
                                    isRound
                                    size="lg"
                                    m={2}
                                    onClick={handleExitSession}
                                />
                            </Tooltip>
                            <Tooltip label="Copy Invitation Link">
                                <IconButton
                                    colorScheme="blue"
                                    aria-label="Invite"
                                    icon={<FaLink />}
                                    isRound
                                    size="lg"
                                    m={2}
                                    onClick={handleCopyInviteLink}
                                />
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>
            </Stack>
        </>
    );
};

export default PokerController;
