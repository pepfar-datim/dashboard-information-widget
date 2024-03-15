import {fetchContent} from "./services/fetchContent.service.ts";
import {sanitize} from "./services/sanitize.service.ts";
import {render} from "./services/render.service.ts";


(async ()=>{
    const rawContent:string = await fetchContent()
    if (!rawContent) return render('<h3>New Dashboard Information widget</h3>')
    const safeContent = sanitize(rawContent)
    render(safeContent)
})()
