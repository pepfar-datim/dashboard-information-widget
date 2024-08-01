const badTags = ['script','applet','link']

function isValidSrc(tag:string, allowedIframeDomains: string[]):boolean{
    const url = getIframeSrc(tag)
    return allowedIframeDomains.some(domain=>url.startsWith(domain))
}

function getIframeSrc(tag:string):string {
    const match = tag.match(/iframe[^>]+src="([^">]+)"/)
    return match ? match[0].split('"').slice(-2, -1)[0] : ''
}

export function sanitizeContent(input:string, allowedIframeDomains: string[]): string {
    badTags.forEach(tag=>input = input.replace(new RegExp(`<${tag}.+\/(${tag}|)>`),''))
    input = input.replace(/<iframe.+(\/>|<\/iframe>)/mg, function(tag:string) {
        return isValidSrc(tag, allowedIframeDomains) ? tag : ''
    })
    return input
}