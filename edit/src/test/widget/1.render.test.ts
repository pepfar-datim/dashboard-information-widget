import {initDom, MapOf, mockFetch} from "../test.service.ts";
import {screen} from '@testing-library/dom'
import {expect} from "vitest";

const dataStore:MapOf<object> = {
    '/api/dataStore/dashboard-information/WidgetId': {
        "body": "Widget content"
    }
}

test(`1 > Render Editor`, async ()=>{
    mockFetch(dataStore)
    initDom()
    await import('../../index.ts')
    screen.getByText('Widget content')
    const documentationLink = screen.getByText('Documentation for the Dashboard Information widget can be found here.')
    expect(documentationLink.getAttribute('href')).toBe('https://github.com/pepfar-datim/dashboard-information-widget')

})