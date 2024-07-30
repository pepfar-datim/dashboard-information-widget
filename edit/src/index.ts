import {fetchContent} from "./services/init/fetchContent.service.ts";
import {sanitizeContent} from "../../shared/sanitizeContent.service.ts";
import fetchAllowedUrls from "../../shared/fetchAllowedUrls.service.ts";
import {renderEditor} from "./services/init/renderEditor.service.ts";
import {initCancelButton} from "./services/init/initCancelButton.service.ts";
import {Jodit} from "jodit/esm/index.js";
import {initSaveButton} from "./services/init/initSaveButton.service.ts";
import {initChangeMonitor} from "./services/content/changeMonitor.service.ts";

const main = async () => {
    console.log('TESTING0')
    initCancelButton()
    console.log('TESTING')
    const rawContent:string = await fetchContent() || '<h3>New Dashboard Information widget</h3>'
    console.log('rawContent: ', rawContent)
    const allowedUrls: string[] = await fetchAllowedUrls()
    const safeContent = sanitizeContent(rawContent, allowedUrls)
    console.log('safeContent: ', safeContent)
    const editor:Jodit = renderEditor(safeContent)
    initChangeMonitor(safeContent, editor)
    initSaveButton(editor)
}

(() => {
    console.log('Commence rendering')
    main()
})()

export default main
