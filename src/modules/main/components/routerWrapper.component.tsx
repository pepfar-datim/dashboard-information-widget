import React, {Ref} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Render from '../../render/components/render.component';
import Edit from '../../edit/edit.component';
import {SnackbarProvider, SnackbarProvider as MuiSnackbarProvider} from "notistack";
import {IconButton} from "@mui/material";
import {CheckCircle, Close} from "@mui/icons-material";

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
    // @ts-ignore
    notistackRef.current.closeSnackbar(key);
}

const styles = {
    icon: {
        width: 20,
        marginInlineEnd: 8
    }
};

export default function RouterWrapper() {
    return (
        <HashRouter>
            <SnackbarProvider
                ref={notistackRef as Ref<MuiSnackbarProvider>}
                maxSnack={3}
                autoHideDuration={3000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                action={(key) => (
                    <IconButton onClick={onClickDismiss(key)}>
                        <Close />
                    </IconButton>
                )}
                iconVariant={{
                    warning: <CheckCircle style={styles.icon}/>,
                }}
            >
                <Route path={['/', '/edit']} exact>
                    <Render />
                </Route>
                <Route path="/textEdit" exact>
                    <Edit />
                </Route>
            </SnackbarProvider>
        </HashRouter>
    );
}
