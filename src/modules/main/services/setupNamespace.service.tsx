import { getKeyUid, shareKey } from '../../shared/services/content.service';
import {getData, postData} from "@pepfar-react-lib/http-tools";

const config = require('../../../config/config.json');

async function addNamespaceConfig(datastoreNamespace, onlyOpenToSuperUsersKey) {
    const data = { [onlyOpenToSuperUsersKey]: false };
    await postData(`/dataStore/${datastoreNamespace}/configuration`, data);
    const configKeyUid = await getKeyUid('configuration');
    await shareKey(configKeyUid, 'r-------');
}

export default async function setupNamespace() {
    const { datastoreNamespace, onlyOpenToSuperUsersKey } = config;
    const namespaces = await getData('/dataStore');
    if (!namespaces.includes(datastoreNamespace)) {
        // Namespace does not yet exist
        console.log(`Setting up namespace ${datastoreNamespace}`);
        await addNamespaceConfig(datastoreNamespace, onlyOpenToSuperUsersKey);
    } else {
        const namespaceKeys = await getData(`/dataStore/${config.datastoreNamespace}`);
        if (!namespaceKeys.includes('configuration')) {
            // Namespace exists, but no config key (upgrading from old app version)
            await addNamespaceConfig(datastoreNamespace, onlyOpenToSuperUsersKey);
        }
    }
}

async function checkDataStore(){
    const {datastoreNamespace} = config;
    const namespace = await getData(`/dataStore/${datastoreNamespace}`);
    if (namespace.status==="ERROR") return false;
    if (!namespace.includes('configuration')) return false;
    return true;
}

export async function connectToDataStore(){
    if(await checkDataStore()) return;
    const {datastoreNamespace, onlyOpenToSuperUsersKey} = config;
    await addNamespaceConfig(datastoreNamespace, onlyOpenToSuperUsersKey);
}