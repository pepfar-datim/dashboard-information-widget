import {NestedMenu, SubMenu} from "./nestedMenu.types.ts";
import {parse} from 'yaml'

const escapeCss = (css:string)=>css
    .replace(/:/g,'|')
    .replace(/#/,'$')


export function getMenuObect(menuSrc:string):SubMenu{
    menuSrc = menuSrc.replace(/\{.+:.+}/g,escapeCss)
    const yaml:NestedMenu = parse(menuSrc)
    return yaml
}