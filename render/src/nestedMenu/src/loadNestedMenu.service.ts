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
        const nestErrMsg = (content?: string) => `
            <div id="nestedMenu">
                <h4>Nested Menu Syntax Error</h4>
                ${content ? content : ''}
            </div>
        `
        if ('message' in e) {
            return content.replace(menuRe, nestErrMsg(e.message))
        } else {
            return content.replace(menuRe, nestErrMsg())
        }
    }
}