/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    clickBtn(name: string): Chainable<void>
    isVisible(name: string, text?: string): Chainable<void>
    isInvisible(name: string, text?: string): Chainable<void>
    checkStore(key: string, value: any): Chainable<void>
  }
}

Cypress.Commands.add('clickBtn', (name: string) => {
  cy.get(`[data-testid="${name}"]`).click()
})

Cypress.Commands.add('isVisible', (name: string, text?: string) => {
  text
    ? cy
        .get(`[data-testid="${name}"]`)
        .should('have.text', text)
        .and('be.visible')
    : cy.get(`[data-testid="${name}"]`).should('be.visible')
})

Cypress.Commands.add('isInvisible', (name: string, text?: string) => {
  text
    ? cy
        .get(`[data-testid="${name}"]`)
        .should('have.text', text)
        .and('not.be.visible')
    : cy.get(`[data-testid="${name}"]`).should('not.be.visible')
})

Cypress.Commands.add('checkStore', (key, value) => {
  cy.window().its(`localStorage.${key}`).should('eq', JSON.stringify(value))
})
