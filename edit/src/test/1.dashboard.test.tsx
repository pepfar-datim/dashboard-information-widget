import {MapOf} from "./test.types.ts"

export function mockFetch(urlList:MapOf<object>):void{
    //@ts-expect-error global not defined
    global.fetch = vitest.fn().mockImplementation((url:string)=>{
        console.log(url,'\n\n')
        if (!urlList[url]) throw new Error(`URL is not mocked ${url}`)
        return Promise.resolve({json:()=>urlList[url]})
    })
}

test(`1 > Dashboard test`, async ()=>{

})