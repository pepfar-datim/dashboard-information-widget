import {initServerSettings, mockNoContent, renderWidget, ServerSettings,} from "./shared.testServices";
import {text} from "@pepfar-react-lib/testwrap";
import {noText} from "@pepfar-react-lib/testwrap/jsbuild";

type TestCase = {
    name: string;
    serverSettings: ServerSettings;
    buttonVisible: boolean;
}

const testCases:TestCase[] = [{
//     name: 'Edit button is not visible outside of Edit page',
//     serverSettings: {
//         superUserOnly: false,
//         isSuperAdmin: true,
//         onEditPage: false,
//     },
//     buttonVisible: false,
// },{
//     name: 'Super-User can see button',
//     serverSettings: {
//         superUserOnly: false,
//         isSuperAdmin: true,
//         onEditPage: true,
//     },
//     buttonVisible: true,
// },{
//     name: 'Non-super-user can see button',
//     serverSettings: {
//         superUserOnly: false,
//         isSuperAdmin: false,
//         onEditPage: true,
//     },
//     buttonVisible: true,
// },{
    name: 'Non-super-user can\'t see button',
    serverSettings: {
        superUserOnly: true,
        isSuperAdmin: false,
        onEditPage: true,
    },
    buttonVisible: false,
}]

testCases.forEach(({name,serverSettings, buttonVisible}:TestCase)=>{
    test(name,async ()=>{
        initServerSettings(serverSettings)
        mockNoContent();
        await renderWidget();
        if (buttonVisible) text('Edit')
        else noText('Edit');
    })
})