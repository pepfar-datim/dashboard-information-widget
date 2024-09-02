
declare namespace Cypress {
  interface Chainable {
    setupWidgetItem(content: string, options?: {widgetId?: string, viewMode?: ViewMode}): void
    removeWidgetItem(widgetId?: string): void
  }
}