import React from "react";
import { render } from 'react-dom';
import {apiInit} from "@pepfar-react-lib/http-tools";
import {baseUrl} from "./config/configProvider";
import AccessWrapper from "./modules/main/components/accessWrapper.component";
import {CircularProgress} from "@material-ui/core";
import {Loading} from "./modules/shared/components/loading.component";
import {connectToDataStore} from "./modules/main/services/setupNamespace.service";
apiInit(baseUrl, process.env.NODE_ENV);
// render(<AccessWrapper/>, document.getElementById('root'));

render(<Loading/>, document.getElementById('root'));

connectToDataStore().then(()=>{
    render(<AccessWrapper/>, document.getElementById('root'));
});