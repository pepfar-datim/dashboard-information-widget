import {CircularProgress} from "@material-ui/core";
import React from "react";

const styles = {
    root: {
        margin: '40px auto'
    }
}

export function Loading(){
    return <div><CircularProgress data-testid='loading' style={styles.root}/></div>
}