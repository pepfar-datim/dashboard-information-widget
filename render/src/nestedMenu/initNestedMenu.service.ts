import {NestedMenu} from "./nestedMenu.types.ts";
import './nestedMenu.css'
import {assembleSubMenu} from "./render/components/subMenu.component.ts";
import {render} from "./render/services/render.service.ts";

export async function initNestedMenu({style, subMenu}:NestedMenu):Promise<void>{
    render('nestedMenu',`<div id="subMenuRoot_0" style="display: flex; ${style}"></div>`)
    assembleSubMenu(subMenu, 0)
}