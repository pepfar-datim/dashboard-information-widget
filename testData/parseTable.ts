import {addLinks} from "./addLinks";

export interface HTMLElement {
    childNodes:any
}


enum SectionStatus {
    searching,
    reading,
    done
}

export function parseTable(tableRows:HTMLElement[],firstLevel:string[]){
    let Output: any = {};
    firstLevel.forEach((currentSectionTitle: string, i: number) => {
        let nextSectionTitle: string = firstLevel[i + 1];
        let status: SectionStatus = SectionStatus.searching;
        let previousItem: string = "";
        Output[currentSectionTitle] = {};
        tableRows.forEach((row: HTMLElement) => {
            let out = Output[currentSectionTitle];
            let rowTitle = row.childNodes[1].textContent;
            let subTitle = row.childNodes[3].textContent;
            if (rowTitle === "Technical Area") return;
            switch (status) {
                case SectionStatus.searching:
                    if (currentSectionTitle === rowTitle) status = SectionStatus.reading;
                    return;
                case SectionStatus.reading:
                    if (rowTitle === nextSectionTitle) {
                        status = SectionStatus.done;
                        return;
                    }
                    if (rowTitle === "") {
                        out[previousItem][subTitle] = addLinks(row);
                        return;
                    }
                    previousItem = rowTitle;
                    if (!out[rowTitle]) out[rowTitle] = {};
                    out[rowTitle][subTitle] = addLinks(row);
                    return;
                case SectionStatus.done:
                    return;
            }
        })
    });
    return Output;
}

