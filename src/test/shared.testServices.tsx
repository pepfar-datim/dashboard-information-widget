import AccessWrapper from "../modules/main/components/accessWrapper.component";
import {waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import { registerGetMock } from "@pepfar-react-lib/datim-api";
import {click,text} from "@pepfar-react-lib/testwrap"
import {ReactElement} from "react";
import {render} from "@testing-library/react";
import {pause} from "@pepfar-react-lib/testwrap";
import {screen} from "@testing-library/react";
import {debug, textsWait, textWait} from "@pepfar-react-lib/testwrap";
import RouterWrapper from "../modules/main/components/routerWrapper.component";

export function dataStoreExists(value:boolean){
    registerGetMock('/dataStore/dashboard-information',value?["configuration"]:{status: 'ERROR'});
}

function isSuperUser(value:boolean){
    registerGetMock('/me?fields=userCredentials[userRoles[name,id]]',{"userCredentials":{"userRoles":value?[{"name":"Superuser ALL authorities","id":"jtzbVV4ZmdP"}]:[]}});
}

function superUserOnly(value:boolean){
    registerGetMock('/dataStore/dashboard-information/configuration',{"Only open to superusers":value});
}

function onEditPage(value:boolean){
    window.location.hash = value?'#/edit':''
}

function systemInfo(){
    registerGetMock('/system/info',{version:"2.36.4-SNAPSHOT"});
}

export type ServerSettings = {
    superUserOnly: boolean,
    isSuperAdmin: boolean,
    onEditPage: boolean,
}

export function initServerSettings(serverSettings:ServerSettings){
    dataStoreExists(true);
    isSuperUser(serverSettings.isSuperAdmin);
    superUserOnly(serverSettings.superUserOnly);
    onEditPage(serverSettings.onEditPage);
    systemInfo();
}

export function mockNoContent(){
    registerGetMock('/dataStore/dashboard-information/testDashboardId1',{status: 'ERROR'});
}

export function mockContent(body:string){
    registerGetMock('/dataStore/dashboard-information/testDashboardId1',{body});
}

async function loadingDone(sec?:number):Promise<any>{
    await pause(0.2);
    if (screen.queryAllByTestId('loading').length===0) return Promise.resolve();
    return waitForElementToBeRemoved(() => screen.queryAllByTestId('loading'));
}

export async function setUpComponent(component:ReactElement, toContain: string[]){
    render(component);
    await loadingDone();
    await textsWait(toContain);
}

export async function renderWidget(){
    await setUpComponent(<AccessWrapper><RouterWrapper/></AccessWrapper>, ['New Dashboard Information widget']);
}

export async function gotoEdit(/*serverSettings:ServerSettings*/){
    window.location.hash = '#/textEdit';
    render(<AccessWrapper><RouterWrapper/></AccessWrapper>);
    await textWait("Documentation for the Dashboard Information widget can be found here.");
    await waitFor(() => {
        expect(document.querySelector('[contenteditable="true"]')).toBeInTheDocument()
    })
}

export async function setEditorValue(value:string){
    // @ts-ignore
    window.editor.value = value;
    await textWait(value);
    await pause(1000)
}