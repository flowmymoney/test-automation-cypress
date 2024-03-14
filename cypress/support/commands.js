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
 * @method fillFormSignUp
 */
Cypress.Commands.add('fillFormSignUp', ({
    firstName = faker.person.firstName(),
    lastName = faker.person.lastName(),
    email = faker.internet.email(),
    password = faker.internet.password({length: 8}),
    password_confirmation = null
} = {}) => {
    cy.get('[data-test="first_name"]').type(firstName)
    cy.get('[data-test="last_name"]').type(lastName)
    cy.get('[data-test="email"]').type(email)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="password_confirmation"]').type(password_confirmation != null ? password_confirmation : password)
})