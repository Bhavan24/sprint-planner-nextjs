import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';
import { IAlertBoxProps } from './types';

const AlertBox: React.FC<IAlertBoxProps> = ({
    isOpen,
    onClose,
    cancelRef,
    title,
    body,
    btnText,
    btnColor,
    onAction,
}) => {
    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
                leastDestructiveRef={cancelRef}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {title}
                        </AlertDialogHeader>
                        <AlertDialogBody>{body}</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button colorScheme={btnColor} onClick={onAction} ml={3}>
                                {btnText}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default AlertBox;
