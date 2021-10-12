import {clickTest, ClickTestScenario, setUpComponent} from "@pepfar-react-lib/jest-tools";
import {initServerSettings, ServerSettings} from "./shared.testServices";
import AccessWrapper from "../modules/main/components/accessWrapper.component";

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
        initServerSettings(serverSettings);
        await setUpComponent(<AccessWrapper/>, ['New Dashboard Information widget']);
        await clickTest(scenario);
    })
})