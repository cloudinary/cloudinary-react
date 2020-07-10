describe('Responsive Image', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('/');
    cy.get('#responsiveBtn').click();          // Click on button
  });
  it('Responsive Image Override', () => {
    cy.get('#responsive-override')
      .should('have.attr', 'data-src').should('equal','http://res.cloudinary.com/demo/image/upload/c_scale,w_100/sample')
    cy.get('#responsive-override')
      .should('have.attr', 'src').should('equal','http://res.cloudinary.com/demo/image/upload/c_scale,w_100/sample')
  });
  it('Responsive Image', () => {
    cy.get('#responsive')
      .should('have.attr', 'data-src').should('equal','http://res.cloudinary.com/demo/image/upload/c_scale,w_auto/sample')
    cy.get('#responsive')
      .should('have.attr', 'src').should('equal','http://res.cloudinary.com/demo/image/upload/c_scale,w_400/sample')
  });
  it('Disabled Breakpoints', () => {
    cy.get('#responsive')
      .should('have.attr', 'data-src').should('equal','http://res.cloudinary.com/demo/image/upload/c_scale,w_auto/sample')
    cy.get('#disable-breakpoints')
      .should('have.attr', 'src').should('equal','http://res.cloudinary.com/demo/image/upload/c_scale,w_330/sample')
  });
  it('Enabled Breakpoints', () => {
    cy.get('#responsive')
      .should('have.attr', 'data-src').should('equal','http://res.cloudinary.com/demo/image/upload/c_scale,w_auto/sample')
    cy.get('#breakpoints')
      .should('have.attr', 'src').should('equal','http://res.cloudinary.com/demo/image/upload/c_scale,w_450/sample')
  });
});