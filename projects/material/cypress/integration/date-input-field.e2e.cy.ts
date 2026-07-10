import {format} from 'date-fns';

describe('ajf-date-input-field', () => {
  beforeEach(() => {
    cy.visit('/mat-date-input-field');
  });

  it('should show a date input field and its datepicker', () => {
    cy.get('input').should('exist');
    cy.get('mat-datepicker').should('exist');
  });

  it('should apply the selected date when OK is clicked', () => {
    const today = new Date();
    cy.get('.mat-datepicker-toggle').click();
    cy.get('.mat-calendar-body-cell.mat-calendar-body-active').click();
    cy.get('[matDatepickerApply]').click();
    cy.get('input').should('have.value', format(today, 'M/d/yyyy'));
  });

  it('should clear the date and close the datepicker when the clear action is used', () => {
    cy.get('.mat-datepicker-toggle').click();
    cy.get('.mat-calendar-body-cell.mat-calendar-body-active').click();
    cy.get('[matDatepickerApply]').click();
    cy.get('input').should('not.have.value', '');

    cy.get('.mat-datepicker-toggle').click();
    cy.contains('button', 'Clear').click();
    cy.get('mat-datepicker-content').should('not.exist');
    cy.get('input').should('have.value', '');
  });
});
