
describe('Pruebas de autenticación y navegación', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[type="email"]').type('c@g.com');
        cy.get('input[type="password"]').type('1');

        cy.get('button').contains('Iniciar Sesión').click();

        cy.get('#botonEducacionL').should('be.visible').click();
        cy.url().should('include', '/Aprendizaje');
    });
    it('permite navegar a la página de aprendizaje desde el botón de aprendizaje', () => {
        cy.get('#botonEducacionL').should('be.visible').click();
        cy.url().should('include', '/Aprendizaje');
    });

    it('verifica el contenido de la página /Aprendizaje y navega a un video detalle', () => {
        cy.get('#tituloAcordeon').should('be.visible');
        cy.get('#moduloAprendizaje').should('exist');


        cy.get('#moduloAprendizaje > div').eq(0).each(($div, index) => {  
            cy.wrap($div)
              .find(`input[name="accordion-${index}"]`) 
              .then($checkbox => {
                if (!$checkbox.prop('checked')) { 
                    cy.wrap($checkbox).click();
                }
              });
     
            //cy.get('#1').should('be.visible').click(); 
            cy.contains('button', 'Prothena').click();
            cy.url().should('include', '/Aprendizaje/videos/');
        });

    });
    it('prueba los botones de ir adelante y atras en los videos y el boton de volver al menu anterior', () => {
        cy.get('#tituloAcordeon').should('be.visible');
        cy.get('#moduloAprendizaje').should('exist');


        cy.get('#moduloAprendizaje > div').eq(0).each(($div, index) => {  
            cy.wrap($div)
              .find(`input[name="accordion-${index}"]`) 
              .then($checkbox => {
                if (!$checkbox.prop('checked')) { 
                    cy.wrap($checkbox).click();
                }
              });
     
            //cy.get('#1').should('be.visible').click(); 
            cy.contains('button', 'Prothena').click();
            cy.url().should('include', '/Aprendizaje/videos/Prothena');
            cy.contains('h1', 'Prothena').should('be.visible');
            cy.wait(100);
            cy.contains('button', 'Siguiente').should('be.visible').click();
            cy.wait(100);
            cy.url().should('include', '/Aprendizaje/videos/SemiLEDS');
            cy.wait(100);
            cy.contains('h1', 'SemiLEDS').should('be.visible');
            cy.contains('button', 'Anterior').should('be.visible').click();
            cy.wait(100);
            cy.url().should('include', '/Aprendizaje/videos/Prothena');
            cy.contains('button', 'Salir al menu principal').should('be.visible').click();
            cy.wait(100);
            cy.url().should('include', '/Aprendizaje');
        });

    });
    
});
