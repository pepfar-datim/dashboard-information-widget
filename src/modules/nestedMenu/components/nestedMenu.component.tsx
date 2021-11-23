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
    return <Box style={styles.root}>
        <NestedSubMenu menuJson={menuJson.content}/>
    </Box>
}