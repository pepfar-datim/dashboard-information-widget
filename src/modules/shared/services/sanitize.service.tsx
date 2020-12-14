import sanitizeHtml from 'sanitize-html';

const settings = {
    allowedTags: [
        'h3',
        'h4',
        'h5',
        'h6',
        'blockquote',
        'p',
        'a',
        'ul',
        'ol',
        'img',
        'nl',
        'li',
        'b',
        'i',
        'strong',
        'em',
        'strike',
        'code',
        'hr',
        'br',
        'div',
        'u',
        'table',
        'thead',
        'caption',
        'tbody',
        'tr',
        'th',
        'td',
        'pre',
        'iframe',
        'span',
    ],
    allowedAttributes: {
        a: ['href', 'name', 'target'],
        img: ['src', 'alt', 'style'],
        iframe: ['src', 'height', 'width', 'frameborder'],
    },
    selfClosing: [
        'img',
        'br',
        'hr',
        'area',
        'base',
        'basefont',
        'input',
        'link',
        'meta',
    ],
    allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'data:image'],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
    allowProtocolRelative: true,
    allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
};

// Add style as an allowed attribute on all allowed tags, otherwise styles will be removed on save
for (const allowedTag of settings.allowedTags) {
    if (
        allowedTag in settings.allowedAttributes &&
        !settings.allowedAttributes[allowedTag].includes(allowedTag)
    ) {
        settings.allowedAttributes[allowedTag].push('style');
    } else {
        settings.allowedAttributes[allowedTag] = ['style'];
    }
}

export default function sanitize(content) {
    if (!content) return '';
    return sanitizeHtml(content, settings);
}
