import {fetchContent} from "./main/fetchContent.service.ts";
import {sanitizeContent} from "../../shared/sanitizeContent.service.ts";
import {render} from "./main/render.service.ts";
import {addEditButton} from "./main/editButton/addEditButton.service.ts";


(async ()=>{
    const rawContent:string = await fetchContent() || '<h3>New Dashboard Information widget</h3>'
    const safeContent = sanitizeContent(rawContent)
    await render(safeContent)
    addEditButton()
})()
