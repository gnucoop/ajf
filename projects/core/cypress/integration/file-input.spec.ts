describe('ajf-file-input', () => {
  it('should render a file input', () => {
    cy.visit('/file-input');
    cy.get('ajf-file-input').should('exist');
  });
});
