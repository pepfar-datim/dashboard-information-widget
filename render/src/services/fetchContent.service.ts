import {getWidgetId} from '../../../shared/getWidgetId.service.ts'
export async function fetchContent():Promise<string>{
    const response = await fetch(`/api/dataStore/dashboard-information/${getWidgetId()}`).then(res => res.json())
    return response.body
}