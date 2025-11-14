///<reference types="cypress"/>

describe('Cadastar novo usuário', () => {
    context('Principal', () => {
        beforeEach(() => {
            cy.salvarVariaveisGlobal()
        });

        it('Realizar cadastrado do novo usuário serverest via API', () => {
            cy.criarusuario()
        });

        it('Deletar novo usuário serverest via API', () => {
            cy.deletarUsuario()
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.message).to.eq('Registro excluído com sucesso');
                });
        });
    });

    context('Exceção', () => {
        it('Cadastrar usuário com e-mail inválido', () => {
            cy.loginUsuarioInvalido()
                .then((response) => {
                    expect(response.status).to.eq(400);
                    expect(response.body.email).to.eq('email deve ser um email válido');
                });
        });
    });
});

