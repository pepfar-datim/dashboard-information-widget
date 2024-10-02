/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />
import { ViewMode } from "../support/interfaces"
import { styleMatch } from "../support/utils"

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

  it('Can bold text', () => {
    cy.get('div.jodit-wysiwyg').as('editor')
    cy.get('@editor').type('{selectAll}')
    cy.get('span[aria-label="Bold"]').click()
    cy.get('p > strong').contains('Initial text')
  })

  it('Can italisize text', () => {
    cy.get('div.jodit-wysiwyg').as('editor')
    cy.get('@editor').type('{selectAll}')
    cy.get('span[aria-label="Italic"]').click()
    cy.get('p > em').contains('Initial text')
  })

  it('Can underline text', () => {
    cy.get('div.jodit-wysiwyg').as('editor')
    cy.get('@editor').type('{selectAll}')
    cy.get('span[aria-label="Underline"]').click()
    cy.get('p > u').contains('Initial text')
  })

  it('Can change text color', () => {
    cy.get('div.jodit-wysiwyg').as('editor')
    cy.get('@editor').type('{selectAll}')
    cy.selectColor({hexCode: '#FFFF00'})
    cy.get('p > span').should('have.attr', 'style')
      .and('match', styleMatch('color: rgb(255, 255, 0)'))
    cy.get('@editor').type('{rightarrow}')
  })

  it('Can change background color', () => {
    cy.get('div.jodit-wysiwyg').as('editor')
    cy.get('@editor').type('{selectAll}')
    cy.selectColor({hexCode: '#FF9900', isBackground: true})
    cy.get('p > span').should('have.attr', 'style')
      .and('match', styleMatch('background-color: rgb(255, 153, 0)'))
    cy.get('@editor').type('{rightarrow}')
  })

  it('Can change font size', () => {
    cy.get('div.jodit-wysiwyg').as('editor')
    cy.get('@editor').type('{selectAll}')
    cy.get('span[aria-label="Font size"] > span[role="trigger"]').click()
    cy.contains('12px').click()
    cy.get('p > span').should('have.attr', 'style')
      .and('match', styleMatch('font-size: 12px'))
  })

  it('Can clear formatting', () => {
    cy.get('div.jodit-wysiwyg').as('editor')
    cy.get('@editor').type('{selectAll}')
    cy.selectColor({hexCode: '#FFFF00'})
    cy.selectColor({hexCode: '#FF9900', isBackground: true})
    cy.get('span[aria-label="Font size"] > span[role="trigger"]').click()
    cy.contains('12px').click()
    cy.get('@editor').type('{rightarrow}')
    cy.get('@editor').type('{selectAll}')
    cy.get('span[aria-label="Clear Formatting"] > button').click()
    cy.get('div.jodit-wysiwyg > p').find('span').should('not.exist')
  })

  it('Can create unordered lists', () => {
    cy.get('span[aria-label="Insert Unordered List"] > button').click()
    cy.get('div.jodit-wysiwyg > ul > li').contains('Initial text')
  })

  it('Can create ordered lists', () => {
    cy.get('span[aria-label="Insert Ordered List"] > button').click()
    cy.get('div.jodit-wysiwyg > ol > li').contains('Initial text')
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