import {render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import {registerGetMock} from "@pepfar-react-lib/datim-api";
import {ReactElement} from "react";
import {pause, textsWait, textWait} from "@pepfar-react-lib/testwrap";
import {editor, test_contentHandle} from "../modules/edit/edit.component";
import {Index} from "../modules/main/components/index.component";

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
    await setUpComponent(<Index/>, ['New Dashboard Information widget']);
}

export async function gotoEdit(){
    window.location.hash = '#/textEdit';
    render(<Index/>);
    await textWait("Documentation for the Dashboard Information widget can be found here.");
    await waitFor(() => {
        expect(document.querySelector('[contenteditable="true"]')).toBeInTheDocument()
    })
}

export async function setEditorValue(value:string){
    editor.value = value;
    await textWait(value);
    await pause(1000)
    await waitFor(()=>{
        expect(test_contentHandle.includes(value)).toBeTruthy();
    })
}