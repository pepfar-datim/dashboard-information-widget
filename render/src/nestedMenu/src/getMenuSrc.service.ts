import {menuRe, NestedMenu, SubMenu} from "../nestedMenu.types.ts";
import {getMenuObject} from "./getMenuObject.service.ts";

export function getMenuSrc(content:string):NestedMenu{
    const nestedMenuSrc = menuRe.exec(content)![1]
    const subMenu:SubMenu = getMenuObject(nestedMenuSrc)
    const style = /<pre.+style="(.+)"/.exec(content)?.[1]||''
    return {subMenu, style}
}