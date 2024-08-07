import {initDom, MapOf, mockFetch} from "../test.service.ts";
import {screen} from '@testing-library/dom'

const dataStore:MapOf<object> = {
    '../../../api/dataStore/dashboard-information': [
        'configuration',
        'WidgetId'
    ],
    '../../../api/dataStore/dashboard-information/configuration': {
        'Allowed iframe domains': ['https://www.youtube.com/']
    },
    '../../../api/dataStore/dashboard-information/WidgetId': {
        "body": `
            <script>console.log('test')</script>content
            <iframe src="https://www.youtube.com/allowed1"/>
            <iframe src="https://sus.com/"/>
            <iframe src="https://wierd.com">https://www.youtube.com/</iframe>
            <iframe other="https://www.youtube.com/" src="https://sus.com/"/>
            <iframe src="https://www.youtube.com/allowed2"></iframe><iframe src="https://notallowed.com"></iframe>
        `
    }
}

test(`2 > Sanitize Content`, async ()=>{
    mockFetch(dataStore)
    initDom()
    await import('../../index.ts')
    // Wait for requests and warning message to show then be
    // be replaced by actual content
    await new Promise((resolve)=>setTimeout(resolve, 10000))
    screen.getByText('content')
    expect(document.body.innerHTML).not.includes('console.log')
    expect(document.body.innerHTML).not.includes('https://wierd.com')
    expect(document.body.innerHTML).not.includes('https://sus.com/')
    expect(document.body.innerHTML).includes('https://www.youtube.com/allowed1')
    expect(document.body.innerHTML).includes('https://www.youtube.com/allowed2')
})