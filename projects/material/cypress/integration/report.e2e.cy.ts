describe('ajf-report test with local filter', () => {
  beforeEach(() => cy.visit('/mat-report/?filter=filter'));

  it(`expected default values`, () => {
    cy.get('.ajf-text-container').should('have.text', 'defaultLabelA,defaultLabelB,defaultLabelC');
  });

  it(`expected first values`, () => {
    cy.get('mat-radio-button input').should('exist').first().click();
    cy.get('.ajf-text-container').should('have.text', 'firstLabelA,firstLabelB,firstLabelC');
  });

  it(`expected second values`, () => {
    cy.get('mat-radio-button input').eq(1).should('exist').click();
    cy.get('.ajf-text-container').should('have.text', 'secondLabelA,secondLabelB,secondLabelC');
  });
});

describe('ajf-report test with global filter:', () => {
  beforeEach(() => cy.visit('/mat-report/?filter=global'));

  it(`no selection`, () => {
    cy.get('.global').should('have.text', 'nullnull');
    cy.get('.local').should('have.text', 'null');
  });

  it(`select Global zone with 'first' value activate subzones filter(global and local)`, () => {
    cy.get('mat-radio-button').should('have.length', 2);
    cy.get('mat-radio-button input').eq(0).click();
    cy.get('mat-radio-button').should('have.length', 8);
  });

  it(`global filter: with (global zones)=> 'first' and (Sub Zones) => 1a, first text widget should be showed 'first1a' text widget with filter should be showed '1a'`, () => {
    cy.get('mat-radio-button input').eq(0).click();
    cy.get('mat-radio-button input').eq(2).click();
    cy.get('.global').should('have.text', 'first1a');
    cy.get('.local').should('have.text', '1a');
  });
});
