import {NestedMenu, SubMenu} from "../nestedMenu.types.ts";
import {parse} from 'yaml'

const escapeCss = (css:string)=>css
    .replace(/:/g,'|')
    .replace(/#/,'$')


export function getMenuObject(menuSrc:string):SubMenu{
    menuSrc = menuSrc.replace(/\{.+:.+}/g,escapeCss)
    const yaml:NestedMenu = parse(menuSrc)
    return yaml
}