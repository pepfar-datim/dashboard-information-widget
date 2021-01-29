import api, { formatParams } from '../../shared/services/api.service';
import sanitize from '../../shared/services/sanitize.service';
import getContentUrl, { getWidgetId } from './contentUrl.service';

const config = require('../../../config/config.json');

export function fetchContent() {
    return api
        .get(getContentUrl())
        .then((resp) => resp.body)
        .then(sanitize);
}

export async function getKeyUid(namespaceKey) {
    const { datastoreNamespace } = config;
    const namespaceKeyMeta = await api.get(`/dataStore/${datastoreNamespace}/${namespaceKey}/metadata`);
    return namespaceKeyMeta.id;
}

export async function shareKey(keyUid, publicAccess) {
    const params = { type: 'dataStore', id: keyUid };
    const currentSharingReq = await api.get(`/sharing?${formatParams(params)}`);
    const currPublicAccess = currentSharingReq.object.publicAccess;
    if (currPublicAccess !== publicAccess) {
        return api.post(`/sharing?${formatParams(params)}`, {
            object: {
                id: keyUid,
                publicAccess: publicAccess,
            },
        });
    }
}

export function saveContent(content) {
    return api.put(getContentUrl(), { body: content }).catch(async (resp) => {
        await api.post(getContentUrl(), { body: content });
        let widgetId = getWidgetId();
        let widgetUid = await getKeyUid(widgetId);
        return shareKey(widgetUid, 'r-------');
    });
}
