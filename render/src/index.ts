import {fetchContent} from "./services/fetchContent.service.ts";
import {sanitizeContent} from "../../shared/sanitizeContent.service.ts";
import {render} from "./services/render.service.ts";
import {addEditButton} from "./services/addEditButton.service.ts";


(async ()=>{
    const rawContent:string = await fetchContent() || '<h3>New Dashboard Information widget</h3>'
    const safeContent = sanitizeContent(rawContent)
    await render(safeContent)
    addEditButton()
})()
