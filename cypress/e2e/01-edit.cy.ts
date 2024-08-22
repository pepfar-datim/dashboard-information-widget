/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />
import { ViewMode } from "../support/interfaces"

describe('Edit content as expected', () => {

  it('Edit mode renders', () => {
    cy.setupWidgetItem('Initial text', { viewMode: ViewMode.EDITING })
  })

  it('Can add text', () => {
    cy.setupWidgetItem('Initial text', { viewMode: ViewMode.EDITING })
    cy.get('div.jodit-wysiwyg').as('editor')
    cy.get('@editor').type(' added text')
    cy.get('@editor').contains('added text')
  })
})