import {getData, postData, putData} from '@pepfar-react-lib/http-tools';
import sanitize from '../../shared/services/sanitize.service';
import getContentUrl, {getWidgetId} from './contentUrl.service';
import {getKeyUid, shareKey} from "./shareKey.service";
import {ReactElement} from "react";

export type ContentItem = string|ReactElement<any|any>;

export function extractSwifterCode(contentString:string):ContentItem[]{
    let preTags = contentString.match(/<pre.+?pre>/g);
    if (!preTags) return [contentString];
    let sifters:string[] = [];
    preTags.forEach((sifterCode:string,i:number)=>{
        contentString =  contentString.replace(sifterCode,`#sifter#`);
        sifters.push(sifterCode);
    });
    let items = contentString.split('#sifter#');
    let result:ContentItem[] = [];
    items.forEach((item:string,i:number)=>{
        result.push(item);
        if (sifters[i]) result.push(sifters[i]);
    })
    console.log(result)
    return result;
}

export function fetchContent():Promise<string>{
    return getData(getContentUrl())
        .then((resp) => resp.body)
        .then(sanitize)
}

export function saveContent(content) {
    return putData(getContentUrl(), { body: content }).catch(async (resp) => {
        await postData(getContentUrl(), { body: content });
        let widgetId = getWidgetId();
        let widgetUid = await getKeyUid(widgetId);
        return shareKey(widgetUid, 'r-------');
    });
}
