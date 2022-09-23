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

export function NestedMenu({menuJson}:{menuJson:NestedMenuObject}):ReactElement{
    let rand = randomInteger();
    return <>
        <Box style={styles.root} id={`nestedMenu_${rand}`} className={'nestedMenu'}>
            <NestedSubMenu menuJson={menuJson.content}/>
        </Box>
        <style>
            {`#nestedMenu_${rand}{${menuJson.style}}`}
        </style>
    </>
}