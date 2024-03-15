import {initDom, mockFetch} from "../test.service.ts";
import {dataStore, explore} from "./menu.shared.ts";

test(`4 > Menu navigation`, async ()=>{
    mockFetch(dataStore)
    initDom()
    await import('../../index.ts')
    await explore('Data Analysis')
    await explore('Thematic Dashboards')
    await explore('COP22/FY23')
    await explore('Clinical Cascade ↗')
})