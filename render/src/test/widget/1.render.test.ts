import {initDom, MapOf, mockFetch} from "../test.service.ts";
import {screen} from '@testing-library/dom'

const dataStore:MapOf<object> = {
    '/api/dataStore/dashboard-information': [
        'configuration',
        'WidgetId'
    ],
    '/api/dataStore/dashboard-information/configuration': {
        'Allowed iframe domains': ['https://www.youtube.com/']
    },
    '/api/dataStore/dashboard-information/WidgetId': {
        "body": "Widget content"
    }
}

test(`1 > Render Widget`, async ()=>{
    mockFetch(dataStore)
    initDom()
    await import('../../index.ts')
    // Wait for requests and dom to update
    await new Promise((resolve)=>setTimeout(resolve, 100))
    screen.getByText('Widget content')
})