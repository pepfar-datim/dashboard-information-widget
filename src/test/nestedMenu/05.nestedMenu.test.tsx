import {initServerSettings, mockContent, setUpComponent} from "../shared.testServices";
import AccessWrapper from "../../modules/main/components/accessWrapper.component";
import {readFileSync} from "fs";
import RouterWrapper from "../../modules/main/components/routerWrapper.component";
import {clickByText, texts} from "@pepfar-react-lib/testwrap/jsbuild";

let widgetContent:string = readFileSync(`${__dirname}/serverResponse.html`).toString();

test('5 > Nested menu',async ()=>{
    initServerSettings({
        superUserOnly: false,
        isSuperAdmin: true,
        onEditPage: false,
    })
    mockContent(widgetContent);
    await setUpComponent(<AccessWrapper><RouterWrapper/></AccessWrapper>, ['Results','Targets']);

    // Tree 1
    clickByText('Results');
    clickByText('Prevention');
    texts(['VMMC_CIRC','AGYW_PREV','PrEP_NEW']);
    clickByText('VMMC_CIRC');
    texts(['Age/sex','Age/Sex/HIVstatus'])

    // Tree 2
    clickByText('Testing');
    texts(['HTS_TST Topline Numerator'])
})