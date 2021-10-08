import {noText, setUpComponent, text} from "@pepfar-react-lib/jest-tools";
import AccessWrapper from "../modules/main/components/accessWrapper.component";
import {initServerSettings, ServerSettings,} from "./shared.testServices";

type TestCase = {
    name: string;
    serverSettings: ServerSettings;
    buttonVisible: boolean;
}

const testCases:TestCase[] = [{
    name: 'Edit button is not visible outside of Edit page',
    serverSettings: {
        superUserOnly: false,
        isSuperAdmin: true,
        onEditPage: false,
    },
    buttonVisible: false,
},{
    name: 'Super-User can see button',
    serverSettings: {
        superUserOnly: false,
        isSuperAdmin: true,
        onEditPage: true,
    },
    buttonVisible: true,
},{
    name: 'Non-super-user can see button',
    serverSettings: {
        superUserOnly: false,
        isSuperAdmin: false,
        onEditPage: true,
    },
    buttonVisible: true,
}]

testCases.forEach(({name,serverSettings, buttonVisible}:TestCase)=>{
    test(name,async ()=>{
        initServerSettings(serverSettings)
        await setUpComponent(<AccessWrapper/>, ['New Dashboard Information widget']);
        if (buttonVisible) text('Edit')
        else noText('Edit');
    })
})