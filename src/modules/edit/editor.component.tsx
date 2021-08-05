import React, {useRef} from 'react';
import 'jodit/build/jodit.min.css';
import JoditEditor from 'jodit-react';
import { config } from './editorConfig';

export default function Editor({ content, onChange }) {
    const editor = useRef(null)
    return (
        <JoditEditor
            ref={editor}
            value={content}
            //@ts-ignore
            config={config}
            onChange={onChange}
        />
    );
}
