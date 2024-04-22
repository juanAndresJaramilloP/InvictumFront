describe('Amazon Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.amazon.com/');
    cy.wait(1000)
  });

  // Busqueda de productos
  it('Searches for a valid product', () => {
    cy.get('#twotabsearchtextbox').type('laptop');
    cy.get('#nav-search-submit-button').click(); 
    cy.get('.s-result-list').should('be.visible');
  });

  it('Shows error message for invalid product search', () => {
    cy.get('#twotabsearchtextbox').type('invalidproductname');
    cy.get('#nav-search-submit-button').click(); 
    cy.contains('No results for').should('be.visible');
  });

  // // Agregar al carrito
  // it('Adds a product to the cart', () => {
  //   cy.get('#twotabsearchtextbox').type('laptop');
  //   cy.get('#nav-search-submit-button').click();
  //   cy.get('.s-result-list').first().find('.a-button-input').click();
  //   cy.get('#huc-v2-order-row-confirm-text').should('be.visible');
  // });

  // it('Shows error message when adding out-of-stock product to cart', () => {
  //   // You need to find an out-of-stock product to test this scenario
  //   // For demonstration purposes, we'll just try adding the first result again
  //   cy.get('#twotabsearchtextbox').type('laptop');
  //   cy.get('#nav-search-submit-button').click(); // Updated selector
  //   cy.get('.s-result-list').first().find('.a-button-input').click();
  //   cy.contains('Currently unavailable').should('be.visible');
  // });

  
});
