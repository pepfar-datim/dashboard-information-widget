import React from 'react';
import Render from '../../render/components/render.component';
import Edit from '../../edit/edit.component';
import {ShowMessage} from "@pepfar-react-lib/message-provider"
import {createHashRouter, RouterProvider,} from "react-router-dom";

const createRoutes = (showMessage)=>createHashRouter([
    {path: "/", element: <Render/>},
    {path: "/edit", element: <Render/>},
    {path: "/textEdit", element: <Edit showMessage={showMessage}/>},
]);

export function RouterWrapper({showMessage}:{showMessage:ShowMessage}) {
    return <>
        <RouterProvider router={createRoutes(showMessage)} />
    </>
}
