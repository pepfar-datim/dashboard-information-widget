import {SelectFunction, SubMenu} from "../../nestedMenu.types.ts";
import isLink from "../services/isLink.service.ts";
import {parseKey} from "../services/parseKey.service.ts";
import chevronRight from "./chevronRight.ts";

declare let NestedMenuGlobal: {
    [key: string]: SelectFunction
}

export function MenuItem(key: string, level: number, menuItem: string | SubMenu, onSelect: SelectFunction): string {
    const [name, style] = parseKey(key)
    const link = isLink(menuItem)
    const leafNode = typeof menuItem === 'string' || menuItem === null
    NestedMenuGlobal[`selectLevel_${level}`] = onSelect
    if (!name) return ``
    return `<div 
        style="${style||''}" 
        class="menuItem"
        onClick="NestedMenuGlobal.selectLevel_${level}('${key}')"
    >${name}${link ? '&nbsp;↗' : ''}${leafNode ? '' : chevronRight}</div>`
}