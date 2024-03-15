import {menuRe, NestedMenu, SubMenu} from "./nestedMenu/nestedMenu.types.ts";
import {getMenuObect} from "./nestedMenu/getMenuObect.service.ts";

export function getMenuSrc(content:string):NestedMenu{
    const nestedMenuSrc = menuRe.exec(content)![1]
    const subMenu:SubMenu = getMenuObect(nestedMenuSrc)
    const style = /<pre.+style="(.+)"/.exec(content)?.[1]||''
    return {subMenu, style}
}