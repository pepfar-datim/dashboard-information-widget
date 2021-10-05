import React, {useEffect, useRef} from 'react';
import 'jodit/build/jodit.min.css';
import JoditEditor from 'jodit-react';
import { config } from './editorConfig';

export default function Editor({content, onChange }) {
    return (
        <JoditEditor
            // @ts-ignore
            value={content}
            //@ts-ignore
            config={config}
            onChange={onChange}
        />
    );
}
