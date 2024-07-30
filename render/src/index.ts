import {fetchContent} from "./main/fetchContent.service.ts";
import {sanitizeContent} from "../../shared/sanitizeContent.service.ts";
import {render} from "./main/render.service.ts";
import {addEditButton} from "./main/editButton/addEditButton.service.ts";
import fetchAllowedUrls from "../../shared/fetchAllowedUrls.service.ts";


(async ()=>{
    const rawContent:string = await fetchContent() || '<h3>New Dashboard Information widget</h3>'
    const allowedUrls: string[] = await fetchAllowedUrls()
    const safeContent = sanitizeContent(rawContent, allowedUrls)
    await render(safeContent)
    addEditButton()
})()
