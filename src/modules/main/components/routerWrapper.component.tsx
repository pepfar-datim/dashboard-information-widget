import React, {Ref} from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import Render from '../../render/render.component';
import Edit from '../../edit/edit.component';
import {SnackbarProvider} from "notistack";
import {IconButton} from "@material-ui/core";
import {CheckCircle, Close} from "@material-ui/icons";
import {SnackbarProvider as MuiSnackbarProvider} from "notistack";

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

export default function RouterWrapper({isAdmin, adminOnlyEdit}) {
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
                <Route
                    path={["/","/edit"]}
                    exact
                    render={() => (
                        <Render isAdmin={isAdmin} adminOnlyEdit={adminOnlyEdit} />
                    )}
                />
                <Route
                    path="/textEdit"
                    exact
                    render={() => <Edit/>}
                />
            </SnackbarProvider>
        </HashRouter>
    );
}

