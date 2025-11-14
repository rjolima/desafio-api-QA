///<reference types="cypress"/>

describe('Cadastar produto no carrinho', () => {
    context('Principal', () => {
        beforeEach(() => {
            cy.salvarVariaveisGlobal()
            cy.criarusuario()
            cy.loginUsuario()
            cy.cadastrarProduto()
        });

        it('Adicionar produto ao carrinho de um novo produto via API', () => {
            cy.cadastrarCarrinho()
                .then((response) => {
                    expect(response.status).to.eq(201);
                    expect(response.body.message).to.eq('Cadastro realizado com sucesso');
                });
        });

        it('Realizar buscar de um produto deletado via API', () => {
            cy.cadastrarCarrinho()
            cy.buscarProdutoCarrinho()
                .then((response) => {
                    expect(response.status).to.eq(400)
                    expect(response.body.message).to.eq('Carrinho não encontrado')
                });
        });

        it('Deletar um produto do carrinho via API', () => {
            cy.deletarProdutoCarrinho()
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.message).to.eq('Não foi encontrado carrinho para esse usuário');
                });
        });

        it('Realizar buscar de um produto não cadastrado via API', () => {
            cy.buscarProdutoCarrinho()
                .then((response) => {
                    expect(response.status).to.eq(400)
                    expect(response.body.message).to.eq('Carrinho não encontrado')
                });
        });
    });
});