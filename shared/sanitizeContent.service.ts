const badTags = ['script','applet','link']

const invalidIframeSrcMessage = `
:domainName is not currently an allowed domain for iframe content.</br></br>
In order to change that, please go to 
<a id="dataStoreLink" target="_blank" href="../../../dhis-web-datastore/index.html#/edit/dashboard-information/configuration">
the configuration key in the dashboard-information namespace in the data store manager</a>
 and add the domain name to the list of Allowed iframe domains.</br></br>
For more information, please see  
<a id="docsLink" target="_blank" href="https://github.com/pepfar-datim/dashboard-information-widget/blob/main/docs/AllowedIframeDomains.md">
our documentation</a>.
`

function isValidSrc(src:string, allowedIframeDomains: string[]):boolean{
    return allowedIframeDomains.some(domain=> src.startsWith(domain))
}

function getIframeSrc(tag:string):string {
    const match = tag.match(/iframe[^>]+src="([^">]+)"/)
    return match ? match[0].split('"').slice(-2, -1)[0] : ''
}

export function sanitizeContent(input:string, allowedIframeDomains: string[]): [string, string] {
    const domainsWithProtocol = allowedIframeDomains.map(
        domain => domain.startsWith('https://') ? domain : `https://${domain}`
    )
    let modifiedInput = input
    const messages: string[] = []
    for (const tag of badTags) {
        if (tag === 'link') {  // Link tags have no closing tag or / so need a different pattern
            modifiedInput = modifiedInput.replace(/<link[^>]*>/mg, '')
        } else {
            modifiedInput = modifiedInput.replace(
                new RegExp(`<${tag}[^>]*(\/>|>.*?<\/${tag}>)`, 'mg'), ''
            )
        }
        
    }
    if (input !== modifiedInput) {
        messages.push(`Removed disallowed tags ${badTags.join(' & ')} are not allowed`)
    }
    modifiedInput = modifiedInput.replace(/<iframe[^>]*(\/>|>.*?<\/iframe>)/mg, function(tag:string) {
        const src = getIframeSrc(tag)
        const validTag = isValidSrc(src, domainsWithProtocol)
        if (!validTag) {
            const domain = src.match(/https?:\/\/[^/]+/)?.[0]?.slice(8)
            messages.push(invalidIframeSrcMessage.replace(':domainName', domain ?? src))
        }
        return validTag ? tag : ''
    })
    return [modifiedInput, messages.join('\n')]
}