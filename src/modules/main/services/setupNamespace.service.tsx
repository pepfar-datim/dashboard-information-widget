import {getKeyUid, shareKey} from '../../shared/services/content.service';
import {getData, postData} from "@pepfar-react-lib/http-tools";

const config = require('../../../config/config.json');

async function addNamespaceConfig(datastoreNamespace, onlyOpenToSuperUsersKey) {
    const data = { [onlyOpenToSuperUsersKey]: false };
    await postData(`/dataStore/${datastoreNamespace}/configuration`, data);
    const configKeyUid = await getKeyUid('configuration');
    await shareKey(configKeyUid, 'r-------');
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