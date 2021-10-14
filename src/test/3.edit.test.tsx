import {click, debug, pause, textsWait} from "@pepfar-react-lib/jest-tools";
import {gotoEdit, mockContent, mockNoContent, ServerSettings, setEditorValue} from "./shared.testServices";

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
        mockNoContent();
        await gotoEdit(serverSettings);
        setEditorValue('hello world');
        let putData = registerSendMock("PUT",'/dataStore/dashboard-information/testDashboardId1',{"httpStatus":"Created","httpStatusCode":201,"status":"OK"});
        click('save-button');
        await putData.then((data)=>{
            expect(data).toStrictEqual({body:"<p>hello world</p>"})
        })
        mockContent("<p>hello world</p>")
        await textsWait(["Content saved","hello world"])
    })
})