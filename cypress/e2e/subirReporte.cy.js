
describe('Pruebas de autenticación y navegación', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[type="email"]').type('a@g.com');
        cy.get('input[type="password"]').type('1');

        cy.get('button').contains('Iniciar Sesión').click();

        cy.get('#subirReporte').should('be.visible').click();
        cy.url().should('include', '/subirReporte');
    });
    it('permite navegar a la página de subir reportes desde home', () => {
        cy.get('#subirReporte').should('be.visible').click();
        cy.url().should('include', '/subirReporte');
    });

    it('verifica el contenido de la página /subirReporte', () => {
        cy.get('#subirReporteTitle').contains('¡Bienvenido!, Nil Spollen').should('be.visible');
        cy.get('#subirReporteTexto').should('be.visible');
        cy.get('#campoCompleto').should('be.visible');
        
        cy.get('#campo').should('be.visible').type('123456789');
        cy.get('#campoButton').should('be.visible').click();
        cy.get('#correoInvalido').should('be.visible');
        cy.get('#campoTitulo').should('be.disabled');
        cy.get('#submitFile').should('be.disabled');
        cy.get('#campo').should('be.visible').clear().type('c@g.com');
        cy.get('#campoButton').should('be.visible').click();
        cy.get('#correoInvalido').should('not.exist');
       
        cy.get('#campoTitulo').should('be.visible').type('Reporte Patrimonial');
        cy.get('#campoArchivo').selectFile('cypress/fixtures/reporte1.pdf');
        cy.get('#submitFile').should('be.visible').click();


    });
   
});


