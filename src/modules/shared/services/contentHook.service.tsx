export default function contentHook(content) {
    return content.replace(/<a /g, '<a target="_blank" ');
}
