import {Jodit} from "jodit/esm/index.js";

let changed:boolean = false
export function initChangeMonitor(originalContent: string, editor: Jodit):void{
    editor.events.on('change',(newContent)=>{
        if (changed) return
        if (newContent===originalContent) return
        changed = true

        const saveButton = document.getElementById('save_button')!
        saveButton.removeAttribute('disabled')
    })
}

export function hasChanges():boolean{
    return changed
}