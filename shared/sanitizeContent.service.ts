const badTags = ['script','applet','link']

function isValidSrc(tag:string, allowedUrls: string[]):boolean{
    const url = getIframeSrc(tag)
    return allowedUrls.some(allowedUrl=>url.startsWith(allowedUrl))
}

function getIframeSrc(tag:string):string {
    const match = tag.match(/iframe[^>]+src="([^">]+)"/)
    return match ? match[0].split('"').slice(-2, -1)[0] : ''
}

export function sanitizeContent(input:string, allowedUrls: string[]): string {
    badTags.forEach(tag=>input = input.replace(new RegExp(`<${tag}.+\/(${tag}|)>`),''))
    input = input.replace(/<iframe.+(\/>|<\/iframe>)/mg, function(tag:string) {
        return isValidSrc(tag, allowedUrls) ? tag : ''
    })
    return input
}