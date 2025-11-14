const urlApi = Cypress.config('urlApi')

Cypress.Commands.add('loginUsuario', () => {
    const loginoUsuario = {
        email: Cypress.env('email'),
        password: "teste",
    }

    cy.api({
        method: 'POST',
        url: `${urlApi}login`,
        body: loginoUsuario,
        headers: {
        },
        failOnStatusCode: false

    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.authorization).is.not.null;
        expect(response.body.message).to.eq('Login realizado com sucesso');
        Cypress.env('tokenUsuario', response.body.authorization);
    });
});

Cypress.Commands.add('loginUsuarioInvalido', () => {
    const emails = [
        'dino.com.br',
        'gmail.com',
        '@gmail.com',
        'dino@'
    ]

    emails.forEach((email) => {
        const loginoUsuario = {
            email: email,
            password: "teste",
        }

        cy.api({
            method: 'POST',
            url: `${urlApi}login`,
            body: loginoUsuario,
            headers: {
            },
            failOnStatusCode: false

        }).then((response) => { return response });
    });
});