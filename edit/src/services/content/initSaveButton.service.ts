import {Jodit} from "jodit/esm/index.js";
import {getOriginalContent} from "./originalContent.var.ts";
import {saveContentFactory} from "./saveContent.service.ts";

declare let saveContent:()=>void

let changed = false

export function initSaveButton(editor: Jodit){
    editor.events.on('change',(content)=>{
        if (changed) return
        if (content===getOriginalContent()) return
        const saveButton = document.getElementById('save_button')!
        saveButton.removeAttribute('disabled')
        changed = true
    })
    saveContent = saveContentFactory(editor)
}