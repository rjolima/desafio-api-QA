const urlApi = Cypress.config('urlApi')

//Cadastar conta resgate e validar conta bancária retonado dados do BD
Cypress.Commands.add('cadastrarCarrinho', () => {
    const produtosCarrinho = {
        produtos: [
            {
                idProduto: Cypress.env('idProduto'),
                quantidade: Cypress.env('quantidadeProduto')
            }
        ]
    }

    cy.api({
        method: 'POST',
        url: `${urlApi}carrinhos`,
        body: produtosCarrinho,
        headers: {
            Authorization: Cypress.env('tokenUsuario')
        },
        failOnStatusCode: false

    }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        Cypress.env('idCarrinho', response.body._id);
    });
});

Cypress.Commands.add('buscarProdutoCarrinho', () => {
    cy.api({
        method: 'GET',
        url: `${urlApi}carrinhos/${Cypress.env('idProduto')}`,
        headers: {
            Authorization: Cypress.env('tokenUsuario')
        },
        failOnStatusCode: false

    }).then((response) => { return response });
});

Cypress.Commands.add('deletarProdutoCarrinho', () => {
    cy.api({
        method: 'DELETE',
        url: `${urlApi}carrinhos/concluir-compra`,
        headers: {
            Authorization: Cypress.env('tokenUsuario')
        },
        failOnStatusCode: false

    }).then((response) => { return response });
});