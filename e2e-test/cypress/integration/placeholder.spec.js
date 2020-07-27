describe('Placeholder Image', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('/');
    cy.get('#placeholderBtn').click();
  });

  /**
   * Cypress seems to be not fast enough to catch the placeholder render.
   * So we test that the placeholder is rendered in our Unit Tests,
   * And here we make sure that eventually we render the original image.
   */
  it('Show original image', () => {
    cy.get('#placeholder')
      .should('be.visible')
      .should('have.attr', 'src').should('equal', 'http://res.cloudinary.com/demo/image/upload/c_scale,w_300/sample')
  });
});