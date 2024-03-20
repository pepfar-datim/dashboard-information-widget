import {fetchContent} from "./services/content/fetchContent.service.ts";
import {sanitizeContent} from "../../shared/sanitizeContent.service.ts";
import {renderEditor} from "./services/renderEditor.service.ts";
import {initCancelButton} from "./services/initCancelButton.service.ts";
import {setOriginalContent} from "./services/content/originalContent.var.ts";

(async ()=>{
    initCancelButton()
    const rawContent:string = await fetchContent() || '<h3>New Dashboard Information widget</h3>'
    const safeContent = sanitizeContent(rawContent)
    renderEditor(safeContent)
    setOriginalContent(safeContent)
})()
