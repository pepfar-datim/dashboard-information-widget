import {initServerSettings, mockContent, setUpComponent} from "../shared.testServices";
import {readFileSync} from "fs";
import {screen} from "@testing-library/react";
import {Index} from "../../modules/main/components/index.component";
import {debug} from "@pepfar-react-lib/testwrap";
import {clickByText} from "@pepfar-react-lib/testwrap/jsbuild";

let widgetContent:string = readFileSync(`${__dirname}/serverResponseSubMenuCss.html`).toString();

const checkStyle = (selector:string,property:string,value:string)=>expect(getComputedStyle(document.querySelector(selector) as HTMLElement)[property]).toEqual(value)

test('8 > Nested sub-menu style',async ()=>{
    initServerSettings({
        superUserOnly: false,
        isSuperAdmin: true,
        onEditPage: false,
    })
    mockContent(widgetContent);
    await setUpComponent(<Index/>, ['Results','Targets']);
    checkStyle('.subMenu_0','font-weight','700')
    clickByText('Results')
    checkStyle('.subMenu_1','color','red')
})