import React, {MutableRefObject, ReactElement, useRef, useState} from "react";
import {NestedMenuContent} from "../../../shared/services/content.service";
import {Item} from "./item.component";
import {AnalyticsLink} from "./analyticsLink.component";
import {SubCategory} from "./subCategory.component";

const styles = {
    root: {
        border: '1px solid black',
        fontFamily: "Roboto",
        minWidth: 130,
        minHeight: 120
    }
}

enum TablePosition {
    middle='middle',
    first='first',
    last='last',
    onlyOne='onlyOne'
}

function getBorderRadius(position:TablePosition):any{
    let borderRadius;
    let borderRightWidth:string = '1px';
    switch(position){
        case TablePosition.middle:
            borderRadius = 0;
            borderRightWidth = '0px'
            break;
        case TablePosition.last:
            borderRadius = '0px 5px 5px 0px'
            break;
        case TablePosition.onlyOne:
            borderRadius = 5;
            break;
        case TablePosition.first:
            borderRadius = '5px 0px 0px 5px'
            borderRightWidth = '0px'
            break;
    }
    return {borderRadius, borderRightWidth};
}

type SetSelectedKey = (category:string|null)=>void

export function NestedSubMenu2({menuJson, order, refFromParent}:{menuJson:NestedMenuContent,order:number, refFromParent:MutableRefObject<SetSelectedKey>}):ReactElement|null{
    let [selectedKey,setSelectedKey] = useState<string|null>(null)
    refFromParent.current = setSelectedKey;
    const nextMenu = React.useRef<SetSelectedKey>(null);
    let position:TablePosition=TablePosition.middle;
    if (order===0&&selectedKey) position = TablePosition.first;
    if (order>0&&!selectedKey) position = TablePosition.last;
    if (order===0&&!selectedKey) position = TablePosition.onlyOne;

    function onSetCategory(category:string){
        setSelectedKey(category);
        if (nextMenu.current) nextMenu.current(null);
    }

    return <>
        <div style={Object.assign({},styles.root,getBorderRadius(position))}>
            {Object.keys(menuJson).map((category,index)=><Item name={category} key={index} selected={selectedKey===category}>
                {typeof menuJson[category] === 'string' ?
                    <AnalyticsLink link={menuJson[category] as string} name={category} key={index}/>
                    :<SubCategory onClick={()=>onSetCategory(category)} name={category} />}
            </Item>)}
        </div>
        {selectedKey&&<NestedSubMenu2 refFromParent={nextMenu as MutableRefObject<SetSelectedKey>} menuJson={menuJson[selectedKey] as NestedMenuContent} order={order+1}/>}
    </>
}