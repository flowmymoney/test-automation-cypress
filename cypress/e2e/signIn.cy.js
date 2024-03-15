import {faker} from "@faker-js/faker"

describe('Sign In', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('Login com sucesso', () => {
        cy.login()
    })
})