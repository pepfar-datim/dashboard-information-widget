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
`

function showCancelDialog(){
    const dialog = document.createElement('dialog')
    dialog.setAttribute('style',dialogStyle)
    dialog.setAttribute('id','cancel_dialog')
    dialog.innerHTML = `
        <p>Changes that you made have not been saved</p>
        <a id="cancel_link" href="index.html?dashboardItemId=${getWidgetId()}"><button class="button">Discard changes</button></a>
        <button class="button" id="close_dialog">Keep editing</button>
    `
    document.body.appendChild(dialog)
    document.getElementById('close_dialog')!.addEventListener('click',()=>{
        document.getElementById('cancel_dialog')!.remove()
    })
    dialog.showModal()
}