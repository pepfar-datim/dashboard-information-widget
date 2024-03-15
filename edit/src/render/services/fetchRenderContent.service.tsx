type DataStoreResponse = {
    body: string;
}
export async function fetchRenderContent():Promise<string>{
    const widgetId:string = window.location.search.replace('?dashboardItemId=','')
    const response:DataStoreResponse = await fetch(`/api/dataStore/dashboard-information/${widgetId}`).then(res=>res.json())
    return response.body
}