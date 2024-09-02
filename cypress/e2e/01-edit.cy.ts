/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />
import { ViewMode } from "../support/interfaces"

describe('Edit content as expected', () => {

  beforeEach(() => {
    cy.setupWidgetItem('Initial text ', { viewMode: ViewMode.EDITING })
    cy.contains('Initial text').should('exist')
    cy.contains('Start writing').should('not.exist')
  })

  it('Edit mode renders', () => {
    const docsText = 'Documentation for the Dashboard Information widget can be found here'
    const docsLink = 'https://github.com/pepfar-datim/dashboard-information-widget'
    cy.contains(docsText).should('have.attr', 'href', docsLink)
    cy.contains('Initial text')
  })

  it('Can add text', () => {
    cy.get('div.jodit-wysiwyg').as('editor')
    cy.get('@editor').type('added text')
    cy.get('@editor').contains('added text')
  })

  it('Can format text', () => {
    cy.get('div.jodit-wysiwyg').as('editor')
    cy.get('@editor').type('{selectAll}')
    cy.get('span[aria-label="Bold"]').click()
    cy.get('p > strong').contains('Initial text')
  })

  it('Can insert links', () => {
    const [link, linkText] = ['https://dhis2.org/', 'dhis2']
    cy.get('span[ref="link"]').click()
    cy.get('input[placeholder="http://"]').type(link)
    cy.get('div.jodit-popup').contains('Text').parent().find('input').type(linkText)
    cy.contains('Insert').click()
    cy.get(`a[href="${link}"]`).contains(linkText)
  })

  it('Can insert videos', () => {
    const videoLink = 'https://www.youtube.com/watch?v=6Ig3xaFsjHo'
    const embedLink = 'https://www.youtube.com/embed/6Ig3xaFsjHo'
    cy.get('span[ref="video"]').click()
    cy.get('input[placeholder="https://"]').type(videoLink)
    cy.contains('Insert').click()
    cy.wait(2000)
    cy.get(`div#editor-container iframe`).as('videoIframe')
    cy.get('@videoIframe').then($iframe => {
      expect($iframe.attr('src')).to.equal(embedLink)
    })
  })

  afterEach(() => {
    cy.removeWidgetItem()
    cy.wait(1000)
})
})