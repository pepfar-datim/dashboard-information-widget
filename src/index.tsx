import React from "react";
import {render} from 'react-dom';
import AccessWrapper from "./modules/main/components/accessWrapper.component";
import {Loading} from "./modules/shared/components/loading.component";
import {connectToDataStore} from "./modules/main/services/setupNamespace.service";
import NetworkError from "./modules/main/components/networkError.component";
import RouterWrapper from "./modules/main/components/routerWrapper.component";
import { register } from "@pepfar-react-lib/datim-api";

register(process.env.NODE_ENV,process.env.REACT_APP_BASE_URL);

render(<Loading/>, document.getElementById('root'));
connectToDataStore().then(()=>{
    render(<AccessWrapper><RouterWrapper/></AccessWrapper>, document.getElementById('root'));
}).catch((error)=>{
    console.error(error)
    render(<NetworkError/>, document.getElementById('root'));
});