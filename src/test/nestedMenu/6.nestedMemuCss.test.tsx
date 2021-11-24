import {initServerSettings, mockContent} from "../shared.testServices";
import {setUpComponent} from "@pepfar-react-lib/jest-tools";
import AccessWrapper from "../../modules/main/components/accessWrapper.component";
import {readFileSync} from "fs";
import {screen} from "@testing-library/react";

let widgetContent:string = readFileSync(`${__dirname}/serverResponseCss.html`).toString();

test('5 > Nested menu',async ()=>{
    initServerSettings({
        superUserOnly: false,
        isSuperAdmin: true,
        onEditPage: false,
    })
    mockContent(widgetContent);
    await setUpComponent(<AccessWrapper/>, ['Results','Targets']);
    // @ts-ignore
    expect(getComputedStyle(document.querySelector('[id*="nestedMenu"]')).height).toEqual('200px')
    expect(getComputedStyle(screen.getByText('Results')).fontWeight).toEqual('500')
})