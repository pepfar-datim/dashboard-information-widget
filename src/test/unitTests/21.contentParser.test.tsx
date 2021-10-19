import {ContentItem, extractSwifterCode} from "../../modules/shared/services/content.service";

type TestCase = {
    name: string;
    dataStore:string;
    output: ContentItem[]
}


const testCases:TestCase[] = [{
    name: 't<s>t<s>t',
    dataStore: "intro<pre type='swifter'>swifter1</pre>midsection<pre type='swifter'>swifter2</pre>end",
    // @ts-ignore
    output: ['intro',"<pre type='swifter'>swifter1</pre>",'midsection',"<pre type='swifter'>swifter2</pre>",'end']
}]

testCases.forEach(({name, dataStore, output})=> {
    test(`Extract swifter code | ${name}`, () => {
        let parsed:ContentItem[] = extractSwifterCode(dataStore);
        parsed.forEach((item:ContentItem,i:number)=>{
            if (typeof item ==='string') expect(item).toBe(output[i]);
        });
    })
});