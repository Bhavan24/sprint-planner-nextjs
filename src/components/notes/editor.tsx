import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { INotesEditorProps } from '../../interfaces';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const TextEditorComponent = (editor: INotesEditorProps) => {
    return (
        <Box m={2} alignContent="center">
            <ReactQuill value={editor.value} onChange={editor.onChange} />
        </Box>
    );
};
