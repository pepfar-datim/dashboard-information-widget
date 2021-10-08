import React from "react";
import { render } from 'react-dom';
import {apiInit} from "@pepfar-react-lib/http-tools";
import {baseUrl} from "./config/configProvider";
import AccessWrapper from "./modules/main/components/accessWrapper.component";
import {Loading} from "./modules/shared/components/loading.component";
import {connectToDataStore} from "./modules/main/services/setupNamespace.service";
import NetworkError from "./modules/main/components/networkError.component";
apiInit(baseUrl, process.env.NODE_ENV);

render(<Loading/>, document.getElementById('root'));
connectToDataStore().then(()=>{
    render(<AccessWrapper/>, document.getElementById('root'));
}).catch(()=>{
    render(<NetworkError/>, document.getElementById('root'));
});