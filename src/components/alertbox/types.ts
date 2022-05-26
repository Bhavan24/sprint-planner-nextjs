import { FocusableElement } from '@chakra-ui/utils';
import { MouseEventHandler, RefObject } from 'react';

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
