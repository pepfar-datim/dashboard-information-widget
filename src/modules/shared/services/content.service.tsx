import api from '../../shared/services/api.service';
import sanitize from "../../shared/services/sanitize.service";
import getContentUrl, {getWidgetId} from "./contentUrl.service";

const config = require("../../../config/config.json");

export function fetchContent(){
    return api.get(getContentUrl())
        .then(resp=>resp.body)
        .then(sanitize);
}

export function saveContent(content){
    return api.put(getContentUrl(), {body: content}).catch(async (resp)=>{
        await api.post(getContentUrl(), {body: content});
        let widgetId = getWidgetId();
        let widgetUuid = await api.get(`/sqlViews/xexek7cpxqw/data?var=namespace:${config.datastoreNamespace}&var=key:${widgetId}`)
            .then(response=>response.listGrid.rows[0][0])
        return api.post('/sharing?type=dataStore&id='+widgetUuid,{
            "object": {
                "id": widgetUuid,
                "publicAccess": "r-------",
                "user": {},
                "externalAccess": false
            }
        });
    });
}
