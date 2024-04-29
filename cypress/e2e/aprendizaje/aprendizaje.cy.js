describe('Login E2E Tests', () => {
    it('allows a user to log in and redirects to /homeLogin', () => {
        // Configurar la interceptación antes de visitar la página
        cy.intercept('GET', '/users.json').as('loadUsers');

        // Visita la página de inicio de sesión
        cy.visit('http://localhost:3000/login');

        // Esperar a que los datos del usuario se carguen
        cy.wait('@loadUsers');

        // Llena el formulario de inicio de sesión
        cy.get('input[type="email"]').type('njeffcock5@gizmodo.com');
        cy.get('input[type="password"]').type('yP7(BD');
        cy.wait(5000); 
        // Hacer clic en el botón de inicio de sesión
        cy.get('button').contains('Iniciar Sesión').click();

        // Intercepta la navegación que ocurre después del inicio de sesión
        cy.intercept('GET', '/homeLogin').as('homeLogin');

        // Esperar un tiempo razonable para que se cargue el estado en HomeLogin
        cy.wait(5000); // Espera 2 segundos (ajusta según sea necesario)

        // Verificar si se muestra el contenido esperado en /homeLogin
        cy.get('h1').contains('Bienvenido a tu dashboard').should('be.visible');
    });
});
