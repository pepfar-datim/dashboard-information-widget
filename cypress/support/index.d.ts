
declare namespace Cypress {
  interface Chainable {
    setupWidgetItem(content: string, options?: {widgetId?: string, viewMode?: ViewMode}): void
    addNestedMenu(content: string): void
    removeWidgetItem(widgetId?: string): void
    selectColor(params: {hexCode: string, isBackground?: boolean}): void
  }
}