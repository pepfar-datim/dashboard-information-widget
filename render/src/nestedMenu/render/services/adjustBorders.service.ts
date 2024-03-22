
function onlyOne(first:HTMLElement){
    first.style.borderRadius = '5px'
    first.style.border = '1px solid black'
}
export function adjustBorders(){
    const menus = document.querySelectorAll<HTMLElement>(`[id^='subMenu_']`)
    if (menus.length===0) return
    const first = menus[0]
    const last = menus[menus.length-1]

    if (menus.length===1) return onlyOne(first)

    for (let menu of menus) {
        menu.style.borderRadius = '0px'
        menu.style.borderRight = ''
    }

    first.style.borderRadius = '5px 0px 0px 5px'
    first.style.borderRight = ''

    last.style.borderRadius = '0px 5px 5px 0px'
    last.style.borderRight = '1px solid black'
}
