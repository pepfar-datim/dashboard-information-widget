import {initServerSettings, mockContent, setUpComponent} from "../shared.testServices";
import {readFileSync} from "fs";
import {clickByText, noTexts, texts} from "@pepfar-react-lib/testwrap/jsbuild";
import {Index} from "../../modules/main/components/index.component";

let widgetContent:string = readFileSync(`${__dirname}/multipleMenus.html`).toString();

test('7 > Multiple menus',async ()=>{
    initServerSettings({
        superUserOnly: false,
        isSuperAdmin: true,
        onEditPage: false,
    })
    mockContent(widgetContent);
    await setUpComponent(<Index/>, ['Uganda']);
    texts([
        'Analytics Links',
        'Targets',
        'Uganda',
        'Paraguay',
        'Results',
        'Vaccinations'
    ])
    noTexts([
        'Vaccinated',
        'Cured',
        'FY22',
        'Mexico'
    ])
    clickByText('Uganda');
    texts(['Vaccinated','Cured']);
})