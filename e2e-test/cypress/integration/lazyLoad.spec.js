describe('Placeholder Image', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('/');
    cy.get('#lazyBtn').click();          // Click on button
  });
  it('Should not have src attribute when not in view', () => {
    cy.get('#lazy')
      .should('not.be.visible')
      .should('not.have.attr', 'src');
  });
  it('Should have src attribute when view', () => {
    cy.scrollTo(0, 3000);
    cy.get('#lazy')
      .should('have.attr', 'src').should('equal', 'http://res.cloudinary.com/demo/image/upload/c_scale,w_300/sample')
  });
  it('Should have width when in view', () => {
    cy.scrollTo(0, 3000);
    cy.get('#lazy')
      .should('have.css', 'width')
    cy.get('#lazy').invoke('outerWidth')
      .should('be.gt', 0);
  });
  it('Should have height when in view', () => {
    cy.scrollTo(0, 3000);
    cy.get('#lazy')
      .should('have.css', 'height')
    cy.get('#lazy').invoke('outerHeight')
      .should('be.gt', 0);
  });
});
