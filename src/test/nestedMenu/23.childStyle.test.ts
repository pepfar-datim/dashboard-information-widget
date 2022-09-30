import {parseStyle} from "../../modules/nestedMenu/services/createStyleElement";

type TestCase = {
    input:string;
    output:string|null;
}

const testCases:TestCase[] = [{
    input: `Targets {font-size: 20px}:`,
    output: `font-size: 20px`
},{
    input: `Targets{font-size: 20px} : `,
    output: `font-size: 20px`
},{
    input: `Targets{font-size: 20px:`,
    output: null
},{
    input: `Targets{}:`,
    output: null
},{
    input: `~!@#$%^     &*()`,
    output: null
}]

testCases.forEach(({input,output})=>test(`23 > child style > ${input}`,()=>{
    expect(parseStyle(input)).toBe(output)
}))