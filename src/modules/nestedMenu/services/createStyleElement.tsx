
export function createStyleElement(id, style){
    const stylesSheet:string = `#${id} {${style}}`;
    let css = document.createElement('style');
    css.appendChild(document.createTextNode(stylesSheet));
    document.getElementsByTagName("head")[0].appendChild(css);
}

export function removeStyle(category:string):string{
    return category.replace(/\{.+\}/, '')
}

export function checkStyle(category:string):string|null{
    if (!/\{.+\}/.test(category)) return null;
    let r = category.match(/\{.+\}/);
    return r&&r[0]
        ?.replace(/(\{|\})/g,"")
        ?.replace(/\|/g,":")
        ?.replace(/\$/g,"#")
}