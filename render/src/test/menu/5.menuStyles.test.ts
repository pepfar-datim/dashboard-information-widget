import {initDom, mockFetch} from "../test.service.ts";
import {screen} from '@testing-library/dom'
import {dataStore, explore} from "./menu.shared.ts";
import {expect} from "vitest";


test(`4 > Menu navigation`, async ()=>{
    mockFetch(dataStore)
    initDom()
    await import('../../index.ts')
    await explore('Data Analysis')
    await explore('Thematic Dashboards')
    expect(screen.getByText('Data Analysis').style.fontWeight).toBe("500")
    expect(screen.getByText('Thematic Dashboards').style.fontWeight).toBe("")
    expect(document.getElementById('subMenuRoot_0')!.style.height).toBe('200px')
})