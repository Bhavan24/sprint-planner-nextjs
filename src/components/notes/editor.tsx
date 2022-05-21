import { Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { INotesEditorProps } from '../../interfaces';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const TextEditorComponent = (editor: INotesEditorProps) => {
    return (
        <Flex m={2} alignContent="center" justifyContent="center" maxHeight="max-content">
            <ReactQuill value={editor.value} onChange={editor.onChange} />
        </Flex>
    );
};
