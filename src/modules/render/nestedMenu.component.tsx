import React, {CSSProperties, ReactElement, useState} from "react";
import {NestedMenuJson} from "../shared/services/content.service";
import {List, ListItem, ListItemText, styled, ThemeProvider, createTheme} from '@mui/material';
import {Link} from 'react-router-dom';
import "./nestedMenu.css"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const styles = {
    subMenu: {
        display: 'inline-block',
        paddingTop: 0,
        paddingBottom: 0,
    } as CSSProperties,
    nestedSubmenu:{
        borderLeft: '1px solid black'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    linkWrapper: {
        '& :hover':{
            color: 'rgb(44, 102, 147,0.7)'
        }
    },
    menuItem: {
        fontHeight: 300,
        fontSize: '0.97rem',
        '& :hover':{
            color: 'rgb(44, 102, 147,0.7)'
        }
    },
    menuItemSelected: {
        color: 'rgb(44, 102, 147)',
    }
}

const MenuItem = styled(ListItem,{
})({
    paddingTop:0,
    paddingBottom: 0,
    cursor: 'pointer',
})

const generateLink = (id:string)=>`/dhis-web-data-visualizer/index.html#/${id}`

const AnalyticsLink = ({id,name}:{id:string, name:string})=>{
    // let [hover, setHover] = useState(false);
    return <Link style={styles.link} target='_blank' to={generateLink(id)}><ListItemText primary={name} className={'analyticsLink'}/></Link>
}

export function NestedMenu({menuJson}:{menuJson:NestedMenuJson}):ReactElement|null{
    let [selectedKey,setSelectedKey] = useState<string|null>(null)
    if (selectedKey&&!menuJson[selectedKey]) {
        setSelectedKey(null);
        return null;
    }
    return <React.Fragment><List style={styles.subMenu} dense={true}>
        {Object.keys(menuJson).map((c,key)=>{
            if (typeof menuJson[c]==='string') return <MenuItem sx={styles.linkWrapper}><AnalyticsLink id={menuJson[c] as string} name={c}/></MenuItem>
            else return <MenuItem onClick={()=>setSelectedKey(c)} key={key} sx={Object.assign({},styles.menuItem, selectedKey===c?styles.menuItemSelected:null)}><ListItemText primary={c}/></MenuItem>
        })}
    </List>
    {selectedKey&&<NestedMenu menuJson={menuJson[selectedKey] as NestedMenuJson}/>}
    </React.Fragment>
}