// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="cypress" />

it('Register new domain and wait until committment', () => {
    cy.visit('/');

    cy.get('button').contains('Listen').click();
    cy.contains('Stop listening');

    cy.get('input').type('bob');
    cy.get('button').contains('Register domain').click();

    let actualHash;

    cy.contains('Transaction payload hash:')
        .then((x) => {
            [, actualHash] = x.text().match(/payload hash: ([0-9a-f]+)/);
        })
        .then(() => {
            cy.get('ul').within(() => {
                cy.contains(`Transaction ${actualHash} status: committed`);
            });
        });
});
