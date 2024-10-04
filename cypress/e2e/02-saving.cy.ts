/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />
import testHtml from '../support/testHtmlContents.ts'
import { ViewMode } from "../support/interfaces"
import { getUrl } from '../support/utils.ts'

describe('Changes can be saved and content will be sanitized on save', () => {
  const widgetId = 'Cypr3s5Test'
  beforeEach(() => {
    cy.setupWidgetItem('Initial text ', { viewMode: ViewMode.EDITING, widgetId })
    cy.contains('Initial text').should('exist')
    cy.contains('Start writing').should('not.exist')
  })

  it('Retains content changes on save', () => {
    cy.get('div.jodit-wysiwyg').type(' new content!')
    cy.contains('Save').click()
    cy.visit(getUrl(ViewMode.EDITABLE, widgetId))
    cy.get('#content').should('exist', {timeout: 10000})
    cy.get('#content').contains('new content!')
  })

  it('Sanitizes insecure tags on save', () => {
    cy.get('span[aria-label="Change mode"]').click()
    cy.get('div.ace_content').type(testHtml.dirtyContentTags, {parseSpecialCharSequences: false})
    cy.get('span[aria-label="Change mode"]').click()
    cy.contains('Save').click()
    cy.visit(getUrl(ViewMode.EDITABLE, widgetId))
    cy.get('#content link').should('not.exist')
  })

  it('Sanitizes disallowed iframes on save', () => {
    cy.get('span[aria-label="Change mode"]').click()
    cy.get('div.ace_content').type(
      testHtml.dirtyContentIframes, {parseSpecialCharSequences: false}
    )
    cy.get('span[aria-label="Change mode"]').click()
    cy.contains('Save').click()
    cy.visit(getUrl(ViewMode.EDITABLE, widgetId))
    cy.get('#content iframe').each(($iframe) => {
      cy.wrap($iframe).invoke('attr', 'src').should('match', /^(https:\/\/)?www.youtube.com/)
    })
    cy.get('#snackbar').should('be.visible', {timeout: 10000})
    cy.get('#snackbar').contains('is not currently an allowed domain for iframe content')
  })

  it('Shows no error for valid nested menu', () => {
    cy.get('span[aria-label="Change mode"]').click()
    cy.addNestedMenu(testHtml.nestedMenu)
    cy.get('span[aria-label="Change mode"]').click()
    cy.contains('Save').click()
    cy.visit(getUrl(ViewMode.EDITABLE, widgetId))
    cy.get('#snackbar').should('not.be.visible')
    cy.get('#content').contains('Hello', {timeout: 10000})
    cy.contains('World').click()
    cy.contains('World').should('have.class', 'selected')
    cy.contains('What a Wonderful').click()
    cy.contains('I see trees').click()
    cy.contains('Of green').should('have.attr', 'onclick')
  })

  it('Shows error when invalid nested menu syntax is provided', () => {
    const invalidNestedMenu = testHtml.nestedMenu.replace('</pre>', 'ExtraText</pre>')
    cy.get('span[aria-label="Change mode"]').click()
    cy.addNestedMenu(invalidNestedMenu)
    cy.get('span[aria-label="Change mode"]').click()
    cy.contains('Save').click()
    cy.visit(getUrl(ViewMode.EDITABLE, widgetId))
    cy.get('#content').contains('There was an error with the nested menu syntax:', {timeout: 10000})
    cy.get('#content').contains('ExtraText')
  })

  afterEach(() => {
    cy.removeWidgetItem()
    cy.wait(1000)
  })
})