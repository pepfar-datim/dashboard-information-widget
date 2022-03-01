import {registerGetMock} from "@pepfar-react-lib/http-tools";
import {click, setUpComponent, text, disableLocation} from "@pepfar-react-lib/jest-tools";
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

function disableParentLocation(value: boolean) {
    delete window.parent.location;
    window.parent.location = {
        ancestorOrigins: undefined,
        hash: value ? 'edit' : '',
        host: '',
        hostname: '',
        href: `http://localhost/${value ? '#edit' : ''}`,
        origin: '',
        pathname: '',
        port: '',
        protocol: '',
        replace(url: string): void {},
        search: '',
        toString(): string {
            return '';
        },
        reload(forcedReload?: boolean): void {},
        assign: jest.fn(),
    };
}

function onEditPage(value:boolean) {
    disableLocation()
    window.location.href = 'http://localhost/'
    disableParentLocation(value);
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
    console.log(`location before: href: ${window.location.href}, hash: ${window.location.hash}`);
    console.log(`parent location before: href: ${window.parent.location.href}, hash: ${window.parent.location.hash}`);
    initServerSettings(serverSettings);
    console.log(`location after: href: ${window.location.href}, hash: ${window.location.hash}`);
    console.log(`parent location after: href: ${window.parent.location.href}, hash: ${window.parent.location.hash}`);
    window.location.hash = ''
    console.log(`location after after: href: ${window.location.href}, hash: ${window.location.hash}`);
    console.log(`parent location after after: href: ${window.parent.location.href}, hash: ${window.parent.location.hash}`);
    console.warn('TESTING EDIT AND SAVE 3');
    await setUpComponent(<AccessWrapper />, ['New Dashboard Information widget']);
    console.warn('TESTING EDIT AND SAVE 4');
    click('edit-button');
    text("Documentation for the Dashboard Information widget can be found here.");
    console.warn('TESTING EDIT AND SAVE 5');
    await waitFor(() => {
        expect(document.querySelector('[contenteditable="true"]')).toBeInTheDocument()
    })
    console.warn('TESTING EDIT AND SAVE 6');
}

export function setEditorValue(value:string){
    // @ts-ignore
    window.editor.value = value;
}