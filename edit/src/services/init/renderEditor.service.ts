import {Jodit} from 'jodit/esm/index.js';
import 'jodit/esm/plugins/video/video.js'
import 'jodit/esm/plugins/source/source.js'
import 'jodit/esm/plugins/indent/indent.js'
import 'jodit/esm/plugins/clean-html/clean-html.js'
import 'jodit/esm/plugins/hr/hr.js'
import 'jodit/es2021/jodit.css'
import {editorConfig} from "../../const/jodit.config.ts";

declare let saveContent:()=>void
export function renderEditor(content:string):Jodit{
    document.getElementById('editor-container')!.innerHTML = `<textarea id="editor" name="editor"></textarea>`
    const editor = Jodit.make('#editor', editorConfig);
    editor.value = content
    return editor
}