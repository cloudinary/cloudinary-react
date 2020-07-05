describe('Placeholder Lazy Load Image', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('/');
    cy.get('#lazyPlaceholderBtn').click();          // Click on button
  });
  it('Should not have src attribute when not in view', () => {
    cy.get('#lazyPlaceholder-cld-placeholder')
      .should('not.be.visible')
      .should('not.have.attr', 'src');
    cy.get('#lazyPlaceholder-cld-placeholder')
      .should('have.attr', 'data-src').should('equal', "http://res.cloudinary.com/demo/image/upload/c_scale,w_300/e_blur:2000,f_auto,q_1/sample");
  });
  it('Should have src attribute when view', () => {
    cy.scrollTo(0, 3000);
    cy.get('#lazyPlaceholder')
      .should('be.visible')
      .should('have.attr', 'src').should('equal', 'http://res.cloudinary.com/demo/image/upload/c_scale,w_300/sample');
  });
});