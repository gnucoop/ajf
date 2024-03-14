import {format} from 'date-fns';

describe('ajf-date-input-field', () => {
  beforeEach(() => {
    cy.visit('/mat-date-input-field');
  });

  it('should show a date input field and its datepicker', () => {
    cy.get('input').should('exist');
    cy.get('mat-datepicker').should('exist');
  });

  it('should prevent selecting dates before minDate and after maxDate', () => {
    const today = new Date();
    cy.get('.mat-datepicker-toggle').click();
    cy.get('.mat-calendar-body-cell.mat-calendar-body-active').click();
    cy.get('input').should('have.value', format(today, 'M/d/yyyy'));
  });
});
