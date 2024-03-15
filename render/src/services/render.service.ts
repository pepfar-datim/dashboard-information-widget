import {loadNestedMenu} from "./nestedMenu/loadNestedMenu.service.ts";

export async function render(content:string):Promise<void>{
    content = await loadNestedMenu(content)
    document.getElementById('content')!.innerHTML = content
}