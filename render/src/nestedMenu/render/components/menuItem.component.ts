import {SelectFunction} from "../../nestedMenu.types.ts";
import {parseKey} from "../services/parseKey.service.ts";

declare let NestedMenuGlobal: {
    [key: string]: SelectFunction
}

export function MenuItem(key: string, level: number, isNode: boolean, onSelect: SelectFunction): string {
    const [name, style] = parseKey(key)
    NestedMenuGlobal[`selectLevel_${level}`] = onSelect
    if (!name) return ``
    return `<div 
        style="${style||''}" 
        class="menuItem"
        onClick="NestedMenuGlobal.selectLevel_${level}('${key}')"
    >${name}${isNode ? '&nbsp;↗' : ''}</div>`
}