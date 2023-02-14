describe('ajf-calendar', () => {
  it('should show a calendar', () => {
    cy.visit('/mat-calendar');
    cy.get('ajf-calendar').should('exist');
  });
});
