import React, {CSSProperties, ReactElement, useState} from "react";
import {List, ListItem, ListItemText, styled} from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRightAlt";
import {Link} from 'react-router-dom';
import {NestedMenuContent} from "../../shared/services/content.service";
import {randomInteger} from "../services/randomInteger";
import {createStyleElement} from "../services/createStyleElement";

const styles = {
    subMenu: {
        minWidth: 130,
        fontFamily: 'Roboto, Calibri, sans-serif',
        borderRadius: 5,
        border: '1px solid #aaaaaa',
        fontSize: '1rem',
        overflowY: 'auto'
    } as CSSProperties,
    link: {
    },
    linkText:{
        '& :hover::after':{
        }
    } as CSSProperties,
    linkWrapper: {
        '& :hover':{
        }
    },
    menuItem: {
        padding: 4
    },
    menuItemSelected: {
        background: 'rgb(44, 102, 147,0.25)'
    },
    menuItemArrow:{
    } as CSSProperties
}

const MenuItem = styled(ListItem,{
})({
})

const generateLink = (id:string)=>`/dhis-web-data-visualizer/index.html#/${id}`

const AnalyticsLink = ({id,name}:{id:string, name:string})=>{
    return <option onClick={()=>{
        let newTab = window.open(generateLink(id), '_blank')
        newTab&&newTab.focus()
    }} style={styles.menuItem}>
        {name}
    </option>
}

function Item({category, selected, onClick}:{category:string, selected:boolean, onClick: ()=>void}){
    let id = `nestedMenuItem_${randomInteger()}`
    if (/\{.+\}/.test(category)) {
        try {
            let r = category.match(/\{.+\}/);
            let css = r&&r[0]
                ?.replace(/(\{|\})/g,"")
                ?.replace(/\|/g,":")
                ?.replace(/\$/g,"#")
                createStyleElement(id,css);
        }catch(e){

        }
        category = category.replace(/\{.+\}/, '')
    }
    return <><option onClick={onClick} style={Object.assign({},styles.menuItem,selected?styles.menuItemSelected:{})} id={id}>
        {category}
    </option></>
}

export function NestedSubMenu({menuJson}:{menuJson:NestedMenuContent}):ReactElement|null{
    let [selectedKey,setSelectedKey] = useState<string|null>(null)
    if (selectedKey&&!menuJson[selectedKey]) {
        setSelectedKey(null);
        return null;
    }
    return <React.Fragment>
        <select style={styles.subMenu} multiple={true} defaultValue={[selectedKey||'']}>
            {Object.keys(menuJson).map((category,index)=>{
                if (typeof menuJson[category]==='string') return <AnalyticsLink id={menuJson[category] as string} name={category} key={index}/>
                else return <Item onClick={()=>setSelectedKey(category)} category={category} selected={selectedKey===category} key={index}/>
            })}
        </select>
        {selectedKey&&<NestedSubMenu menuJson={menuJson[selectedKey] as NestedMenuContent}/>}
    </React.Fragment>
}
