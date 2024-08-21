import {SubMenu} from "../../nestedMenu.types.ts";
import {assembleSubMenu} from "../components/subMenu.component.ts";
import isLink from "./isLink.service.ts";
import {parseKey} from "./parseKey.service.ts";

export function onSelectFactory(subMenu: SubMenu, level: number):(key:string)=>void{
    return (key: string) => {
        const value = subMenu[key]
        if (isLink(value)) {
            window.open(value, '_blank')?.focus();
        } else if (value !== null) {
            assembleSubMenu(value, level + 1)
        }
        markItemSelected(level, key)
    }
}

function markItemSelected(level:number, fullKey: string):void{
    let [key] = parseKey(fullKey)
    Array.from(document.getElementById(`subMenu_${level}`)!.children).forEach((item:Element)=>{
        if (item.textContent?.trim()===key) item.classList.add('selected')
        else item.classList.remove('selected')
    })
}