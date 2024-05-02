/// <reference types="cypress" />

describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('hi', () => {
    cy.get('main').should('have.text', 'hi')
  })
})
