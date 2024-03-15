describe('Conta Bancária', () => {

    it.only('Cadastro de conta bancária com sucesso', () => {
        cy.login()
        cy.getByDataTest('financial').click()
        cy.getByDataTest('bank_accounts').click()
        cy.getByDataTest('create').click()
        cy.fillBankAccountFormCreate()
        cy.getByDataTest('save').click()
    });

})