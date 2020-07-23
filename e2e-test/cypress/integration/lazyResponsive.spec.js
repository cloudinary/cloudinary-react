describe('Lazy Responsive Image', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('/');
    cy.get('#lazyResponsiveBtn').click();          // Click on button
  });
  it('Should not have src attribute when not in view', () => {
    cy.get('#lazyResponsive')
      .should('not.be.visible')
      .should('not.have.attr', 'src');
  });
  it('Should have src attribute when view', () => {
    cy.scrollTo(0, 3000);
    cy.get('#lazyResponsive')
      .should('be.visible')
      .should('have.attr', 'src').should('equal', 'http://res.cloudinary.com/demo/image/upload/c_scale,w_400/sample');
  });
});