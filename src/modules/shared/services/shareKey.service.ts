import {getJson, postJson} from "@pepfar-react-lib/datim-api";

const config = require('../../../config/config.json');

export async function getKeyUid(namespaceKey) {
    const { datastoreNamespace } = config;
    const namespaceKeyMeta = await getJson(`/dataStore/${datastoreNamespace}/${namespaceKey}/metaData`);
    return namespaceKeyMeta.id;
}

export async function shareKey(keyUid, publicAccess) {
    let sharingUrl = `/sharing?type=dataStore&id=${keyUid}`;
    const currentSharingReq = await getJson(sharingUrl);
    const currPublicAccess = currentSharingReq.object.publicAccess;
    if (currPublicAccess === publicAccess) return;
    return postJson(sharingUrl, {
        object: {
            id: keyUid,
            publicAccess: publicAccess,
        },
    });
}