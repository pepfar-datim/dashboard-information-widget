import {isTestEnv} from "@pepfar-react-lib/http-tools";

const config = require('../../../config/config.json');

export function getWidgetId():string|null{
    if (isTestEnv()) return 'testDashboardId1';
    if (process.env.NODE_ENV === 'development') return 'devDashUid1';
    let re = window.location.search.match(/(\?|&)dashboardItemId=([^&]*)/);
    return re&&re[2];
}

export default function getContentUrl() {
    return `/dataStore/${config.datastoreNamespace}/${getWidgetId()}`;
}
