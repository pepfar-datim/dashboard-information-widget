
export async function fetchContent():Promise<string>{
    const widgetId = window.location.search.replace('?dashboardItemId=', '')
    const response = await fetch(`/api/dataStore/dashboard-information/${widgetId}`).then(res => res.json())
    return response.body
}