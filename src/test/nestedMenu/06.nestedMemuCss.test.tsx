import {initServerSettings, mockContent, setUpComponent} from "../shared.testServices";
import {readFileSync} from "fs";
import {screen} from "@testing-library/react";
import {Index} from "../../modules/main/components/index.component";
import {debug} from "@pepfar-react-lib/testwrap";

let widgetContent:string = readFileSync(`${__dirname}/serverResponseCss.html`).toString();

test('5 > Nested menu',async ()=>{
    initServerSettings({
        superUserOnly: false,
        isSuperAdmin: true,
        onEditPage: false,
    })
    mockContent(widgetContent);
    await setUpComponent(<Index/>, ['Results','Targets']);
    expect(getComputedStyle(document.querySelector('[id*="nestedMenu"]') as HTMLElement).height).toEqual('200px')
    expect(getComputedStyle(screen.getByText('Results').parentElement as HTMLElement)['font-weight']).toEqual('500')
})