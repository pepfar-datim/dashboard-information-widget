import {getWidgetId} from '../../../shared/getWidgetId.service.ts'
import {addUserFields} from "./addUserFields.service.ts";
export async function fetchContent():Promise<string>{
    let {body:content} = await fetch(`/api/dataStore/dashboard-information/${getWidgetId()}`).then(res => res.json())
    return addUserFields(content)
}