import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import SetupWrapper from './setupWrapper.component';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgb(39, 102, 150)',
        },
    },
});

const styles = {
    wrapper: {},
};

export default function ThemeWrapper() {
    return (
        <MuiThemeProvider theme={theme}>
            <div style={styles.wrapper}>
                <SetupWrapper />
            </div>
        </MuiThemeProvider>
    );
}
