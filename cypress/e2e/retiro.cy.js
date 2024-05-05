
describe('Pruebas de autenticación y navegación', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[type="email"]').type('c@g.com');
        cy.get('input[type="password"]').type('1');

        cy.get('button').contains('Iniciar Sesión').click();

        cy.get('#summaryButtonL').should('be.visible').click();
        cy.get('#withdrawButtonL').should('be.visible').click();
        cy.url().should('include', '/Retirar');
    });
    it('permite navegar a la página de retiro desde el botón de retirar en el home', () => {
        cy.get('#summaryButtonL').should('be.visible').click();
        cy.get('#withdrawButtonL').should('be.visible').click();
        cy.url().should('include', '/Retirar');
    });

    it('verifica el contenido de la página /Retirar', () => {
        cy.get('#withdrawTitle').should('be.visible');
        cy.get('#withdrawAmountTitle').should('be.visible');
        cy.get('#amount').should('be.visible').type('1000');
        cy.get('#withdrawAvailable').should('be.visible');
        cy.get('#bankNameTitle').should('be.visible');
        cy.get('#bankName').should('be.visible').type('Juan Pérez');
        cy.get('#accountIdTitle').should('be.visible');
        cy.get('#accountId').should('be.visible').type('4111111111111111');
        cy.get('#cardholderNameTitle').should('be.visible');
        cy.get('#cardholderName').should('be.visible').type('123');

        });
    it('verifica el la navegacion de /Retirar a confirmacion de retiro', () => {
        cy.get('#withdrawTitle').should('be.visible');
        cy.get('#withdrawAmountTitle').should('be.visible');
        cy.get('#amount').should('be.visible').type('1000');
        cy.get('#withdrawAvailable').should('be.visible');
        cy.get('#bankNameTitle').should('be.visible');
        cy.get('#bankName').should('be.visible').type('Juan Pérez');
        cy.get('#accountIdTitle').should('be.visible');
        cy.get('#accountId').should('be.visible').type('4111111111111111');
        cy.get('#cardholderNameTitle').should('be.visible');
        cy.get('#cardholderName').should('be.visible').type('123');

        
        cy.get('#withdrawButton').should('be.visible').click();
        cy.url().should('include', '/confirmacionRetiro');
    });

    it('verifica el contenido de la página /confirmacionRetiro', () => {
        cy.get('#withdrawTitle').should('be.visible');
        cy.get('#withdrawAmountTitle').should('be.visible');
        cy.get('#amount').should('be.visible').type('1000');
        cy.get('#withdrawAvailable').should('be.visible');
        cy.get('#bankNameTitle').should('be.visible');
        cy.get('#bankName').should('be.visible').type('Juan Pérez');
        cy.get('#accountIdTitle').should('be.visible');
        cy.get('#accountId').should('be.visible').type('4111111111111111');
        cy.get('#cardholderNameTitle').should('be.visible');
        cy.get('#cardholderName').should('be.visible').type('123');

        
        cy.get('#withdrawButton').should('be.visible').click();
        cy.url().should('include', '/confirmacionRetiro');


        cy.get('#withdrawConfirmationTitle').should('be.visible')
            .contains('Retiro confirmado!');
        cy.get('#withdrawConfirmationDescription').should('be.visible')
            .contains('Su retiro ha sido procesado exitosamente.');
        cy.get('#withdrawConfirmationBalance').should('be.visible');
    });

    it('verifica la navegacion de /confirmacionDeposito a /homeLogin', () => {
        cy.get('#withdrawTitle').should('be.visible');
        cy.get('#withdrawAmountTitle').should('be.visible');
        cy.get('#amount').should('be.visible').type('1000');
        cy.get('#withdrawAvailable').should('be.visible');
        cy.get('#bankNameTitle').should('be.visible');
        cy.get('#bankName').should('be.visible').type('Juan Pérez');
        cy.get('#accountIdTitle').should('be.visible');
        cy.get('#accountId').should('be.visible').type('4111111111111111');
        cy.get('#cardholderNameTitle').should('be.visible');
        cy.get('#cardholderName').should('be.visible').type('123');

        
        cy.get('#withdrawButton').should('be.visible').click();
        cy.url().should('include', '/confirmacionRetiro');


        cy.get('#withdrawConfirmationTitle').should('be.visible')
            .contains('Retiro confirmado!');
        cy.get('#withdrawConfirmationDescription').should('be.visible')
            .contains('Su retiro ha sido procesado exitosamente.');
        cy.get('#withdrawConfirmationBalance').should('be.visible');

        cy.get('#withdrawConfirmationButton').should('be.visible').click();
        cy.url().should('include', '/homeLogin');
    });
    

    
});
