const testHtml: Record<string, string> = {
    basic: '<h1>Cypress Test</h1>',
    nestedMenu: `
    <pre type="nestedMenu">
        Hello:
            Its:
                Me: /dhis-web-datastore/index.html
            I was wondering:
                If after all these years: https://support.google.com/a/users/answer/9282720?hl=en
        World:
            What a Wonderful:
                I see trees:
                    Of green: https://simple.wikipedia.org/wiki/Green
                    Red roses too: https://www.simplemost.com/why-red-roses-valentines-day-romance/
                I see skies:
                    Of blue: https://www.youtube.com/watch?v=nB-xqDZbEVQ
                    Clouds of white: https://en.wikipedia.org/wiki/White_Cloud_Mountains
                I hear babies:
                    Cry:
                        Real: https://www.youtube.com/watch?v=oL2B-AAnsHo
                        Fake: https://www.youtube.com/watch?v=A7tl_O48gto
                    Watch them grow: https://www.youtube.com/watch?v=uSOOO3KBKDY
    </pre>
    `,
    dirtyContentTags: `
    <div>
        <h1 id="testHeading">Clean heading</h1>
        <script>alert('Removed')</script>
        <style>#testHeading {background-color: red;}</style>
    </div>
    `,
    dirtyContentIframes: `
    <h1>Clean heading</h1>
    <iframe src="https://www.youtube.com/watch?v=r1cyh5FIRdw"></iframe>
    <iframe src="https://highly.suspicious.com"></iframe>
    `
}

export default testHtml;