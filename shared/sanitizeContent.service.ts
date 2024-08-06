const badTags = ['script','applet','link']

const invalidIframeSrcMessage = `
:domainName is not currently an allowed domain for iframe content. 
In order to change that, please go to 
<a href="../../../dhis-web-datastore/index.html#/edit/dashboard-information/configuration">
the configuration key in the dashboard-information namespace in the data store manager</a>
 and add the domain name to the list of Allowed iframe domains. 
For more information, please see our 
<a href="https://github.com/pepfar-datim/dashboard-information-widget/blob/main/docs/AllowedIframeDomains.md">
documentation</a>.
`

function isValidSrc(src:string, allowedIframeDomains: string[]):boolean{
    return allowedIframeDomains.some(domain=> src.startsWith(domain))
}

function getIframeSrc(tag:string):string {
    const match = tag.match(/iframe[^>]+src="([^">]+)"/)
    return match ? match[0].split('"').slice(-2, -1)[0] : ''
}

export function sanitizeContent(input:string, allowedIframeDomains: string[]): [string, string] {
    let modifiedInput = input
    const messages: string[] = []
    for (const tag of badTags) {
        modifiedInput = modifiedInput.replace(new RegExp(`<${tag}.+\/(${tag}|)>`), '')
    }
    if (input !== modifiedInput) {
        messages.push(`Removed disallowed tags ${badTags.join(', ')}`)
    }
    
    modifiedInput = input.replace(/<iframe.+(\/>|<\/iframe>)/mg, function(tag:string) {
        const src = getIframeSrc(tag)
        const validTag = isValidSrc(src, allowedIframeDomains)
        if (!validTag) {
            messages.push(invalidIframeSrcMessage.replace(':domainName', src))
        }
        return validTag ? tag : ''
    })
    return [modifiedInput, messages.join('\n')]
}