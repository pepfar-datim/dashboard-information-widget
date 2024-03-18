import {Jodit} from 'jodit'
import 'jodit/es2021.en/jodit.css'

export async function render(content:string):Promise<void>{
    const editor = Jodit.make('#editor');
    editor.value = content
}