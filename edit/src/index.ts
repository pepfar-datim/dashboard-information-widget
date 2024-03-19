import {fetchContent} from "./services/fetchContent.service.ts";
import {sanitizeContent} from "./services/sanitizeContent.service.ts";
import {renderEditor} from "./services/renderEditor.service.ts";
import {initCancelButton} from "./services/initCancelButton.service.ts";


(async ()=>{
    initCancelButton()
    const rawContent:string = await fetchContent() || '<h3>New Dashboard Information widget</h3>'
    const safeContent = sanitizeContent(rawContent)
    renderEditor(safeContent)
})()
