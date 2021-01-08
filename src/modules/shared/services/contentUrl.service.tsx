const config = require('../../../config/config.json');

export function getWidgetId() {
    if (process.env.NODE_ENV === 'development') {
        return 'devDashUid1';
    } else {
        return window.location.search.replace('?dashboardItemId=', '');
    }
}

export default function getContentUrl() {
    return `/dataStore/${config.datastoreNamespace}/${getWidgetId()}`;
}
