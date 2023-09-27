import {gotoEdit, mockContent, mockNoContent, setEditorValue} from "./shared.testServices";
import {registerSendMock} from "@pepfar-react-lib/datim-api";
import {click} from "@pepfar-react-lib/testwrap";
import {textsWait} from "@pepfar-react-lib/testwrap/jsbuild";

test(`Edit & Save`, async ()=>{
    mockNoContent();
    await gotoEdit();
    await setEditorValue('hello world');
    const clearCacheResponse = {"httpStatus":"OK","httpStatusCode":204,"status":"OK"};
    let putData = registerSendMock('/dataStore/dashboard-information/testDashboardId1',{"httpStatus":"Created","httpStatusCode":201,"status":"OK"});
    let clearCache = registerSendMock('/maintenance/cache',clearCacheResponse).then((request)=>{
        expect(request).toStrictEqual(null);
    })
    click('save-button');
    await putData.then((data)=>{
        expect(data).toStrictEqual({body:"<p>hello world</p>"})
    })
   await clearCache;
    mockContent("<p>hello world</p>")
    await textsWait(["Content saved","hello world"])
})