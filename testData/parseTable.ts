import { readFileSync } from 'fs';
import { parse } from 'node-html-parser';
import {addLinks} from "./addLinks";
import {exportYaml} from "./export";
let source = readFileSync("./source.html")
const root = parse(source.toString());

interface HTMLElement {
    childNodes:any
}

let tableRows:HTMLElement[] = root.querySelectorAll('tr') as any as HTMLElement[];

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
    let previousItem:string="";
    Output[currentSectionTitle] = {};
    tableRows.forEach((row:HTMLElement)=>{
        let out = Output[currentSectionTitle];
        let rowTitle = row.childNodes[1].textContent;
        let subTitle = row.childNodes[3].textContent;
        if (rowTitle==="Technical Area") return;
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
                    out[previousItem][subTitle]=addLinks(row);
                    return;
                }
                previousItem = rowTitle;
                if (!out[rowTitle]) out[rowTitle] = {};
                out[rowTitle][subTitle]=addLinks(row);
                return;
            case SectionStatus.done:
                return;
        }
    })
});

exportYaml(Output)
