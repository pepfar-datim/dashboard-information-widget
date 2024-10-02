export function styleMatch(styleStr: string): RegExp {
    const escaped = styleStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return RegExp(`(^${escaped}| ${escaped})`)
}