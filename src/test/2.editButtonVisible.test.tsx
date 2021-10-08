import {noText, setUpComponent, text} from "@pepfar-react-lib/jest-tools";
import AccessWrapper from "../modules/main/components/accessWrapper.component";
import {registerGetMock} from "@pepfar-react-lib/http-tools";
import {
    dataStoreExists,
    isSuperUser,
    onEditPage, initServerSettings,
    ServerSettings,
    superUserOnly,
    systemInfo
} from "./shared.testServices";

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
}]

testCases.forEach(({name,serverSettings, buttonVisible}:TestCase)=>{
    test(name,async ()=>{
        initServerSettings(serverSettings)
        await setUpComponent(<AccessWrapper/>, ['New Dashboard Information widget']);
        if (buttonVisible) text('Edit')
        else noText('Edit');
    })
})