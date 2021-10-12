import {clickTest, ClickTestScenario, debug, pause, setUpComponent} from "@pepfar-react-lib/jest-tools";
import {gotoEdit, initServerSettings, ServerSettings} from "./shared.testServices";
import AccessWrapper from "../modules/main/components/accessWrapper.component";

import {waitFor, fireEvent, screen} from "@testing-library/react";

type TestCase = {
    name: string;
    serverSettings: ServerSettings;
    scenario: ClickTestScenario;
}

let testCases:TestCase[] = [{
    name: 'Basic Edit',
    serverSettings: {
        superUserOnly: false,
        isSuperAdmin: true,
        onEditPage: true,
    },
    scenario: [{
        target: {
            id: 'edit-button'
        },
        result: {
            texts:["Documentation for the Dashboard Information widget can be found here."]
        }
    }]
}]

testCases.forEach(({name,serverSettings, scenario}:TestCase)=>{
    test(`Edit Test > ${name}`, async ()=>{
        await gotoEdit(serverSettings);
        debug();
        // console.log(document.querySelector('[contenteditable="true"]'))
        // fireEvent.change(document.querySelector('[contenteditable="true"]') as Element, { target: { value: 'hello world' } })
        // await pause(1);
    })
})