import React, { useEffect } from 'react';
import setupNamespace from '../../shared/services/setupNamespace.service';
import AccessWrapper from "./accessWrapper.component";

export default function SetupWrapper() {
    useEffect(() => {
        setupNamespace();
    }, []);
    return <AccessWrapper
        postMessage={(message) => this.postMessage(message)}
    />
}
