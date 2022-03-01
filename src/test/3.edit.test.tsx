import {click, textsWait} from "@pepfar-react-lib/jest-tools";
import {gotoEdit, mockContent, mockNoContent, ServerSettings, setEditorValue} from "./shared.testServices";
import {registerSendMock} from "@pepfar-react-lib/http-tools";

const serverSettings:ServerSettings = {
    superUserOnly: false,
    isSuperAdmin: true,
    onEditPage: true,
};

test(`Edit & Save`, async ()=>{
    console.warn('TESTING EDIT AND SAVE 1')
    mockNoContent();
    console.warn('TESTING EDIT AND SAVE 2');
    await gotoEdit(serverSettings);
    console.warn('TESTING EDIT AND SAVE 99');
    console.log('hash: ', window.location.href)
    setEditorValue('hello world');
    let putData = registerSendMock("PUT",'/dataStore/dashboard-information/testDashboardId1',{"httpStatus":"Created","httpStatusCode":201,"status":"OK"});
    click('save-button');
    await putData.then((data)=>{
        expect(data).toStrictEqual({body:"<p>hello world</p>"})
    })
    mockContent("<p>hello world</p>")
    await textsWait(["Content saved","hello world"])
})