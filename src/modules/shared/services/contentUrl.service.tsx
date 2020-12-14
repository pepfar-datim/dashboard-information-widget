const config = require('../../../config/config.json');

export function getWidgetId() {
    return window.location.search.replace('?dashboardItemId=', '');
}

export default function getContentUrl() {
    return `/dataStore/${config.datastoreNamespace}/${getWidgetId()}`;
}
