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
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import * as React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { auth, provider } from '../../../firebase/config';

export const PasswordField = React.forwardRef<HTMLInputElement, InputProps>(
    (props, ref) => {
        const { isOpen, onToggle } = useDisclosure();
        const inputRef = React.useRef<HTMLInputElement>(null);

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
    }
);

export const Login = () => {
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential ? credential.accessToken : '';
                // The signed-in user info.
                const user = result.user;
            })
            .catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    };

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
