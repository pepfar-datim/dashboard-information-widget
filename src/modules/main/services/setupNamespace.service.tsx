import {getJson, postJson } from "@pepfar-react-lib/datim-api";
import {getKeyUid, shareKey} from "../../shared/services/shareKey.service";

const config = require('../../../config/config.json');

async function addNamespaceConfig(datastoreNamespace, onlyOpenToSuperUsersKey) {
    const data = { [onlyOpenToSuperUsersKey]: false };
    await postJson(`/dataStore/${datastoreNamespace}/configuration`, data);
    const configKeyUid = await getKeyUid('configuration');
    await shareKey(configKeyUid, 'r-------');
}

async function checkDataStore(){
    const {datastoreNamespace} = config;
    const namespace = await getJson(`/dataStore/${datastoreNamespace}`);
    if (namespace.status==="ERROR") return false;
    if (!namespace.includes('configuration')) return false;
    return true;
}

export async function connectToDataStore(){
    if(await checkDataStore()) return;
    const {datastoreNamespace, onlyOpenToSuperUsersKey} = config;
    await addNamespaceConfig(datastoreNamespace, onlyOpenToSuperUsersKey);
}