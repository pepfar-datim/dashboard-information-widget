
export function createStyleElement(id, style){
    const stylesSheet:string = `#${id} {${style}}`;
    let css = document.createElement('style');
    css.appendChild(document.createTextNode(stylesSheet));
    document.getElementsByTagName("head")[0].appendChild(css);
}