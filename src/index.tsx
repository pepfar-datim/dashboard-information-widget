import React from "react";
import { render } from 'react-dom';
import {apiInit} from "@pepfar-react-lib/http-tools";
import {baseUrl} from "./config/configProvider";
import AccessWrapper from "./modules/main/components/accessWrapper.component";
apiInit(baseUrl, process.env.NODE_ENV);
render(<AccessWrapper/>, document.getElementById('root'));