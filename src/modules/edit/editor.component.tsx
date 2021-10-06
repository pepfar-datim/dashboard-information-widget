import React, {useEffect, useRef} from 'react';
import 'jodit/build/jodit.min.css';
import { editorConfig } from './editorConfig';
import {Jodit} from "jodit"

export default function Editor({content, onChange }) {
    return (
        <div id='edit'></div>
    );
}
