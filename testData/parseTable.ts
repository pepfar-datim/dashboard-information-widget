import { readFileSync } from 'fs';
import { parse } from 'node-html-parser';
let source = readFileSync("./source.html")
const root = parse(source.toString());

interface HTMLElement {
    childNodes:any
}

let tableRows:HTMLElement[] = root.querySelectorAll('tr') as any as HTMLElement[];

function getFirstLevelKeys(tableRows:HTMLElement[]):string[]{
    let keys:string[] = [];
    tableRows.forEach((row:HTMLElement)=>{
        let txt = row.childNodes[1].textContent;
        if (!txt) return;
        txt = txt.replace(/\s+/,'');
        if (txt) keys.push(txt);
    })
    return keys;
}

console.log(getFirstLevelKeys(tableRows))