import React from "react";
import {HashRouter, Route} from "react-router-dom";
import Render from "../../render/render.component";
import Edit from "../../edit/edit.component";

export default function RouterWrapper({postMessage, isAdmin, adminOnlyEdit}){
    return(
        <HashRouter>
            <Route path='/' exact render={()=><Render isAdmin={isAdmin} adminOnlyEdit={adminOnlyEdit}/>}/>
            <Route path="/edit" exact render={()=><Edit postMessage={(m)=>postMessage(m)}/>} />
        </HashRouter>
    );
}

