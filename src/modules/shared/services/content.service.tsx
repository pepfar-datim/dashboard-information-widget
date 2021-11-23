import {getData, postData, putData} from '@pepfar-react-lib/http-tools';
import sanitize from '../../shared/services/sanitize.service';
import getContentUrl, {getWidgetId} from './contentUrl.service';
import {getKeyUid, shareKey} from "./shareKey.service";
import YAML from 'yaml'

export enum ContentItemType{
    string='string',
    nestedMenu= 'nestedMenu'
}

export type NestedMenuObject = {
    style: string|null,
    content: NestedMenuContent
}
export interface NestedMenuContent {[key: string]: string|NestedMenuContent}
export type ContentItem = {
    type: ContentItemType,
    body: string|NestedMenuObject
};

function removeTags(source:string, quotes:string):string|null{
    let start:RegExp = new RegExp(`^.+?style=${quotes}`)
    let end:RegExp = new RegExp(`${quotes}(.|\n)+$`)
    if (!start.test(source)) return null;
    return source.replace(start,'').replace(end,'')
}

export function extractStyle(pre:string):string|null{
    if (!/style=/.test(pre)) return null;
    else return removeTags(pre, '"')||removeTags(pre, "'");
}

function separateNestedMenus(contentString:string):{cleanedContentString:string,nestedMenus:NestedMenuObject[]}{
    let preTags = contentString.match(/<pre(.|\s)+?nestedMenu(.|\s)+?pre>/g);
    if (!preTags) return {cleanedContentString: contentString, nestedMenus: []};
    let nestedMenus:NestedMenuObject[] = [];
    let cleanedContentString:string = contentString;
    preTags.forEach((nestedMenuCode:string,i:number)=>{
        cleanedContentString = cleanedContentString.replace(nestedMenuCode,`#nestedMenu${i}#`);
        nestedMenus.push({content: parseYaml(nestedMenuCode), style:extractStyle(nestedMenuCode)});
    });
    return {cleanedContentString,nestedMenus}
}

function parseYaml(nestedMenuPre:string):NestedMenuContent{
    let yaml = nestedMenuPre
        .replace(/<pre .*?>/,'')
        .replace("</pre>",'')
        // .replace(/(\{|\})/g,'"')
        // .replace(/".+"/,'')
        .replace(':','|')
    try {
        return YAML.parse(yaml);
    }catch(e){
        console.error(e);
        return {};
    }
}

export function parseContent(inputString:string):ContentItem[]{
    if (!inputString||typeof inputString!=='string'||inputString.length===0) return [];
    let {cleanedContentString, nestedMenus} = separateNestedMenus(inputString);
    if (nestedMenus.length===0) return [{type:ContentItemType.string, body: inputString}];
    let textSections = cleanedContentString.split('#').filter(s=>s.length>0);
    let result:ContentItem[] = [];
    nestedMenus = nestedMenus.reverse();
    textSections.forEach((item:string,i:number)=>{
        if (!/nestedMenu[0-9]/.test(item)) return result.push({type:ContentItemType.string, body:item});
        else result.push({type:ContentItemType.nestedMenu, body: nestedMenus.pop()||'nestedMenu'})
    })
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
