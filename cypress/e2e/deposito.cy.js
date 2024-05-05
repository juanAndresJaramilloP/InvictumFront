
describe('Pruebas de autenticación y navegación', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[type="email"]').type('c@g.com');
        cy.get('input[type="password"]').type('1');

        cy.get('button').contains('Iniciar Sesión').click();

        cy.get('#summaryButtonL').should('be.visible').click();
        cy.get('#depositButtonL').should('be.visible').click();
        cy.url().should('include', '/Depositar');
    });
    it('permite navegar a la página de deposito desde el botón de depositar', () => {
        cy.get('#summaryButtonL').should('be.visible').click();
        cy.get('#depositButtonL').should('be.visible').click();
        cy.url().should('include', '/Depositar');
    });

    it('verifica el contenido de la página /Depositar', () => {
        cy.get('#depositTitle').should('be.visible');
        cy.get('#depositAmountTitle').should('be.visible');
        cy.get('#amount').should('be.visible').type('1000');
        cy.get('#cardholderTitle').should('be.visible');
        cy.get('#cardholder').should('be.visible').type('Juan Pérez');
        cy.get('#cardnumberTitle').should('be.visible');
        cy.get('#cardnumber').should('be.visible').type('4111111111111111');
        cy.get('#csvTitle').should('be.visible');
        cy.get('#csv').should('be.visible').type('123');
        });
    it('verifica el la navegacion de /Depositar a confirmacion de deposito', () => {
        cy.get('#depositTitle').should('be.visible');
        cy.get('#depositAmountTitle').should('be.visible');
        cy.get('#amount').should('be.visible').type('1000');
        cy.get('#cardholderTitle').should('be.visible');
        cy.get('#cardholder').should('be.visible').type('Juan Pérez');
        cy.get('#cardnumberTitle').should('be.visible');
        cy.get('#cardnumber').should('be.visible').type('4111111111111111');
        cy.get('#csvTitle').should('be.visible');
        cy.get('#csv').should('be.visible').type('123');

        cy.get('#depositButton').should('be.visible').click();
        cy.url().should('include', '/confirmacionDeposito');
    });

    it('verifica el contenido de la página /confirmacionDeposito', () => {
        cy.get('#depositTitle').should('be.visible');
        cy.get('#depositAmountTitle').should('be.visible');
        cy.get('#amount').should('be.visible').type('1000');
        cy.get('#cardholderTitle').should('be.visible');
        cy.get('#cardholder').should('be.visible').type('Juan Pérez');
        cy.get('#cardnumberTitle').should('be.visible');
        cy.get('#cardnumber').should('be.visible').type('4111111111111111');
        cy.get('#csvTitle').should('be.visible');
        cy.get('#csv').should('be.visible').type('123');

        cy.get('#depositButton').should('be.visible').click();
        cy.url().should('include', '/confirmacionDeposito');


        cy.get('#confirmacionDepositoTitle').should('be.visible')
            .contains('Deposito confirmado!');
        cy.get('#confirmacionDepositoDescription').should('be.visible')
            .contains('Su deposito ha sido procesado correctamente.');
        cy.get('#confirmacionDepositoBalance').should('be.visible');
    });

    it('verifica la navegacion de /confirmacionDeposito a /homeLogin', () => {
        cy.get('#depositTitle').should('be.visible');
        cy.get('#depositAmountTitle').should('be.visible');
        cy.get('#amount').should('be.visible').type('1000');
        cy.get('#cardholderTitle').should('be.visible');
        cy.get('#cardholder').should('be.visible').type('Juan Pérez');
        cy.get('#cardnumberTitle').should('be.visible');
        cy.get('#cardnumber').should('be.visible').type('4111111111111111');
        cy.get('#csvTitle').should('be.visible');
        cy.get('#csv').should('be.visible').type('123');

        cy.get('#depositButton').should('be.visible').click();
        cy.url().should('include', '/confirmacionDeposito');

        
        cy.get('#confirmacionDepositoTitle').should('be.visible')
            .contains('Deposito confirmado!');
        cy.get('#confirmacionDepositoDescription').should('be.visible')
            .contains('Su deposito ha sido procesado correctamente.');
        cy.get('#confirmacionDepositoBalance').should('be.visible');

        cy.get('#confirmacionDepositoButton').should('be.visible').click();
        cy.url().should('include', '/homeLogin');
    });
    

    
});
