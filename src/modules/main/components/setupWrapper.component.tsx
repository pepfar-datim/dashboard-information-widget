import React, { useEffect } from 'react';
import MessageWrapper from './messageWrapper.component';
import setupNamespace from '../../shared/services/setupNamespace.service';

export default function SetupWrapper() {
    useEffect(() => {
        setupNamespace();
    }, []);
    return <MessageWrapper />;
}
