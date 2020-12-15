import api from './api.service';
import { getKeyUid, shareKey } from './content.service';

const config = require('../../../config/config.json');

async function addNamespaceConfig(datastoreNamespace, onlyOpenToSuperUsersKey) {
    const data = { [onlyOpenToSuperUsersKey]: false };
    await api.post(`/dataStore/${datastoreNamespace}/configuration`, data);
    //Share configuration key so only superusers can edit
    const configKeyUid = await getKeyUid('configuration');
    await shareKey(configKeyUid, 'r-------');
}

export default async function setupNamespace() {
    const { datastoreNamespace, onlyOpenToSuperUsersKey } = config;
    const namespaces = await api.get('/dataStore');
    if (!namespaces.includes(config.datastoreNamespace)) {
        // Namespace does not yet exist
        console.log(`Setting up namespace ${datastoreNamespace}`);
        await addNamespaceConfig(datastoreNamespace, onlyOpenToSuperUsersKey);
    } else {
        const namespaceKeys = await api.get(`/dataStore/${config.datastoreNamespace}`);
        if (!('configuration' in namespaceKeys)) {
            // Namespace exists, but no config key (upgrading from old app version)
            console.log(`Adding configuration key to ${datastoreNamespace} namespace`);
            await addNamespaceConfig(datastoreNamespace, onlyOpenToSuperUsersKey);
        }
    }
}
