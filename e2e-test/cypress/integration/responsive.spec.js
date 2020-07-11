/**
 * When 'responsive' is passed to the Image component, cloudinary-core generates a data-src attribute instead of src.
 * Then cloudinary.responsive() is called, it will add a 'src' attribute with calculated width according to the size
 * of the <img> element's container.
 * In these tests we first test for existence of 'data-src' attribute, and then we check that 'src' was also generated.
 * Remember that Cypress removes the need to add a wait or timeout, and waits for a test to be true until it's default
 * timeout is reached.
 */
describe('Responsive Image', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('/');
    cy.get('#responsiveBtn').click();          // Click on button
  });
  // Here responsive() is called, but since a specified width value was passed (100) alongside responsive,
  // The responsive() function does not change the width param of the transformation, because the specified width
  // "overrides" the responsiveness. in other words, specifying a width value is stronger then the 'responsive' prop.
  it('Should generate transformation with specified width value', () => {
    cy.get('#responsive-override')
      .should('have.attr', 'data-src').should('equal', 'http://res.cloudinary.com/demo/image/upload/c_scale,w_100/sample')
    cy.get('#responsive-override')
      .should('have.attr', 'src').should('equal', 'http://res.cloudinary.com/demo/image/upload/c_scale,w_100/sample')
    cy.get('#responsive-override')
      .should('have.attr', 'width').should('equal', '100')
  });
  it('Responsive Image', () => {
    cy.get('#responsive')
      .should('have.attr', 'data-src').should('equal', 'http://res.cloudinary.com/demo/image/upload/c_scale,w_auto/sample')
    cy.get('#responsive')
      .should('have.attr', 'src').should('equal', 'http://res.cloudinary.com/demo/image/upload/c_scale,w_400/sample')
  });
  it('Disabled Breakpoints', () => {
    cy.get('#responsive')
      .should('have.attr', 'data-src').should('equal', 'http://res.cloudinary.com/demo/image/upload/c_scale,w_auto/sample')
    cy.get('#disable-breakpoints')
      .should('have.attr', 'src').should('equal', 'http://res.cloudinary.com/demo/image/upload/c_scale,w_330/sample')
  });
  it('Enabled Breakpoints', () => {
    cy.get('#responsive')
      .should('have.attr', 'data-src').should('equal', 'http://res.cloudinary.com/demo/image/upload/c_scale,w_auto/sample')
    cy.get('#breakpoints')
      .should('have.attr', 'src').should('equal', 'http://res.cloudinary.com/demo/image/upload/c_scale,w_450/sample')
  });
});