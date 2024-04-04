const badTags = ['script','applet','link']
// const videoProviders = ['youtube.','youtu.be','yt.be','tiktok.com','vimeo.com', 'brightcove.com', 'brightcove.net', 'facebook.','fb.com','fb.me']

// function isVideoProvider(tag:string):boolean{
//     return videoProviders.some(domain=>tag.includes(domain))
// }

export function sanitizeContent(input:string):string{
    // <script.+/script> or <script.+/>
    badTags.forEach(tag=>input = input.replace(new RegExp(`<${tag}.+\/(${tag}|)>`),''))
    // input = input.replace(/<iframe.+\/>/,function (tag:string){
    //     if (isVideoProvider(tag)) return tag
    //     else return ''
    // })
    return input
}