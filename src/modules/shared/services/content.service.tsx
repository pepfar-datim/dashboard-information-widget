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
    const { dataStoreKeyUidSqlView, datastoreNamespace } = config;
    const params = {
        var: [`namespace:${datastoreNamespace}`, `key:${namespaceKey}`],
    };
    const keyUidReq = await api.get(
        `/sqlViews/${dataStoreKeyUidSqlView}/data?${formatParams(params)}`
    );
    const result = keyUidReq.listGrid.rows;
    if (result.length && result[0].length) {
        return result[0][0];
    } else {
        throw new Error(
            `Could not find datstore key ${namespaceKey} in namespace ${datastoreNamespace}`
        );
    }
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
