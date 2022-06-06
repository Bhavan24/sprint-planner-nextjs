// React imports
import { MouseEventHandler, RefObject } from 'react';
// Chakra-UI imports
import { FocusableElement } from '@chakra-ui/utils';

export interface IAlertBoxProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    cancelRef: RefObject<FocusableElement>;
    onAction: MouseEventHandler<HTMLButtonElement>;
    btnText: string;
    btnColor: string;
    title: string;
    body?: string;
}
