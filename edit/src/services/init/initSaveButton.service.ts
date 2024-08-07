import {Jodit} from "jodit/esm/index.js";
import {getWidgetId} from '../../../../shared/getWidgetId.service.ts'
import {redirectBack} from "../redirectBack.service.ts";
import {sanitizeContent} from "../../../../shared/sanitizeContent.service.ts";
import {showMessages} from "../../../../shared/showMessages.service.ts";

async function query(value:string, method:string):Promise<Response>{
    return fetch(`../../../api/dataStore/dashboard-information/${getWidgetId()}`,{
        method,
        body: JSON.stringify({body:value}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

async function save(value:string):Promise<void>{
    const response:Response = await query(value, 'PUT')
    if (!response.ok) await query(value, 'POST')
}

export function initSaveButton(editor: Jodit, allowedIframeDomains: string[]){
    document.getElementById('save_button')!.addEventListener('click', async ()=>{
        const editContentEl = document.getElementById('edit-content')!
        editContentEl.innerHTML = '<div id="loader"></div>'
        const [safeContent, msgs] = sanitizeContent(editor.value, allowedIframeDomains)
        await(msgs && showMessages(msgs))
        await save(safeContent)
        redirectBack()
    })
}