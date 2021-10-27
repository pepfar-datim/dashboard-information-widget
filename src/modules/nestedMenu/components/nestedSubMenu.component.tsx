import React, {CSSProperties, ReactElement, useState} from "react";
import {List, ListItem, ListItemText, styled} from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRightAlt";
import {Link} from 'react-router-dom';
import {NestedMenuJson} from "../../shared/services/content.service";

const styles = {
    subMenu: {
        // padding: 0
        minWidth: 120
    } as CSSProperties,
    nestedSubmenu:{
        // borderLeft: '1px solid black'
    },
    link: {
        // textDecoration: 'none',
        // color: 'inherit',
    },
    linkText:{
        '& :hover::after':{
            // content: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==)',
            // width: 10,
            // height: 10,
            // display: 'inline-block',
            // position: 'absolute',
            // top: 4,
            // right: 0,
            // opacity: 0.6
        }
    } as CSSProperties,
    linkWrapper: {
        '& :hover':{
            // color: 'rgb(44, 102, 147,0.7)'
        }
    },
    menuItem: {
        // fontHeight: 300,
        // fontSize: '0.97rem',
        // '& :hover':{
            // color: 'rgb(44, 102, 147,0.7)'
        // },
        // padding: '0px 5px'
    },
    menuItemSelected: {
        // color: 'rgb(44, 102, 147)',
        // '& ::after':{

        // }
        background: 'rgb(44, 102, 147,0.25)'
    },
    menuItemArrow:{
        // position: 'relative',
        // top: -1,
        // left: 3
    } as CSSProperties
}

const MenuItem = styled(ListItem,{
})({
    // paddingTop:0,
    // paddingBottom: 0,
    // cursor: 'pointer',
})

const generateLink = (id:string)=>`/dhis-web-data-visualizer/index.html#/${id}`

const AnalyticsLink = ({id,name}:{id:string, name:string})=>{
    return <option onClick={()=>{
        let newTab = window.open(generateLink(id), '_blank')
        newTab&&newTab.focus()
    }}>
        {name}
    </option>
}

function Item({category, selected, index, onClick}:{category:string, selected:boolean, index:number, onClick: ()=>void}){
    return <option onClick={onClick} key={index} style={selected?styles.menuItemSelected:{}}>
        {category}
    </option>
}

export function NestedSubMenu({menuJson}:{menuJson:NestedMenuJson}):ReactElement|null{
    let [selectedKey,setSelectedKey] = useState<string|null>(null)
    if (selectedKey&&!menuJson[selectedKey]) {
        setSelectedKey(null);
        return null;
    }
    return <React.Fragment>
        <select style={styles.subMenu} multiple={true} value={selectedKey||''}>
            {Object.keys(menuJson).map((category,index)=>{
                if (typeof menuJson[category]==='string') return <AnalyticsLink id={menuJson[category] as string} name={category}/>
                else return <Item onClick={()=>setSelectedKey(category)} category={category} selected={selectedKey===category} index={index}/>
            })}
        </select>
        {selectedKey&&<NestedSubMenu menuJson={menuJson[selectedKey] as NestedMenuJson}/>}
    </React.Fragment>
}
