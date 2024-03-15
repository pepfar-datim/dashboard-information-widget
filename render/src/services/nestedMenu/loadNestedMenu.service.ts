import {menuRe, NestedMenu} from "./nestedMenu.types.ts";

// import {renderNestedMenu} from "./renderNestedMenu.service.ts";
// import {getMenuSrc} from "../getMenuSrc.service.ts";


export async function loadNestedMenu(content:string):Promise<string>{
    if (!content.includes('nestedMenu')||!content.includes('pre')) return content
    const {getMenuSrc} = await import("../getMenuSrc.service.ts")
    const {renderNestedMenu} = await import("./renderNestedMenu.service.ts")
    const nestedMenu:NestedMenu = getMenuSrc(content)
    renderNestedMenu(nestedMenu)
    return content.replace(menuRe, '<div id="nestedMenu"></div>')
}