import {NestedMenu, SubMenu} from "./nestedMenu.types.ts";
import './nestedMenu.css'
import {adjustBorders} from "./adjustBorders.service.ts";

declare global {
    interface Window { NestedMenu: any; }
}

window.NestedMenu = {}

type SelectFunction = (value:string)=>void;

const keyStyle = `
    padding: 4px;
    line-height: 1;
    cursor: pointer;
`

function parseKey(rawKey:string):[string, string]{
    const [name, style] = rawKey.split('{')
    return [
        name.trim(),
        style?.replace('|',':').replace('}','')
    ]
}

function renderKey(key:string, level: number, isNode:boolean, onSelect: SelectFunction):string{
    const [name, style] = parseKey(key)
    window.NestedMenu[`selectLevel_${level}`] = onSelect
    if (!name) return ``
    return `<div 
        style="${style};${keyStyle}" 
        class="menuItem"
        onClick="window.NestedMenu.selectLevel_${level}('${key}')"
    >${name}${isNode?' ↗':''}</div>`
}

const subMenuDefaultStyle = `
    border: 1px solid black;
    font-family: Roboto;
    min-width: 130px;
    min-height: 120px;
    background-color: white;
    overflow-y: auto;
    border-radius: 5px;
`


function assembleSubMenu(subMenu:SubMenu, level:number):void{
    const onSelect = (key:string)=>{
        const value = subMenu[key]
        if (typeof value === 'string') window.open(value, '_blank')?.focus();
        else assembleSubMenu(value,level+1)
    }
    const html =  `<div style="${subMenuDefaultStyle}" id="subMenu_${level}" class="${level>0?'appear':''}">
        ${Object.keys(subMenu).map((key:string)=>renderKey(key, level, typeof subMenu[key]==='string',onSelect)).join('')}
    </div>
    <div id="subMenuRoot_${level+1}" style="display: flex;"></div>
    `
    render(`subMenuRoot_${level}`, html)
}


async function render(where:string, what: string):Promise<void>{
    await new Promise(resolve=>setTimeout(resolve,0))
    document.getElementById(where)!.innerHTML = what
    adjustBorders()
}

export async function renderNestedMenu({style, subMenu}:NestedMenu):Promise<void>{
    render('nestedMenu',`<div id="subMenuRoot_0" style="display: flex; ${style}"></div>`)
    assembleSubMenu(subMenu, 0)
}