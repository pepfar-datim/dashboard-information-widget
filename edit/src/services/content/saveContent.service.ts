import {Jodit} from "jodit/esm/index.js";
import {getWidgetId} from '../../../../shared/getWidgetId.service.ts'

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

export function saveContentFactory(editor: Jodit){
    return async ()=>{
        console.log(editor.value)
        document.body.innerHTML = '<div id="loader"></div>'
        await save(editor.value)
        window.location.href = `index.html?dashboardItemId=${getWidgetId()}`
    }
}