
export function createStyleElement(id, style){
    const stylesSheet:string = `#${id} {${style}}`;
    let css = document.createElement('style');
    css.appendChild(document.createTextNode(stylesSheet));
    document.getElementsByTagName("head")[0].appendChild(css);
}

export function removeStyle(category:string):string{
    return category.replace(/\{.+\}/, '')
}

export function checkStyle(id:string, category:string){
    if (/\{.+\}/.test(category)) {
        try {
            let r = category.match(/\{.+\}/);
            let css = r&&r[0]
                ?.replace(/(\{|\})/g,"")
                ?.replace(/\|/g,":")
                ?.replace(/\$/g,"#")
            createStyleElement(id,css);
        }catch(e){

        }

    }
}