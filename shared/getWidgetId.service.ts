export function getWidgetId():string{
    return window.location.search.replace('?dashboardItemId=', '')
}