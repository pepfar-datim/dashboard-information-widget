import React from "react";
import {Divider, Link, Paper, Typography} from "@mui/material";

const styles = {
    root: {
        maxWidth: 600,
        margin: `20px auto`
    }
};

function isDatim():boolean{
    return window.location.href.includes('datim');
}

export default function NetworkError(){
    return(
        <Paper style={styles.root}>
            <Typography variant="h5">Connection Error</Typography>
            <Divider/>
            <Typography>Cannot connect to DHIS2</Typography>
            <br/>
            <Typography>Please check the following:</Typography>
            <ul>
                <li><Typography>You are still connected to the Internet</Typography></li>
                <li><Typography>You are still logged in into DHIS2</Typography></li>
                <li><Typography>You have the rights to use Dashboard Information Widget</Typography></li>
            </ul>
            {isDatim()&&<Typography>If this problem persists, please contact <Link href='https://datim.zendesk.com/'>DATIM Support</Link></Typography>}
        </Paper>
    );
}