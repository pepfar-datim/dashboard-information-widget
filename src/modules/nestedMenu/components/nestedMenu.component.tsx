import React, {ReactElement} from "react";
import {NestedMenuJson} from "../../shared/services/content.service";
import {Box} from '@mui/material';
import "./nestedMenu.css"
import {NestedSubMenu} from "./nestedSubMenu.component";

const styles = {
    root: {
        display: 'flex'
    }
}

export function NestedMenu({menuJson}:{menuJson:NestedMenuJson}):ReactElement{
    return <Box style={styles.root}>
        <NestedSubMenu menuJson={menuJson}/>
    </Box>
}