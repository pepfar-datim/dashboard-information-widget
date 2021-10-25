import React from 'react';
import {Typography} from '@mui/material';

export default function DhisVersionError({ version }) {
    return (
        <React.Fragment>
            <Typography>
                <p>
                    <strong>Version Error</strong> This dashboard widget can
                    only be run on dhis2 versions 2.31 and up
                </p>
                <p>
                    Current version: <strong>{version}</strong>
                </p>
            </Typography>
        </React.Fragment>
    );
}
