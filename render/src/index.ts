import {fetchContent} from "./main/fetchContent.service.ts";
import {sanitizeContent} from "../../shared/sanitizeContent.service.ts";
import {showMessages} from "../../shared/showMessages.service.ts";
import {render} from "./main/render.service.ts";
import {addEditButton} from "./main/editButton/addEditButton.service.ts";
import fetchAllowedIframeDomains from "../../shared/fetchAllowedIframeDomains.service.ts";

const testHtml = `
<pre type="nestedMenu">
Hello:
  Its:
    Me:
    Or is it:
  I was wondering:
    If after all these years: https://support.google.com/a/users/answer/9282720?hl=en
World:
  What a Wonderful:
    I see trees:
      Of green: https://simple.wikipedia.org/wiki/Green
      Red roses too: https://www.simplemost.com/why-red-roses-valentines-day-romance/
      SUP:
    I see skies:
      Of blue: https://www.youtube.com/watch?v=nB-xqDZbEVQ
      Clouds of white: https://en.wikipedia.org/wiki/White_Cloud_Mountains
    I hear babies:
      Cry:
        Real: https://www.youtube.com/watch?v=oL2B-AAnsHo
        Fake: https://www.youtube.com/watch?v=A7tl_O48gto
      Watch them grow: https://www.youtube.com/watch?v=uSOOO3KBKDY
</pre>
`;

(async ()=>{
    const rawContent:string = await fetchContent() || testHtml
    const allowedIframeDomains: string[] = await fetchAllowedIframeDomains()
    const [safeContent, msgs] = sanitizeContent(rawContent, allowedIframeDomains)
    showMessages(msgs)
    await render(safeContent)
    addEditButton()
})()
