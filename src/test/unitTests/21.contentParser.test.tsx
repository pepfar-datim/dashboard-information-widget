import {
    ContentItem,
    ContentItemType,
    parseContent
} from "../../modules/shared/services/content.service";

type TestCase = {
    name: string;
    dataStore:string|null;
    output: ContentItem[]
}

function txt(t:string):ContentItem{
    return {body:t, type: ContentItemType.string}
}

function sft(t:string):ContentItem{
    return {body:t, type: ContentItemType.sifter}
}

const testCases:TestCase[] = [{
    name: 't',
    dataStore: "intro end",
    output: [txt('intro end')]
},{
    name: 't<s>',
    dataStore: "intro<pre type='swifter'>swifter1</pre>",
    output: [txt('intro'),sft("<pre type='swifter'>swifter1</pre>")]
},{
    name: '<s>',
    dataStore: "<pre type='swifter'>swifter1</pre>",
    output: [sft("<pre type='swifter'>swifter1</pre>")]
},{
    name: '<s>t',
    dataStore: "<pre type='swifter'>swifter1</pre>end",
    output: [sft("<pre type='swifter'>swifter1</pre>"), txt("end")]
},{
    name: 't<s>t<s>t',
    dataStore: "intro<pre type='swifter'>swifter1</pre>midsection<pre type='swifter'>swifter2</pre>end",
    output: [txt('intro'),sft("<pre type='swifter'>swifter1</pre>"),txt('midsection'),sft("<pre type='swifter'>swifter2</pre>"),txt('end')]
},{
    name: 'error scenario',
    dataStore: '',
    output: []
},{
    name: 'error scenario',
    dataStore: null,
    output: []
}]

testCases.forEach(({name, dataStore, output})=> {
    test(`Extract swifter code | ${name}`, () => {
        let parsed:ContentItem[] = parseContent(dataStore as string);
        parsed.forEach((item:ContentItem,i:number)=>{
            if (typeof item ==='string') expect(item).toBe(output[i]);
        });
    })
});