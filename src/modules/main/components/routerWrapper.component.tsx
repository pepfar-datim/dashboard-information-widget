import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Render from '../../render/render.component';
import Edit from '../../edit/edit.component';
import {SnackbarProvider} from "notistack";

export default function RouterWrapper({isAdmin, adminOnlyEdit}) {
    return (
        <HashRouter>
            <SnackbarProvider
                maxSnack={3}
                autoHideDuration={3000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
            <Route
                path="/"
                exact
                render={() => (
                    <Render isAdmin={isAdmin} adminOnlyEdit={adminOnlyEdit} />
                )}
            />
            <Route
                path="/edit"
                exact
                render={() => <Edit/>}
            />
            </SnackbarProvider>
        </HashRouter>
    );
}

