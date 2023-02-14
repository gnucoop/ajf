describe('ajf-table-field', () => {
  beforeEach(() => cy.visit('/ion-table-field'));

  it('should show a table field', () => {
    cy.get('.ajf-table-field').should('exist');
    cy.get('td').should('have.length', 12);
    cy.get('td').eq(0).should('have.text', ' 2.1 ');
    cy.get('td').eq(4).should('have.text', ' Row 1 ');
    cy.get('td').eq(8).should('have.text', ' Row 2 ');
  });

  it('should show table header', () => {
    cy.get('td').eq(1).should('have.text', ' Label 1 ');
    cy.get('td').eq(2).should('have.text', ' Label 2 ');
    cy.get('td').eq(3).should('have.text', ' Label 3 ');
  });

  it('should show an input on data cell click', () => {
    cy.get('tr:nth-of-type(2) td').eq(1).click();
    cy.get('input').should('exist');
    cy.get('tr:nth-of-type(2) td').eq(3).click();
    cy.get('input').should('exist');
  });

  it('should go to next cell when pressed the tab key in input', () => {
    cy.get('td').eq(5).click();
    cy.get('tr:nth-of-type(2) td:nth-of-type(2) input')
      .should('exist')
      .type('\t')
      .should('not.exist');
    cy.get('tr:nth-of-type(2) td:nth-of-type(3) input').should('exist');
  });

  it('should types two input values and check the formula sum result', () => {
    cy.visit('/ion-table-field/?formulas=true');
    cy.get('td').eq(5).click();
    cy.get('input').should('exist').type('1\t');
    cy.get('td').eq(6).click();
    cy.get('input').should('exist').type('1\t');
    cy.get('td').eq(7).should('have.text', '2');
  });
});
