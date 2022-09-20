import {gotoEdit, mockContent, mockNoContent, ServerSettings, setEditorValue} from "./shared.testServices";
import {registerSendMock} from "@pepfar-react-lib/datim-api";
import {click} from "@pepfar-react-lib/testwrap";
import {textsWait} from "@pepfar-react-lib/testwrap/jsbuild";

const serverSettings:ServerSettings = {
    superUserOnly: false,
    isSuperAdmin: true,
    onEditPage: true,
};

test(`Edit & Save`, async ()=>{
    mockNoContent();
    await gotoEdit(serverSettings);
    setEditorValue('hello world');
    let putData = registerSendMock('/dataStore/dashboard-information/testDashboardId1',{"httpStatus":"Created","httpStatusCode":201,"status":"OK"});
    click('save-button');
    await putData.then((data)=>{
        expect(data).toStrictEqual({body:"<p>hello world</p>"})
    })
    mockContent("<p>hello world</p>")
    await textsWait(["Content saved","hello world"])
})