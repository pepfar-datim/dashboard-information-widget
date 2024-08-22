/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />
import testHtml from '../support/testHtmlContents.ts'


describe('Content renders as expected', () => {

    it('Renders content correctly', () => {
        cy.setupWidgetItem(testHtml.basic)
        cy.get('#content').should('have.text', 'Cypress Test')
    })

    it('Renders nested menus correctly', () => {
        cy.setupWidgetItem(testHtml.nestedMenu)
        cy.get('#content').contains('Hello')
        cy.contains('World').click()
        cy.contains('World').should('have.class', 'selected')
        cy.contains('What a Wonderful').click()
        cy.contains('I see trees').click()
        cy.contains('Of green').should('have.attr', 'onclick')
    })

    it('Sanitises content correctly for tags', () => {
        cy.setupWidgetItem(testHtml.dirtyContentTags)
        cy.contains('Clean heading').should('have.css', 'background-color', 'rgb(255, 0, 0)');
        cy.get('#content').invoke('prop', 'innerHTML')
        .then((innerHTML) => {
            expect(innerHTML).to.not.include('script');
        });
    })

    it('Sanitises content correctly for iframes', () => {
        cy.setupWidgetItem(testHtml.dirtyContentIframes)
        cy.contains('Clean heading')
        cy.get('iframe').should('have.length', 1)
        cy.get('iframe').invoke('attr', 'src').should('include', 'youtube')
    })

    afterEach(() => {
        cy.removeWidgetItem()
        cy.wait(1000)
    })

})