import {getWidgetId} from '../../../../shared/getWidgetId.service.ts'
import {hasChanges} from "../content/changeMonitor.service.ts";

export function initCancelButton(){
    document.getElementById('cancel_link')!.setAttribute('href',`index.html?dashboardItemId=${getWidgetId()}`)
    document.getElementById('cancel_link')!.addEventListener('click',(event)=>{
        if (!hasChanges()) return
        showCancelDialog()
        event.preventDefault()
    })
}

const dialogStyle = `
    border-radius: 4px;
    border: 1px solid grey;
    box-shadow: 0 0 3px 0 #999;
    text-align: right;
`

function showCancelDialog(){
    const dialog = document.createElement('dialog')
    dialog.setAttribute('style',dialogStyle)
    dialog.setAttribute('id','cancel_dialog')
    dialog.innerHTML = `
        <p>Your changes have not been saved</p>
        <button id="keepediting_button">Keep editing</button>
        <a id="cancel_link" href="index.html?dashboardItemId=${getWidgetId()}"><button id="discard_button">Discard changes</button></a>
    `
    document.body.appendChild(dialog)
    document.getElementById('keepediting_button')!.addEventListener('click',()=>{
        document.getElementById('cancel_dialog')!.remove()
    })
    dialog.showModal()
}