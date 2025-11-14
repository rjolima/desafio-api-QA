///<reference types="cypress"/>

describe('Realizar login usuário', () => {
    context('Principal', () => {
        beforeEach(() => {
            cy.salvarVariaveisGlobal()
            cy.criarusuario()
        });

        it('Realizar login do novo usuário serverest via API', () => {
            cy.loginUsuario()
        });
    });

    context('Exceção', () => {
        it('Realizar login com e-mail inválido', () => {
            cy.criarUsuarioEmailInvalido()
                .then((response) => {
                    expect(response.status).to.eq(400);
                    expect(response.body.email).to.eq('email deve ser um email válido');
                });
        });
    });
});