import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';
import { IAlertBoxProps } from '../../interfaces';

const AlertBox = (props: IAlertBoxProps) => {
    return (
        <>
            <AlertDialog
                isOpen={props.isOpen}
                onClose={props.onClose}
                leastDestructiveRef={props.cancelRef}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {props.title}
                        </AlertDialogHeader>
                        <AlertDialogBody>{props.body}</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={props.onClose}>Cancel</Button>
                            <Button
                                colorScheme={props.btnColor}
                                onClick={props.onAction}
                                ml={3}
                            >
                                {props.btnText}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default AlertBox;

/*
import { FocusableElement } from '@chakra-ui/utils';

const { isOpen, onOpen, onClose } = useDisclosure();
const cancelRef = useRef() as RefObject<FocusableElement>;
<AlertBox
    isOpen={isOpen}
    onOpen={onOpen}
    onClose={onClose}
    cancelRef={cancelRef}
    onAction={resetItems}
    btnText={'Delete'}
    btnColor={'red'}
    title={'Clear All Items'}
    body={`Are you sure? You can't undo this action afterwards.`}
/>

*/
