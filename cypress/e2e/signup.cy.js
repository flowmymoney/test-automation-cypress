import {faker} from '@faker-js/faker';

describe('Sign Up', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('Cadastro de usuário com sucesso', () => {
        cy.get('[data-test="signup"]').as('signUpButton').click()
        cy.fillFormSignUp()
        cy.get('[data-test="submit"]').click()
        cy.get('.page-body').should('contain', 'Nenhuma transação encontrado no período filtrado')
    })

    it('Cadastro de usuário com falha por nome não preenchido', () => {
        const password = faker.internet.password({length: 7})

        cy.get('[data-test="signup"]').as('signUpButton').click()
        cy.fillFormSignUp({firstName: ' '})
        cy.get('[data-test="submit"]').click()
        cy.get('.invalid-feedback').should('have.text', 'The first name field is required.')
    })

    it('Cadastro de usuário com falha por sobrenome não preenchido', () => {
        const password = faker.internet.password({length: 7})

        cy.get('[data-test="signup"]').as('signUpButton').click()
        cy.fillFormSignUp({lastName: ' '})
        cy.get('[data-test="submit"]').click()
        cy.get('.invalid-feedback').should('have.text', 'The last name field is required.')
    })

    it('Cadastro de usuário com falha por senha ser menor que 8 dígitos', () => {
        const password = faker.internet.password({length: 7})

        cy.get('[data-test="signup"]').as('signUpButton').click()
        cy.fillFormSignUp({password: password})
        cy.get('[data-test="submit"]').click()
        cy.get('.invalid-feedback').should('have.text', 'The password must be at least 8 characters.')
    })

    it('Cadastro de usuário com falha por senha e senha de confirmação serem diferentes', () => {
        cy.get('[data-test="signup"]').as('signUpButton').click()
        cy.fillFormSignUp({
            password: faker.internet.password(),
            password_confirmation: faker.internet.password()
        })
        cy.get('[data-test="submit"]').click()
        cy.get('.invalid-feedback').should('have.text', 'The password confirmation does not match.')
    })

    it('Cadastro de usuário com falha por e-mail inválido', () => {
        const password = faker.internet.password({length: 8})

        cy.get('[data-test="signup"]').as('signUpButton').click()
        cy.get('[data-test="first_name"]').type(faker.person.firstName())
        cy.get('[data-test="last_name"]').type(faker.person.lastName())
        cy.get('[data-test="email"]').type(faker.internet.email({provider: 'gmail'}))
        cy.get('[data-test="password"]').type(password)
        cy.get('[data-test="password_confirmation"]').type(password)
        cy.get('[data-test="submit"]').click()

        cy.get('.invalid-feedback').should('have.text', 'The email must be a valid email address.')
    })
})