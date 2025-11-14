const fakerbr = require('faker-br')

Cypress.Commands.add('salvarVariaveisGlobal', () => {
    const email = fakerbr.internet.email().toLowerCase().split('@')[0] + '@getnada.cc';
    const nomeUsuario = fakerbr.name.firstName() + " " + fakerbr.name.lastName()
    const nomeProduto = fakerbr.commerce.productName()
    const precoProduto = fakerbr.random.number({ min: 100, max: 1000 })
    const descricaProduto = fakerbr.commerce.product()
    const quantidadeProduto = fakerbr.random.number({ min: 1, max: 100 })

    Cypress.env('email', email);
    Cypress.env('nomeUsuario', nomeUsuario)
    Cypress.env('nomeProduto', nomeProduto)
    Cypress.env('precoProduto', precoProduto)
    Cypress.env('descricaProduto', descricaProduto)
    Cypress.env('quantidadeProduto', quantidadeProduto)
});
