import {
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
    Stack,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
    useMergeRefs,
} from '@chakra-ui/react';

import { forwardRef, useRef } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { signInWithGoogle } from '../../services/user/users';

export const PasswordField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { isOpen, onToggle } = useDisclosure();

    const inputRef = useRef<HTMLInputElement>(null);
    const mergeRef = useMergeRefs(inputRef, ref);

    const onClickReveal = () => {
        onToggle();
        if (inputRef.current) {
            inputRef.current.focus({ preventScroll: true });
        }
    };

    return (
        <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
                <InputRightElement>
                    <IconButton
                        variant="link"
                        aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                    />
                </InputRightElement>
                <Input
                    id="password"
                    ref={mergeRef}
                    name="password"
                    type={isOpen ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    {...props}
                />
            </InputGroup>
        </FormControl>
    );
});

export const Login = () => {
    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing="8">
                <Stack spacing="6">
                    <Heading size={useBreakpointValue({ base: 'lg', md: 'lg' })}>
                        Log in to your account
                    </Heading>
                </Stack>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
                    boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                >
                    <Stack spacing="6">
                        <Button variant="outline" onClick={signInWithGoogle}>
                            <FcGoogle />
                            <span style={{ margin: '0 10px' }}>Continue with Google</span>
                        </Button>
                        <Divider />
                        <Stack spacing="5">
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input id="email" type="email" />
                            </FormControl>
                            <PasswordField />
                        </Stack>
                        <Stack spacing="6">
                            <Button variant="outline">Sign in</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};
