import {loadNestedMenu} from "../nestedMenu/src/loadNestedMenu.service.ts";

export async function render(content:string):Promise<void>{
    content = await loadNestedMenu(content)
    const contentEl = document.getElementById('content')!
    contentEl.innerHTML = content
    contentEl.style.marginTop = '-1px'
}