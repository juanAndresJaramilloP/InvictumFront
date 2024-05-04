
describe('Pruebas de autenticación y navegación', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[type="email"]').type('c@g.com');
        cy.get('input[type="password"]').type('1');

        cy.get('button').contains('Iniciar Sesión').click();

        cy.get('#botonEducacionL').should('be.visible').click();
        cy.url().should('include', '/Aprendizaje');
    });
    it('permite navegar a la página de aprendizaje desde el botón de reportes', () => {
        cy.get('#botonEducacionL').should('be.visible').click();
        cy.url().should('include', '/Aprendizaje');
    });

    it('verifica el contenido de la página /Aprendizaje', () => {
        cy.get('#tituloAcordeon').should('be.visible');
        cy.get('#moduloAprendizaje').should('exist');
        cy.get('#moduloAprendizaje > div').each(($el, index, $list) => {
            cy.wrap($el).find('.collapse-title').should('exist').click();
            cy.wrap($el).find('.collapse-content button').should('exist');
        });
    });
    
});
