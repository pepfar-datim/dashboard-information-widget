import {CircularProgress} from "@material-ui/core";
import React, {CSSProperties} from "react";

const styles = {
    root:{
        textAlign: 'center'
    } as CSSProperties,
    icon: {
        margin: '40px'
    }
}

export function Loading(){
    return <div style={styles.root}><CircularProgress data-testid='loading' style={styles.icon}/></div>
}