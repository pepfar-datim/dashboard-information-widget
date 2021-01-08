import React, { useState, useEffect } from 'react';
import MessageWrapper from './messageWrapper.component';
import importSqlViewIfMissing from '../../shared/services/importSqlViewIfMissing.service';
import setupNamespace from '../../shared/services/setupNamespace.service';

export default function SetupWrapper() {
    const [sqlSetupRun, setSqlSetupRun] = useState(false);
    const [sqlSetupStatus, setSqlSetupStatus] = useState(false);

    importSqlViewIfMissing().then((setupStatus) => {
        setSqlSetupRun(true);
        setSqlSetupStatus(setupStatus);
    });

    useEffect(() => {
        setupNamespace();
    }, []);

    if (process.env.NODE_ENV === 'development') {
        window.location.href = window.location.origin + '/#/edit';
    }

    return !sqlSetupRun ? (
        <p>Checking required SQL view</p>
    ) : sqlSetupStatus ? (
        <MessageWrapper />
    ) : (
        <p>Error fetching SQL view "Data Store Key UID" (xexek7cpxqw)</p>
    );
}
