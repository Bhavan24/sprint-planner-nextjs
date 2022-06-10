// React imports
import { forwardRef, useRef } from 'react';
// Chakra-UI imports
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
    useMergeRefs
} from '@chakra-ui/react';
// Component imports
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signInWithGoogle } from '../../services/user/users';
// Icon imports
import { FcGoogle } from 'react-icons/fc';
import { HiEye, HiEyeOff } from 'react-icons/hi';
// Constant imports
import { ELEMENT_TEXT } from '../../constants';


const PasswordField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
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
            <FormLabel htmlFor='password'>{ELEMENT_TEXT.LOGIN_PAGE_PASSWORD}</FormLabel>
            <InputGroup>
                <InputRightElement>
                    <IconButton
                        variant='link'
                        aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                        title={isOpen ? 'Mask password' : 'Reveal password'}
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                    />
                </InputRightElement>
                <Input
                    id='password'
                    ref={mergeRef}
                    name='password'
                    type={isOpen ? 'text' : 'password'}
                    autoComplete='current-password'
                    required
                    {...props}
                />
            </InputGroup>
        </FormControl>
    );
});

export const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
            password: Yup
                .string()
                .max(255)
                .required('Password is required')
        }),
        onSubmit: () => {
        }
    });

    return (
        <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing='8'>
                <Stack spacing='6'>
                    <Heading size={useBreakpointValue({ base: 'lg', md: 'lg' })}>
                        {ELEMENT_TEXT.LOGIN_PAGE_LOGIN_BOX_TITLE}
                    </Heading>
                </Stack>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
                    boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                >
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing='6'>
                            <Button variant='outline' onClick={signInWithGoogle}>
                                <FcGoogle />
                                <span style={{ margin: '0 10px' }}>
                                    {ELEMENT_TEXT.LOGIN_PAGE_GOOGLE_LOG_IN}
                                </span>
                            </Button>
                            <Divider />
                            <Stack spacing='5'>
                                <FormControl>
                                    <FormLabel htmlFor='email'>
                                        {ELEMENT_TEXT.LOGIN_PAGE_EMAIL}
                                    </FormLabel>
                                    <Input
                                        id='email'
                                        type='email'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        errorBorderColor={
                                            formik.touched.email && formik.errors.email
                                                ? 'red.500'
                                                : ''
                                        }
                                    />
                                </FormControl>
                                <PasswordField
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    errorBorderColor={
                                        formik.touched.password && formik.errors.password
                                            ? 'red.500'
                                            : ''
                                    }
                                />
                            </Stack>
                            <Stack spacing='6'>
                                <Button variant='outline' type='submit'>
                                    {ELEMENT_TEXT.LOGIN_BUTTON}
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Container>
    );
};
