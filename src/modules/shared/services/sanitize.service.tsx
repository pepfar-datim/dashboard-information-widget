import * as DOMPurify from 'dompurify';

export default function sanitize(content:string):string{
    if (!content) return '';
    return DOMPurify.sanitize(content, {ALLOWED_TAGS: ['iframe']});
}
