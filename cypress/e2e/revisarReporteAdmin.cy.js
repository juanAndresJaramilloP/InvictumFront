
describe('Pruebas de autenticación y navegación', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[type="email"]').type('a@g.com');
        cy.get('input[type="password"]').type('1');

        cy.get('button').contains('Iniciar Sesión').click();

        cy.get('#reportesButton').should('be.visible').click();
        cy.url().should('include', '/reportesGestor');
    });
    it('permite navegar a la página de reportes desde el botón de reportees', () => {
        cy.get('#reportesButton').should('be.visible').click();
        cy.url().should('include', '/reportesGestor');
    });

    it('verifica el contenido de la página /reportesGestor', () => {
        cy.get('#PDFV').should('be.visible');
        cy.get('#1').should('exist');
        cy.get('#2').should('exist');
        cy.get('#0').should('exist');
        cy.get('#boton').should('be.visible').click();
        cy.get('#1').should('be.visible');
        cy.get('#2').should('be.visible');
        cy.get('#0').should('be.visible');
   
    });
    
    
});
