import {faker} from '@faker-js/faker';

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

/**
 * @memberof cy
 * @method getByDataTest
 */
Cypress.Commands.add('getByDataTest', (selector) => {
    cy.get(`[data-test="${selector}"]`)
})

/**
 * @memberof cy
 * @method visitHomepage
 */
Cypress.Commands.add('visitHomepage', () => {
    cy.visit('/')
})
/**
 * @memberof cy
 * @method fillFormSignUp
 */
Cypress.Commands.add('fillFormSignUp', ({
    firstName = faker.person.firstName(),
    lastName = faker.person.lastName(),
    email = faker.internet.email(),
    password = faker.internet.password({length: 8}),
    password_confirmation = null
} = {}) => {
    cy.visitHomepage()
    cy.getByDataTest('signup').click()
    cy.getByDataTest('first_name').type(firstName)
    cy.getByDataTest('last_name').type(lastName)
    cy.getByDataTest('email').type(email)
    cy.getByDataTest('password').type(password, {log: false})
    cy.getByDataTest('password_confirmation').type(password_confirmation != null ? password_confirmation : password)
    cy.getByDataTest('submit').click()
})

/**
 * @memberof cy
 * @method login
 */
Cypress.Commands.add('login', (
    email = faker.internet.email(),
    password = faker.internet.password()
) => {
    cy.session([email, password], () => {
        cy.fillFormSignUp({email: email, password: password})
    }, {
        validate() {
            cy.get('.mt-1.small.text-muted').should('have.text', email)
        }, cacheAcrossSpecs: true
    })
    cy.visitHomepage()
})