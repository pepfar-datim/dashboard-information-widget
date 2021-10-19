import {getData, postData} from "@pepfar-react-lib/http-tools";

const config = require('../../../config/config.json');

export async function getKeyUid(namespaceKey) {
    const { datastoreNamespace } = config;
    const namespaceKeyMeta = await getData(`/dataStore/${datastoreNamespace}/${namespaceKey}/metaData`);
    return namespaceKeyMeta.id;
}

export async function shareKey(keyUid, publicAccess) {
    let sharingUrl = `/sharing?type=dataStore&id=${keyUid}`;
    const currentSharingReq = await getData(sharingUrl);
    const currPublicAccess = currentSharingReq.object.publicAccess;
    if (currPublicAccess === publicAccess) return;
    return postData(sharingUrl, {
        object: {
            id: keyUid,
            publicAccess: publicAccess,
        },
    });
}