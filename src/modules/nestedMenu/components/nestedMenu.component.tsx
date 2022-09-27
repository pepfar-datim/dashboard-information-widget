import React, {ReactElement} from "react";
import {NestedMenuObject} from "../../shared/services/content.service";
import {Box} from '@mui/material';
import "./nestedMenu.css"
import {NestedSubMenu} from "./nestedSubMenu.component";
import {randomInteger} from "../services/randomInteger";

const styles = {
    root: {
        display: 'flex'
    }
}

function getBrowserStyle(){
    let style = `background: linear-gradient(0deg, rgb(44, 102, 147) 0%, rgb(44, 102, 147) 100%)!important`;
    if (window.navigator.appVersion.includes('Mac')) style = `outline: 1px solid  rgb(44, 102, 147);`
    return `select:focus option:checked{
      ${style}  
    }`
}

export function NestedMenu({menuJson}:{menuJson:NestedMenuObject}):ReactElement{
    let rand = randomInteger();
    return <>
        <Box style={styles.root} id={`nestedMenu_${rand}`} className={'nestedMenu'}>
            <NestedSubMenu menuJson={menuJson.content} order={0}/>
        </Box>
        <style>
            {`#nestedMenu_${rand}{${menuJson.style}}`}
            {/*{getBrowserStyle()}*/}
        </style>
    </>
}