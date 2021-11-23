import React, {ReactElement} from "react";
import {NestedMenuContent, NestedMenuObject} from "../../shared/services/content.service";
import {Box} from '@mui/material';
import "./nestedMenu.css"
import {NestedSubMenu} from "./nestedSubMenu.component";

const styles = {
    root: {
        display: 'flex'
    }
}

export function NestedMenu({menuJson}:{menuJson:NestedMenuObject}):ReactElement{
    let rand = Math.floor(Math.random()*1000);
    return <>
        <Box style={styles.root} id={`nestedMenu_${rand}`}>
            <NestedSubMenu menuJson={menuJson.content}/>
        </Box>
        <style>
            {`#nestedMenu_${rand}{${menuJson.style}}`}
        </style>
    </>
}