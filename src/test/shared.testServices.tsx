import {registerGetMock} from "@pepfar-react-lib/http-tools";
import {clickTest, ClickTestScenario, setUpComponent} from "@pepfar-react-lib/jest-tools";
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
    if (value) window.location.hash += 'edit';
}

function systemInfo(){
    registerGetMock('/system/info',{version:"2.36.4-SNAPSHOT"});
}

export type ServerSettings = {
    superUserOnly: boolean,
    isSuperAdmin: boolean,
    onEditPage: boolean,
}

function dashboardId(){
    let connector = window.location.hash.includes('?')?'&':'?';
    window.location.hash += connector + 'dashboardItemId=testDashboardId1'
}

export function initServerSettings(serverSettings:ServerSettings){
    dataStoreExists(true);
    isSuperUser(serverSettings.isSuperAdmin);
    superUserOnly(serverSettings.superUserOnly);
    onEditPage(serverSettings.onEditPage);
    dashboardId();
    systemInfo();
}

let gotoEditScenario:ClickTestScenario = [{
    target: {
        id: 'edit-button'
    },
    result: {
        texts:["Documentation for the Dashboard Information widget can be found here."]
    }
}]

export async function gotoEdit(serverSettings:ServerSettings){
    initServerSettings(serverSettings);
    await setUpComponent(<AccessWrapper/>, ['New Dashboard Information widget']);
    await clickTest(gotoEditScenario);
    await waitFor(() => {
        expect(document.querySelector('[contenteditable="true"]')).toBeInTheDocument()
    })
    
}