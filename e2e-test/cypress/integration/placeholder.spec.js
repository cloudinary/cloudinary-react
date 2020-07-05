describe('Placeholder Image', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('/');
    cy.get('#placeholderBtn').click();          // Click on button
  });
  it('Should request placeholder image', () => {
    cy.window().then((win) => {
      const networkRequests = win.performance.getEntries().map(r => r.name);
      expect(networkRequests.indexOf("http://res.cloudinary.com/demo/image/upload/c_scale,w_300/e_blur:2000,f_auto,q_1/sample") > -1).to.eq(true);
    });
  });
  it('Should request original image', () => {
    cy.window().then((win) => {
      const networkRequests = win.performance.getEntries().map(r => r.name);
      expect(networkRequests.indexOf("http://res.cloudinary.com/demo/image/upload/c_scale,w_300/sample") > -1).to.eq(true);
    });
  });
  it('Show original image', () => {
    cy.get('#placeholder')
      .should('have.attr', 'src').should('equal', 'http://res.cloudinary.com/demo/image/upload/c_scale,w_300/sample')
  });
});