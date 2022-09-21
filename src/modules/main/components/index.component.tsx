import CheckVersionWrapper from "./checkVersionWrapper.component";
import {RouterWrapper} from "./routerWrapper.component";
import {MessageProvider, ShowMessage} from "@pepfar-react-lib/message-provider";
import React from "react";

export let Index = ()=><CheckVersionWrapper>
    <MessageProvider>
        {(showMessage:ShowMessage)=><RouterWrapper showMessage={showMessage}/>}
    </MessageProvider>
</CheckVersionWrapper>