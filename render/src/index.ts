import {fetchContent} from "./main/fetchContent.service.ts";
import {sanitizeContent} from "../../shared/sanitizeContent.service.ts";
import {render} from "./main/render.service.ts";
import {addEditButton} from "./main/editButton/addEditButton.service.ts";
import fetchAllowedIframeDomains from "../../shared/fetchAllowedIframeDomains.service.ts";


(async ()=>{
    const rawContent:string = await fetchContent() || '<h3>New Dashboard Information widget</h3>'
    const allowedIframeDomains: string[] = await fetchAllowedIframeDomains()
    const safeContent = sanitizeContent(rawContent, allowedIframeDomains)
    await render(safeContent)
    addEditButton()
})()
