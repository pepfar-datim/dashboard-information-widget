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
import { SetupWidgetItemProps, ViewMode } from './interfaces'
import { getUrl } from './utils'
const metaKey = Cypress.platform === 'darwin' ? 'cmd' : 'ctrl'

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
        cy.visit(getUrl(viewMode, widgetId))
    })
})

Cypress.Commands.add('addNestedMenu', (contentRaw: string) => {
    const allLines = contentRaw.split('\n').filter(Boolean).map(l => l.slice(4))
    cy.get('div.ace_content').type('{enter}')
    cy.get('div.ace_content')
        .type(allLines[0])
        .type(`{${metaKey}}{rightarrow}`)
        .type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
    cy.get('div.ace_content').type('{enter}')
    const lines = allLines.slice(1)
    let writeString = ''

    for (const [idx, line] of lines.entries()) {
        const prevLine = idx === 0 ? '' : lines[idx-1]
        const prevLineSpaces = prevLine.match(/^ +/)?.[0]?.length || 0
        writeString += `${'{backspace}'.repeat(prevLineSpaces/4)}${line}{enter}`
    }
    cy.get('div.ace_content').type(writeString)
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