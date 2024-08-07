import {fetchContent} from "./services/init/fetchContent.service.ts";
import {sanitizeContent} from "../../shared/sanitizeContent.service.ts";
import {renderEditor} from "./services/init/renderEditor.service.ts";
import {initCancelButton} from "./services/init/initCancelButton.service.ts";
import {Jodit} from "jodit/esm/index.js";
import {initSaveButton} from "./services/init/initSaveButton.service.ts";
import {initChangeMonitor} from "./services/content/changeMonitor.service.ts";
import fetchAllowedIframeDomains from "../../shared/fetchAllowedIframeDomains.service.ts"
import {showMessages} from "../../shared/showMessages.service.ts";

(async ()=>{
    initCancelButton()
    const rawContent:string = await fetchContent() || '<h3>New Dashboard Information widget</h3>'
    const allowedIframeDomains: string[] = await fetchAllowedIframeDomains()
    const [safeContent, msgs] = sanitizeContent(rawContent,allowedIframeDomains)
    showMessages(msgs)
    const editor:Jodit = renderEditor(safeContent)
    initChangeMonitor(safeContent, editor)
    initSaveButton(editor, allowedIframeDomains)
})()
