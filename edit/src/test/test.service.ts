import { readFileSync } from 'fs';

export type MapOf<T> = {[key:string]:T}
export function mockFetch(urlList:MapOf<object>):void{
    global.fetch = vitest.fn().mockImplementation((url:string)=>{
        console.log('mocking url', url)
        if (!urlList[url]) throw new Error(`URL is not mocked ${url}`)
        return Promise.resolve({json:()=>urlList[url]})
    })
}

export function initDom():void{
    const index:string = readFileSync('./index.html').toString()
    const body:string = /<body>.+<\/body>/s.exec(index)![0].replace(/<script.+?script>/, '')
    document.body.innerHTML = body
    window.location.search = '?dashboardItemId=WidgetId'
}