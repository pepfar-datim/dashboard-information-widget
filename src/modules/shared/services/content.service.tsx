import {getData, postData, putData} from '@pepfar-react-lib/http-tools';
import sanitize from '../../shared/services/sanitize.service';
import getContentUrl, {getWidgetId} from './contentUrl.service';
import {getKeyUid, shareKey} from "./shareKey.service";
import YAML from 'yaml'

export enum ContentItemType{
    string='string',
    sifter= 'sifter'
}
export interface SifterJson {[key: string]: string|SifterJson}
export type ContentItem = {
    type: ContentItemType,
    body: string|SifterJson
};

function separateSifters(contentString:string):{cleanedContentString:string,sifters:string[]}{
    let preTags = contentString.match(/<pre(.|\s)+?pre>/g);
    if (!preTags) return {cleanedContentString: contentString, sifters: []};
    let sifters:string[] = [];
    let cleanedContentString:string = contentString;
    preTags.forEach((sifterCode:string,i:number)=>{
        cleanedContentString =  cleanedContentString.replace(sifterCode,`#sifter${i}#`);
        sifters.push(sifterCode);
    });
    return {cleanedContentString,sifters}
}

function parseYaml(sifterPre:string):SifterJson{
    let yaml = sifterPre.replace(/<pre .*?>/,'').replace("</pre>",'');
    try {
        return YAML.parse(yaml);
    }catch(e){
        console.error(e);
        return {};
    }
}

export function parseContent(inputString:string):ContentItem[]{
    if (!inputString||typeof inputString!=='string'||inputString.length===0) return [];
    let {cleanedContentString, sifters} = separateSifters(inputString);
    if (sifters.length===0) return [{type:ContentItemType.string, body: inputString}];
    let textSections = cleanedContentString.split('#').filter(s=>s.length>0);
    let result:ContentItem[] = [];
    sifters = sifters.reverse();
    textSections.forEach((item:string,i:number)=>{
        if (!/sifter[0-9]/.test(item)) return result.push({type:ContentItemType.string, body:item});
        else result.push({type:ContentItemType.sifter, body: sifters.pop()||'sifter'})
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
