import api from './api.service';

const config = require('../../../config/config.json');

const sqlView = {
    name: 'Data Store Key UID',
    id: config.dataStoreKeyUidSqlView,
    sqlQuery:
        // eslint-disable-next-line no-template-curly-in-string
        "select uid\n  from keyjsonvalue\n  where namespace = '${namespace}'\n    and namespacekey = '${key}';",
    displayName: 'Data Store Key UID',
    publicAccess: 'r-------',
    type: 'QUERY',
};

export default async function importSqlViewIfMissing() {
    // Check if sqlView exists
    const getSqlViewData = await api.get(
        `/sqlViews?filter=id:eq:${sqlView.id}`
    );
    if (getSqlViewData.sqlViews.length) {
        return true;
    } else {
        console.log(`SQL View ${sqlView.id} not found, attempting to import`);
        try {
            const postSqlViewReq = await api.post('/sqlViews', sqlView);
            console.log(
                `Successfully imported sqlView ${sqlView.id} (${postSqlViewReq.httpStatusCode})`
            );
            return true;
        } catch (e) {
            console.error(`Error importing sqlView ${sqlView.id}`);
            return false;
        }
    }
}
