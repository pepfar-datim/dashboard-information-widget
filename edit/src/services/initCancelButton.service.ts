import {getWidgetId} from '../../../shared/getWidgetId.service.ts'

export function initCancelButton(){
    document.getElementById('cancel_link')!.setAttribute('href',`index.html?dashboardWidgetId=${getWidgetId()}`)
}