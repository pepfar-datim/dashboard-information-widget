import React, { useEffect } from 'react';
import MessageWrapper from './messageWrapper.component';
import setupNamespace from '../../shared/services/setupNamespace.service';

export default function SetupWrapper() {
    useEffect(() => {
        setupNamespace();
    }, []);

    if (process.env.NODE_ENV === 'development') {
        window.location.href = window.location.origin + '/#/edit';
    }

    return <MessageWrapper />;
}
