import {initServerSettings, mockContent, mockNoContent} from "../shared.testServices";
import {debug, noText, pause, setUpComponent, text} from "@pepfar-react-lib/jest-tools";
import AccessWrapper from "../../modules/main/components/accessWrapper.component";
import {readFileSync} from "fs";

let widgetContent:string = readFileSync(`${__dirname}/serverResponse.html`).toString();

test('5 > Nested menu',async ()=>{
    initServerSettings({
        superUserOnly: false,
        isSuperAdmin: true,
        onEditPage: false,
    })
    mockContent(widgetContent);
    await setUpComponent(<AccessWrapper/>, []);
    await pause(1)
    debug();
})