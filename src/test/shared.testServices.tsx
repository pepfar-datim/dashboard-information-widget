import {registerGetMock} from "@pepfar-react-lib/http-tools";
import {click, clickTest, ClickTestScenario, setUpComponent, text} from "@pepfar-react-lib/jest-tools";
import AccessWrapper from "../modules/main/components/accessWrapper.component";
import {waitFor} from "@testing-library/react";

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
    window.location.hash = value?'edit':''
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

export async function gotoEdit(serverSettings:ServerSettings){
    initServerSettings(serverSettings);
    await setUpComponent(<AccessWrapper/>, ['New Dashboard Information widget']);
    click('edit-button');
    text("Documentation for the Dashboard Information widget can be found here.");
    await waitFor(() => {
        expect(document.querySelector('[contenteditable="true"]')).toBeInTheDocument()
    })
}

export function setEditorValue(value:string){
    // @ts-ignore
    window.editor.value = value;
}