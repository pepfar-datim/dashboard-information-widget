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
        minHeight: 120,
        backgroundColor: 'white',
        overflowY: 'auto'
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

function setFocus(order:number){
    let allMenus:NodeListOf<HTMLElement> = document.querySelectorAll('.nestedSubMenu');;
    allMenus.forEach(menu=>menu.classList.remove('focused'));
    for (let o=0;o<=order;o++){
        document.querySelector(`.nestedSubMenu.subMenu_${o}`)?.classList.add('focused')
    }
}

export function NestedSubMenu2({menuJson, order}:{menuJson:NestedMenuContent,order:number}):ReactElement|null{
    let [selectedKey,setSelectedKey] = useState<string|null>(null)
    let position:TablePosition=TablePosition.middle;
    if (order===0&&selectedKey) position = TablePosition.first;
    if (order>0&&!selectedKey) position = TablePosition.last;
    if (order===0&&!selectedKey) position = TablePosition.onlyOne;

    if (selectedKey&&!menuJson[selectedKey]) {
        setSelectedKey(null);
        return null;
    }

    function onSetCategory(category:string){
        setSelectedKey(category);
        setFocus(order);
    }

    return <>
        <div style={Object.assign({},styles.root,getBorderRadius(position))} className={`nestedSubMenu subMenu_${order} ${order>0?'appear':''}`}>
            {Object.keys(menuJson).map((category,index)=><Item name={category} key={index} selected={selectedKey===category}>
                {typeof menuJson[category] === 'string' ?
                    <AnalyticsLink link={menuJson[category] as string} name={category} key={index}/>
                    :<SubCategory onClick={()=>onSetCategory(category)} name={category} />}
            </Item>)}
        </div>
        {selectedKey&&<NestedSubMenu2 menuJson={menuJson[selectedKey] as NestedMenuContent} order={order+1}/>}
    </>
}