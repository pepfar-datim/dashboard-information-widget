import {getWidgetId} from '../../../shared/getWidgetId.service.ts'
export function redirectBack():void{
    window.location.href = `index.html?dashboardItemId=${getWidgetId()}`
}