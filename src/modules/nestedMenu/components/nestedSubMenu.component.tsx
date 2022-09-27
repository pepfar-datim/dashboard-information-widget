import React, {CSSProperties, ReactElement, useState} from "react";
import {ListItem, styled} from "@mui/material";
import {NestedMenuContent} from "../../shared/services/content.service";
import {randomInteger} from "../services/randomInteger";
import {createStyleElement, checkStyle, removeStyle} from "../services/createStyleElement";

const styles = {
    subMenu: {
        minWidth: 130,
        fontFamily: 'Roboto, Calibri, sans-serif',
        borderRadius: 5,
        border: '1px solid #aaaaaa',
        fontSize: '1rem',
        overflowY: 'auto'
    } as CSSProperties,
    menuItem: {
        padding: '4px 11px 4px 4px',
        cursor: 'pointer'
    }
}

const generateLink = (link:string)=>{
    return link;
}

const AnalyticsLink = ({link,name}:{link:string, name:string})=>{
    let id = `nestedMenuItem_${randomInteger()}`
    checkStyle(id,name);
    name = removeStyle(name)
    return <option onClick={()=>{
        let newTab = window.open(generateLink(link), '_blank')
        newTab&&newTab.focus()
    }} style={styles.menuItem} className={'analyticsLink'} id={id}>
        {name}
    </option>
}

function Item({category, onClick}:{category:string, onClick: ()=>void}){
    let id = `nestedMenuItem_${randomInteger()}`
    checkStyle(id,category);
    category = removeStyle(category)
    return <><option
        onClick={onClick}
        style={styles.menuItem}
    id={id}>
        {category}
    </option></>
}

enum TablePosition {
    middle='middle',
    first='first',
    last='last',
    onlyOne='onlyOne'
}

function getBorderRadius(position:TablePosition):any{
    let borderRadius;
    let borderRight:string|null = '0px';
    switch(position){
        case TablePosition.middle:
            borderRadius = 0;
            break;
        case TablePosition.last:
            borderRadius = '0px 5px 5px 0px'
            borderRight = null;
            break;
        case TablePosition.onlyOne:
            borderRadius = 5;
            borderRight = null;
            break;
        case TablePosition.first:
            borderRadius = '5px 0px 0px 5px'
            break;
    }
    return {borderRadius, borderRight};
}

export function NestedSubMenu({menuJson, order}:{menuJson:NestedMenuContent,order:number}):ReactElement|null{
    let [selectedKey,setSelectedKey] = useState<string|null>(null)
    if (selectedKey&&!menuJson[selectedKey]) {
        setSelectedKey(null);
        return null;
    }
    let position:TablePosition=TablePosition.middle;
    if (order===0&&selectedKey) position = TablePosition.first;
    if (order>0&&!selectedKey) position = TablePosition.last;
    if (order===0&&!selectedKey) position = TablePosition.onlyOne;
    return <React.Fragment>
        <select style={Object.assign({},styles.subMenu,getBorderRadius(position))} multiple={true} defaultValue={[selectedKey||'']}>
            {Object.keys(menuJson).map((category,index)=>{
                if (typeof menuJson[category]==='string') return <AnalyticsLink link={menuJson[category] as string} name={category} key={index}/>
                else return <Item onClick={()=>setSelectedKey(category)} category={category} key={index}/>
            })}
        </select>
        {selectedKey&&<NestedSubMenu menuJson={menuJson[selectedKey] as NestedMenuContent} order={order+1}/>}
    </React.Fragment>
}
