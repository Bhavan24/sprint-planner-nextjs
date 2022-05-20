import { Box, Container } from '@chakra-ui/react';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { INotesEditorProps } from '../../interfaces';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false,
});

export const TextEditorComponent = (editor: INotesEditorProps) => {
    return (
        <Box m={2} alignContent="center">
            <SimpleMDE value={editor.value} onChange={editor.onChange} />
        </Box>
    );
};
