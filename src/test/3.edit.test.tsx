import {click, pause} from "@pepfar-react-lib/jest-tools";
import {gotoEdit, ServerSettings} from "./shared.testServices";

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
        // @ts-ignore
        window.editor.value = 'hello world'
        await pause(1);
        let putData = registerSendMock("PUT",'/dataStore/dashboard-information/testDashboardId1',{"httpStatus":"Created","httpStatusCode":201,"status":"OK"}).then((data)=>{
            console.log(data);
            expect(data).toStrictEqual({"body":"<p>hello world</p>"})
        })
        click('save-button');
        await putData;
    })
})