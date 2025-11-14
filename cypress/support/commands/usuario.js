const urlApi = Cypress.config('urlApi')

//Cadastar conta resgate e validar conta bancária retonado dados do BD
Cypress.Commands.add('criarusuario', () => {
    const cadastroUsuario = {
        nome: Cypress.env('nomeUsuario'),
        email: Cypress.env('email'),
        password: "teste",
        administrador: "true"
    }

    cy.api({
        method: 'POST',
        url: `${urlApi}usuarios`,
        body: cadastroUsuario,
        headers: {
        },
        failOnStatusCode: false

    }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body._id).is.not.null;
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        Cypress.env('idUsuario', response.body._id);
    });
});

Cypress.Commands.add('deletarUsuario', () => {
    cy.api({
        method: 'DELETE',
        url: `${urlApi}usuarios/${Cypress.env('idUsuario')}`,
        headers: {
        },
        failOnStatusCode: false

    }).then((response) => { return response });
});

Cypress.Commands.add('criarUsuarioEmailInvalido', () => {
    const emails = [
        'dino.com.br',
        'gmail.com',
        '@gmail.com',
        'dino@'
    ]

    emails.forEach((email) => {
        const cadastroUsuario = {
            nome: Cypress.env('nomeUsuario'),
            email: email,
            password: "teste",
            administrador: "true"
        }

        cy.api({
            method: 'POST',
            url: `${urlApi}usuarios`,
            body: cadastroUsuario,
            headers: {
            },
            failOnStatusCode: false

        }).then((response) => { return response });
    });
});