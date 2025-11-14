///<reference types="cypress"/>

describe('Cadastar novo produto', () => {
    context('Principal', () => {
        beforeEach(() => {
            cy.salvarVariaveisGlobal()
            cy.criarusuario()
            cy.loginUsuario()
        });

        it('Realizar cadastrado de um novo produto via API', () => {
            cy.cadastrarProduto()
        });

        it('Realizar buscar de um produto cadastrado via API', () => {
            cy.cadastrarProduto()
            cy.buscarProduto()
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.nome).to.eq(Cypress.env('nomeProduto'))
                    expect(response.body.preco).to.eq(Cypress.env('precoProduto'))
                    expect(response.body.descricao).to.eq(Cypress.env('descricaProduto'))
                    expect(response.body.quantidade).to.eq(Cypress.env('quantidadeProduto'))
                });
        });

        it('Deletar um produto cadastrado via API', () => {
            cy.cadastrarProduto()
            cy.deletarProduto()
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.message).to.eq('Registro excluído com sucesso');
                });
        });

        it('Realizar buscar de um produto deletado via API', () => {
            cy.cadastrarProduto()
            cy.deletarProduto()
            cy.buscarProduto()
                .then((response) => {
                    expect(response.status).to.eq(400)
                    expect(response.body.message).to.eq('Produto não encontrado')
                });
        });

        it('Deletar um produto já foi deletado cadastrado via API', () => {
            cy.cadastrarProduto()
            cy.deletarProduto()
            cy.deletarProduto()
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.message).to.eq('Nenhum registro excluído');
                });
        });
    });
});