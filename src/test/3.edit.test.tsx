import {click, pause} from "@pepfar-react-lib/jest-tools";
import {gotoEdit, ServerSettings, setEditorValue} from "./shared.testServices";

import {fireEvent} from "@testing-library/react";
import {registerSendMock} from "@pepfar-react-lib/http-tools";

type TestCase = {
    name: string;
    serverSettings: ServerSettings;
}

let testCases:TestCase[] = [{
    name: 'Basic Edit',
    serverSettings: {
        superUserOnly: false,
        isSuperAdmin: true,
        onEditPage: true,
    },
}]



testCases.forEach(({name,serverSettings}:TestCase)=>{
    test(`Edit Test > ${name}`, async ()=>{
        await gotoEdit(serverSettings);
        // await pause(1);
        setEditorValue('hello world');
        let putData = registerSendMock("PUT",'/dataStore/dashboard-information/testDashboardId1',{"httpStatus":"Created","httpStatusCode":201,"status":"OK"});
        click('save-button');
        await putData.then((data)=>{
            expect(data).toStrictEqual({"body":"<p>hello world</p>"})
        })
    })
})