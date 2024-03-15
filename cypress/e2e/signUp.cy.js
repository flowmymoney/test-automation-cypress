import {faker} from '@faker-js/faker';

describe.skip('Sign Up', () => {
    it('Cadastro de usuário com sucesso', () => {
        cy.fillFormSignUp()
        cy.get('.page-body').should('contain', 'Nenhuma transação encontrado no período filtrado')
    })

    it('Cadastro de usuário com falha por nome não preenchido', () => {
        cy.fillFormSignUp({firstName: ' '})
        cy.get('.invalid-feedback').should('have.text', 'The first name field is required.')
    })

    it('Cadastro de usuário com falha por sobrenome não preenchido', () => {
        cy.fillFormSignUp({lastName: ' '})
        cy.get('.invalid-feedback').should('have.text', 'The last name field is required.')
    })

    it('Cadastro de usuário com falha por senha ser menor que 8 dígitos', () => {
        cy.fillFormSignUp({password: faker.internet.password({length: 7})})
        cy.get('.invalid-feedback').should('have.text', 'The password must be at least 8 characters.')
    })

    it('Cadastro de usuário com falha por senha e senha de confirmação serem diferentes', () => {
        cy.fillFormSignUp({
            password: faker.internet.password(),
            password_confirmation: faker.internet.password()
        })
        cy.get('.invalid-feedback').should('have.text', 'The password confirmation does not match.')
    })

    it('Cadastro de usuário com falha por e-mail inválido', () => {
        cy.fillFormSignUp({email: faker.internet.email({provider: 'gmail'})})
        cy.get('.invalid-feedback').should('have.text', 'The email must be a valid email address.')
    })
})