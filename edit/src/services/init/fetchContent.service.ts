import {getWidgetId} from '../../../../shared/getWidgetId.service.ts'

export async function fetchContent():Promise<string>{
    const widgetId = getWidgetId()
    const response = await fetch(`/api/dataStore/dashboard-information/${widgetId}`).then(res => res.json())
    return response.body
}