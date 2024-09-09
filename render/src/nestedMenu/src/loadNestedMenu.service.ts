import {menuRe, NestedMenu} from "../nestedMenu.types.ts";

export async function loadNestedMenu(content:string):Promise<string>{
    if (!content.includes('nestedMenu')||!content.includes('pre')) return content
    const {getMenuSrc} = await import("./getMenuSrc.service.ts")
    const {initNestedMenu} = await import("../initNestedMenu.service.ts")
    try {
        const nestedMenu:NestedMenu = getMenuSrc(content)
        initNestedMenu(nestedMenu)
        return content.replace(menuRe, '<div id="nestedMenu"></div>')
    } catch (e: any) {
        if ('message' in e) {
            return content.replace(menuRe, `<div id="nestedMenu">There was an error with the nested menu syntax:\n${e.message}</div>`)
        } else {
            return content.replace(menuRe, '<div id="nestedMenu">There was an error parsing the nested menu syntax</div>')
        }
        
    }
}