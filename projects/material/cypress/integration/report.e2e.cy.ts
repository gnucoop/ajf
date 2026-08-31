// The report filter widget renders single choice form fields. Below the search
// threshold those are a segmented button group, not a mat-radio-group.
describe('ajf-report test with local filter', () => {
  beforeEach(() => cy.visit('/mat-report/?filter=filter'));

  it(`expected default values`, () => {
    cy.get('.ajf-text-container').should('have.text', 'defaultLabelA,defaultLabelB,defaultLabelC');
  });

  it(`expected first values`, () => {
    cy.get('.ajf-segment').should('exist').first().click();
    cy.get('.ajf-text-container').should('have.text', 'firstLabelA,firstLabelB,firstLabelC');
  });

  it(`expected second values`, () => {
    cy.get('.ajf-segment').eq(1).should('exist').click();
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
    cy.get('.ajf-segment').should('have.length', 2);
    cy.get('.ajf-segment').eq(0).click();
    cy.get('.ajf-segment').should('have.length', 8);
  });

  it(`global filter: with (global zones)=> 'first' and (Sub Zones) => 1a, first text widget should be showed 'first1a' text widget with filter should be showed '1a'`, () => {
    cy.get('.ajf-segment').eq(0).click();
    cy.get('.ajf-segment').eq(2).click();
    cy.get('.global').should('have.text', 'first1a');
    cy.get('.local').should('have.text', '1a');
  });
});
