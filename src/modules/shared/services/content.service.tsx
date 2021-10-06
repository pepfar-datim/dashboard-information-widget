import {getData, postData, putData} from '@pepfar-react-lib/http-tools';
import sanitize from '../../shared/services/sanitize.service';
import getContentUrl, { getWidgetId } from './contentUrl.service';

const config = require('../../../config/config.json');

export function fetchContent() {
    return getData(getContentUrl())
        .then((resp) => resp.body)
        .then(sanitize);
}

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

export function saveContent(content) {
    return putData(getContentUrl(), { body: content }).catch(async (resp) => {
        await postData(getContentUrl(), { body: content });
        let widgetId = getWidgetId();
        let widgetUid = await getKeyUid(widgetId);
        return shareKey(widgetUid, 'r-------');
    });
}
