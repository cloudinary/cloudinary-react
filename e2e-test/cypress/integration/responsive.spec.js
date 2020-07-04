describe('Responsive Image', () => {
  it('Responsive Image', () => {
    cy.visit('/');

    cy.get('#responsive')
      .should('have.attr', 'data-src').should('equal','http://res.cloudinary.com/demo/image/upload/c_scale,w_auto/sample')
    cy.get('#responsive')
      .should('have.attr', 'src').should('equal','http://res.cloudinary.com/demo/image/upload/c_scale,w_400/sample')
  });
  it('Disabled Breakpoints', () => {
    cy.visit('/');

    cy.get('#responsive')
      .should('have.attr', 'data-src').should('equal','http://res.cloudinary.com/demo/image/upload/c_scale,w_auto/sample')
    cy.get('#disable-breakpoints')
      .should('have.attr', 'src').should('equal','http://res.cloudinary.com/demo/image/upload/c_scale,w_330/sample')
  });
  it('Enabled Breakpoints', () => {
    cy.visit('/');

    cy.get('#responsive')
      .should('have.attr', 'data-src').should('equal','http://res.cloudinary.com/demo/image/upload/c_scale,w_auto/sample')
    cy.get('#breakpoints')
      .should('have.attr', 'src').should('equal','http://res.cloudinary.com/demo/image/upload/c_scale,w_450/sample')
  });



});