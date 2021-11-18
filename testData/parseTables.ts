import {readFileSync} from "fs";
import {parse} from "node-html-parser";
import {parseTable, HTMLElement} from "./parseTable";
import {exportYaml} from "./export";

let getHtml:(file:string)=>HTMLElement[] = (file:string)=>parse(readFileSync(file).toString()).querySelectorAll('tr') as any as HTMLElement[];

let resultsHeadings = [
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

let targetHeadings = [
    "Prevention",
    "Testing",
    "Testing - Facility Based Modalities",
    "Testing - Community Based Modalities",
    "Recency Testing",
    "Recency Testing - Facility Based Modalities",
    "Recency Testing - Community Based Modalities",
    "Index Testing",
    "Testing - All Others",
    "Treatment",
    "Viral Suppression",
]

exportYaml({
    Results: parseTable(getHtml("./data/results.html"), resultsHeadings),
    Targets: parseTable(getHtml("./data/targets.html"), targetHeadings)
}, "./data/output.yaml")
