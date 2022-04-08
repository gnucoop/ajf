describe('ajf-graph', () => {
  it('should render a graph', () => {
    cy.visit('/graph');
    cy.get('ajf-graph').should('exist');
    cy.get('svg').should('exist');
  });
});
