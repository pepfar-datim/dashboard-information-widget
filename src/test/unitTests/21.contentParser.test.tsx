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

function sft(t:any):ContentItem{
    return {body:t, type: ContentItemType.sifter}
}

const swifterYaml1 = `Results: 
  Prevention: 
    VMMC_CIRC:
      Age/sex:
        fy2021q4: ejNtpN4WWZR
        fy2021q3: UoLR2HjERir 
      Age/Sex/HIVstatus: 
        fy2021q4: HejxzdAvACx
        fy2021q3: UylPMmXTft9 
    AGYW_PREV: 
      Age/Sex/Time/Completeness:
        fy2021q4: HSyxsguuxVa
        fy2021q2: CPF8gu5qKVj 
      EducationSupport:
        fy2021q4: iIKNiyYvTBO
        fy2021q2: Hmrc7jP3Uy9 
  Testing: 
    HTS_TST Topline Numerator:
      All Modalities:
        fy2021q4: ktTWwjAdDDA
    HTS_TST:
      KeyPop Facility: rpbGVAwtqxs
      KeyPop Community: phdeKRHOdcd `
const swifterJson1 = {
    "Results": {
        "Prevention": {
            "VMMC_CIRC": {
                "Age/sex": {
                    "fy2021q4": "ejNtpN4WWZR",
                    "fy2021q3": "UoLR2HjERir"
                },
                "Age/Sex/HIVstatus": {
                    "fy2021q4": "HejxzdAvACx",
                    "fy2021q3": "UylPMmXTft9"
                }
            },
            "AGYW_PREV": {
                "Age/Sex/Time/Completeness": {
                    "fy2021q4": "HSyxsguuxVa",
                    "fy2021q2": "CPF8gu5qKVj"
                },
                "EducationSupport": {
                    "fy2021q4": "iIKNiyYvTBO",
                    "fy2021q2": "Hmrc7jP3Uy9"
                }
            }
        },
        "Testing": {
            "HTS_TST Topline Numerator": {
                "All Modalities": {
                    "fy2021q4": "ktTWwjAdDDA"
                }
            },
            "HTS_TST": {
                "KeyPop Facility": "rpbGVAwtqxs",
                "KeyPop Community": "phdeKRHOdcd"
            }
        }
    }
};

const testCases:TestCase[] = [{
    name: 't',
    dataStore: "intro end",
    output: [txt('intro end')]
},{
    name: 't<s>',
    dataStore: `intro<pre type='swifter'>${swifterYaml1}</pre>`,
    output: [txt('intro'),sft(swifterJson1)]
},{
    name: '<s>',
    dataStore: `<pre type='swifter'>${swifterYaml1}</pre>`,
    output: [sft(swifterJson1)]
},{
    name: '<s>t',
    dataStore: `<pre type='swifter'>${swifterYaml1}</pre>end`,
    output: [sft(swifterJson1), txt("end")]
},{
    name: 't<s>t<s>t',
    dataStore: `intro<pre type='swifter'>${swifterYaml1}</pre>midsection<pre type='swifter'>${swifterYaml1}</pre>end`,
    output: [txt('intro'), sft(swifterJson1), txt('midsection'), sft(swifterJson1), txt('end')]
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
        expect(parsed).toStrictEqual(output);
    })
});