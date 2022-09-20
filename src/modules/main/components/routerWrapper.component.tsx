import React, {Ref} from 'react';
// import {HashRouter, Route, Routes} from 'react-router-dom';
import Render from '../../render/components/render.component';
import Edit from '../../edit/edit.component';
import {SnackbarProvider, SnackbarProvider as MuiSnackbarProvider} from "notistack";
import {IconButton} from "@mui/material";
import {CheckCircle, Close} from "@mui/icons-material";
import {
    createHashRouter,
    RouterProvider,
} from "react-router-dom";

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

const router = createHashRouter([
    {path: "/", element: <Render/>},
    {path: "/edit", element: <Render/>},
    {path: "/textEdit", element: <Edit/>},
]);

export default function RouterWrapper() {
    return (
        <>
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
                <RouterProvider router={router} />
            </SnackbarProvider>
        </>
    );
}
