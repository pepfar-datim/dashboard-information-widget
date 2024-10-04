import { ViewMode } from "./interfaces"

export function styleMatch(styleStr: string): RegExp {
    const escaped = styleStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return RegExp(`(^${escaped}| ${escaped})`)
}

export function getUrl(viewMode: ViewMode, widgetId: string): string {
    const urlByViewMode = {
        [ViewMode.DISPLAY]: `?dashboardItemId=${widgetId}`,
        [ViewMode.EDITABLE]: `?dashboardItemId=${widgetId}#/xxx/edit`,
        [ViewMode.EDITING]: `edit.html?dashboardItemId=${widgetId}`
    }
    return urlByViewMode[viewMode]
}