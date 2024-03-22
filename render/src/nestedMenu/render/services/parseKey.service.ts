export function parseKey(rawKey: string): [string, string] {
    const [name, style] = rawKey.split('{')
    return [
        name.trim(),
        style?.replace('|', ':').replace('}', '')
    ]
}