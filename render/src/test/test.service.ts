export type MapOf<T> = {[key:string]:T}
export function mockFetch(urlList:MapOf<object>):void{
    global.fetch = vitest.fn().mockImplementation((url:string)=>{
        console.log('mocking url', url)
        if (!urlList[url]) throw new Error(`URL is not mocked ${url}`)
        return Promise.resolve({json:()=>urlList[url]})
    })
}

declare module globalThis {
    let NestedMenuGlobal:object;
}
export function initDom():void{
    globalThis.NestedMenuGlobal = {}
    document.body.innerHTML = `<div id="content"></div>`
    window.location.search = '?dashboardItemId=WidgetId'
}