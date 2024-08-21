import {SubMenu} from "../../nestedMenu.types.ts";
import {render} from "../services/render.service.ts";
import {onSelectFactory} from "../services/onSelect.service.ts";
import {MenuItem} from "./menuItem.component.ts";
import isLink from "../services/isLink.service.ts";

export function assembleSubMenu(subMenu: SubMenu, level: number): void {
    const html = `<div id="subMenu_${level}" class="subMenu ${level > 0 ? 'appear' : ''}">
        ${Object.keys(subMenu).map((key: string) => MenuItem(key, level, subMenu[key], onSelectFactory(subMenu, level))).join('')}
    </div>
    <div id="subMenuRoot_${level + 1}" style="display: flex;"></div>
    `
    render(`subMenuRoot_${level}`, html)
}

