
const badTags = ['script','applet','iframe','link']

export function sanitize(input:string):string{
    // <script.+/script> or <script.+/>
    badTags.forEach(tag=>input = input.replace(new RegExp(`<${tag}.+\/(${tag}|)>`),''))
    return input
}