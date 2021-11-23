import {extractStyle} from "../../modules/shared/services/content.service";

type TestScenario = {
    input: string;
    output: string|null;
}

const testScenarios: TestScenario[]=[{
    input: '<pre type="nestedMenu">pre content</pre>',
    output: null
},{
    input: '<pre type="nestedMenu" data-style="border: 1px solid black;">pre content</pre>',
    output: 'border: 1px solid black;'
},{
    input: '<pre data-style="border: 1px solid black;" type="nestedMenu">pre content</pre>',
    output: 'border: 1px solid black;'
},{
    input: "<pre data-style='border: 1px solid black;' type='nestedMenu'>pre content</pre>",
    output: 'border: 1px solid black;'
},{
    input: "<pre type='nestedMenu' data-style='border: 1px solid black;'>pre content</pre>",
    output: 'border: 1px solid black;'
}]

testScenarios.forEach((scenario:TestScenario)=>{
    test(`Extract Style > ${scenario.input}`,()=>{
        expect(extractStyle(scenario.input)).toStrictEqual(scenario.output)
    });
})