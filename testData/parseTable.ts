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
        txt = txt.replace(/\s+/,'');
        if (txt) keys.push(txt);
    })
    return keys;
}

let firstLevel = [
    "Prevention",
    "Testing",
    "Testing - Facility Based Modalities",
    "Testing - Community Based Modalities",
    "Recency Testing",
    "Recency Testing - Facility Based Modalities",
    "Recency Testing - Community Based Modalities",
    "Index Testing - Facility Based",
    "Index Testing - Community Based",
    "Testing - All Others",
    "Treatment",
    "Viral Suppression",
    "Health Systems",
    "National Level Indicators"
]

enum SectionStatus {
    searching,
    reading,
    done
}

let Output:any = {};

firstLevel.forEach((currentSectionTitle:string,i:number)=>{
    let nextSectionTitle:string = firstLevel[i+1];
    let status:SectionStatus = SectionStatus.searching;
    console.log(`Parsing data between:`,currentSectionTitle, 'and', nextSectionTitle);

    let previousItem:string="";
    tableRows.forEach((row:HTMLElement)=>{
        let rowTitle = row.childNodes[1].textContent.replace(/\s+/g,'');
        let subTitle = row.childNodes[3].textContent.replace(/\s+/g,'');
        if (rowTitle==="TechnicalArea") return;
        switch (status){
            case SectionStatus.searching:
                if (currentSectionTitle===rowTitle) status = SectionStatus.reading;
                return;
            case SectionStatus.reading:
                if (rowTitle===nextSectionTitle) {
                    status = SectionStatus.done;
                    return;
                }
                if (rowTitle===""){
                    Output[previousItem][subTitle]={};
                    return;
                }
                previousItem = rowTitle;
                // Output[rowTitle] = subTitle;
                if (!Output[rowTitle]) Output[rowTitle] = {};
                Output[rowTitle][subTitle]={};
                return;
            case SectionStatus.done:
                return;
        }
    })
});

console.log(Output)
