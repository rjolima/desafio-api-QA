const urlApi = Cypress.config('urlApi')

//Cadastar conta resgate e validar conta bancária retonado dados do BD
Cypress.Commands.add('cadastrarProduto', () => {
    const produtosUsuario = {
        nome: Cypress.env('nomeProduto'),
        preco: Cypress.env('precoProduto'),
        descricao: Cypress.env('descricaProduto'),
        quantidade: Cypress.env('quantidadeProduto')
    }

    cy.api({
        method: 'POST',
        url: `${urlApi}produtos`,
        body: produtosUsuario,
        headers: {
            Authorization: Cypress.env('tokenUsuario')
        },
        failOnStatusCode: false

    }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        Cypress.env('idProduto', response.body._id);
    });
});

Cypress.Commands.add('buscarProduto', () => {
    cy.api({
        method: 'GET',
        url: `${urlApi}produtos/${Cypress.env('idProduto')}`,
        headers: {
            Authorization: Cypress.env('tokenUsuario')
        },
        failOnStatusCode: false

    }).then((response) => { return response });
});

Cypress.Commands.add('deletarProduto', () => {
    cy.api({
        method: 'DELETE',
        url: `${urlApi}produtos/${Cypress.env('idProduto')}`,
        headers: {
            Authorization: Cypress.env('tokenUsuario')
        },
        failOnStatusCode: false

    }).then((response) => { return response });
});