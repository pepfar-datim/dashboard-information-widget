// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
import {query} from '../../edit/src/services/init/initSaveButton.service'
import { SetupWidgetItemProps, ViewMode, } from './interfaces'

Cypress.Commands.add('setupWidgetItem', (content: string, options: SetupWidgetItemProps={}) => {
    const widgetId = options?.widgetId ?? 'cypr3ssTe5t'
    const viewMode = options?.viewMode ?? ViewMode.DISPLAY
    async function setupWidget(content: string, widgetId: string) {
        const existingWidgetsReq = await fetch('../../../api/dataStore/dashboard-information/')
        const existingWidgets = await existingWidgetsReq.json()
        const exists = existingWidgets.includes(widgetId)
        const method = exists ? 'PUT' : 'POST'
        return query(content, method, widgetId)
    }
    cy.wrap(setupWidget(content, widgetId)).then(() => {
        const urlByViewMode = {
            [ViewMode.DISPLAY]: `?dashboardItemId=${widgetId}`,
            [ViewMode.EDITABLE]: `?dashboardItemId=${widgetId}#/xxx/edit`,
            [ViewMode.EDITING]: `edit.html?dashboardItemId=${widgetId}`
        }
        cy.visit(urlByViewMode[viewMode])
    })
})

Cypress.Commands.add('removeWidgetItem', (widgetId='cypr3ssTe5t') => {
    query('', 'DELETE', widgetId)
    cy.visit('/')
})


Cypress.Commands.add('selectColor', (params: {hexCode: string, isBackground?: boolean}) => {
    cy.get('span[data-ref="brush"] > span[role="trigger"]').click()
    if (!params?.isBackground) {
        cy.get('div.jodit-tabs button[data-ref="Text"]').click()
    }
    cy.get(`div.jodit-tab_active span[data-color="${params.hexCode}"]`).click()
})