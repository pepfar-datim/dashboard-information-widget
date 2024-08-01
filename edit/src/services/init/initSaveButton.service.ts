import {Jodit} from "jodit/esm/index.js";
import {getWidgetId} from '../../../../shared/getWidgetId.service.ts'
import {redirectBack} from "../redirectBack.service.ts";
import {sanitizeContent} from "../../../../shared/sanitizeContent.service.ts";

async function query(value:string, method:string):Promise<Response>{
    return fetch(`/api/dataStore/dashboard-information/${getWidgetId()}`,{
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
        document.body.innerHTML = '<div id="loader"></div>'
        const safeContent = sanitizeContent(editor.value, allowedIframeDomains)
        await save(safeContent)
        redirectBack()
    })
}