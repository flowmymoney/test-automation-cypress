import {faker} from "@faker-js/faker";

/**
 * @memberof cy
 * @method fillBankAccountFormCreate
 */
Cypress.Commands.add('fillBankAccountFormCreate', ({
    surname = faker.word.words(3),
    bank_id = faker.number.int({min: 1, max: 247}),
    bank_account_type_id = faker.number.int({min: 1, max: 4}),
    agency = faker.number.int({min: 1, max: 9999}),
    number = faker.number.int(),
    digit = faker.number.int({min: 1, max: 9})
} = {}) => {
    cy.getByDataTest('surname').type(surname)
    cy.getByDataTest('bank_id').select(bank_id)
    cy.getByDataTest('bank_account_type_id').select(bank_account_type_id)
    cy.getByDataTest('agency').type(agency)
    cy.getByDataTest('number').type(number)
    cy.getByDataTest('digit').type(digit)
})