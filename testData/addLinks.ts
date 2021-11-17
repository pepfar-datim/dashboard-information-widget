interface HTMLElement {
    childNodes:any
}

function getId(row:HTMLElement, i:number):string{
    let nodes = row.childNodes.map((n:any)=>n.childNodes);
    return nodes[3+(2*i)][0].rawAttrs?.replace(/^.+\#\//,'').replace('"','')
}

export function addLinks(row:HTMLElement){
    let response:{[key: string]: string} =  {
        fy2021q4: getId(row, 1),
        fy2021q3: getId(row, 2),
        fy2021q2: getId(row, 3),
        fy2021q1: getId(row, 4),
        fy2020q4: getId(row, 5),
        fy2020q3: getId(row, 6),
        fy2020q2: getId(row, 7),
        fy2020q1: getId(row, 8),
        fy2019q4: getId(row, 9),
        fy2019q3: getId(row, 10),
        fy2019q2: getId(row, 11),
        fy2019q1: getId(row, 12),
    }
    Object.keys(response).forEach((period:string)=>{
        if (response[period]==='') delete response[period];
    })
    return response;
}