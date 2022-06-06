// Component imports
import { Editor } from '@tinymce/tinymce-react';
// Type imports
import { INotesEditorProps } from './types';
// Constant imports
import { EDITOR_API_KEY } from '../../constants';

export const TextEditorComponent = (editor: INotesEditorProps) => {
    return (
        <Editor
            apiKey={EDITOR_API_KEY}
            value={editor.value}
            onEditorChange={editor.onChange}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'code',
                    'help',
                    'wordcount'
                ],
                toolbar: `
                | undo redo
                | blocks
                | bold italic forecolor
                | alignleft aligncenter alignright alignjustify
                | image media link
                | bullist numlist outdent indent
                | removeformat
                | searchreplace
                | charmap lists visualblocks insertdatetime table
                | wordcount`,
                content_style: `body {
                    font-family:Helvetica,Arial,sans-serif;
                    font-size:14px;
                }`
            }}
        />
    );
};
