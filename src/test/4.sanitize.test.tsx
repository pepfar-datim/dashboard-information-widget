import React from "react";
import {setUpComponent} from "@pepfar-react-lib/jest-tools";
import Render from "../modules/render/render.component";
import {initServerSettings, mockContent, ServerSettings} from "./shared.testServices";
import {screen} from "@testing-library/react";

const serverSettings:ServerSettings = {
    superUserOnly: false,
    isSuperAdmin: true,
    onEditPage: false,
};

test(`Sanitize from JS inject`, async()=>{
    initServerSettings(serverSettings)
    mockContent('<div onclick="alert(\'js inject\')">js-inject-test</div>')
    await setUpComponent(<Render/>,['js-inject-test']);
    expect(screen.getByText('js-inject-test').getAttribute("onclick")).toBeNull();
});