import React, {MutableRefObject, ReactElement} from "react";
import {NestedMenuObject} from "../../shared/services/content.service";
import {Box} from '@mui/material';
import "./nestedMenu.scss"
import {randomInteger} from "../services/randomInteger";
import {NestedSubMenu2} from "./nestedSubMenu/nestedSubMenu2.component";

const styles = {
    root: {
        display: 'flex'
    }
}

export function NestedMenu({menuJson}:{menuJson:NestedMenuObject}):ReactElement{
    let rand = randomInteger();
    return <>
        <Box style={styles.root} id={`nestedMenu_${rand}`} className={'nestedMenu'}>
            <NestedSubMenu2 menuJson={menuJson.content} order={0}/>
        </Box>
        <style>
            {`#nestedMenu_${rand}{${menuJson.style}}`}
        </style>
    </>
}