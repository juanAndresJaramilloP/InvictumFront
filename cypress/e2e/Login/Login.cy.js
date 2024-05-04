describe('Pruebas de autenticación y navegación', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[type="email"]').type('c@g.com');
        cy.get('input[type="password"]').type('1');
        cy.wait(50); 
        cy.get('button').contains('Iniciar Sesión').click();
        cy.wait(50);
    });

    it('permite a un usuario iniciar sesión y redirige a /homeLogin', () => {
        cy.get('h1').contains('La Mejor Manera de Empezar a Construir Riqueza').should('be.visible');
        cy.get('#botonEducacionL').should('be.visible');
        cy.get('#summaryButtonL').should('be.visible');
        cy.get('#reportesButton').should('be.visible');
    });

    
});