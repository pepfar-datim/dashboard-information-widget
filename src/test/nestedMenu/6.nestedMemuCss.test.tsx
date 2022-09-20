import {initServerSettings, mockContent, setUpComponent} from "../shared.testServices";
import AccessWrapper from "../../modules/main/components/accessWrapper.component";
import {readFileSync} from "fs";
import {screen} from "@testing-library/react";
import RouterWrapper from "../../modules/main/components/routerWrapper.component";

let widgetContent:string = readFileSync(`${__dirname}/serverResponseCss.html`).toString();

test('5 > Nested menu',async ()=>{
    initServerSettings({
        superUserOnly: false,
        isSuperAdmin: true,
        onEditPage: false,
    })
    mockContent(widgetContent);
    await setUpComponent(<AccessWrapper><RouterWrapper/></AccessWrapper>, ['Results','Targets']);
    // @ts-ignore
    expect(getComputedStyle(document.querySelector('[id*="nestedMenu"]')).height).toEqual('200px')
    expect(getComputedStyle(screen.getByText('Results')).fontWeight).toEqual('500')
})