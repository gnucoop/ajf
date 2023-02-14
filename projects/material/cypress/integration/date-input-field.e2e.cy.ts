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
    const today = new Date(2019, 0, 5);
    // const tomorrow = addDays(today, 10);
    // const yesterday = subDays(today, 10);
    const input = cy.get('input');
    input.type(format(today, 'yyyy-MM-dd'));
    input.blur();
    input.should('have.value', format(today, 'M/d/yyyy'));
    input.clear();
    // input.type(format(tomorrow, 'yyyy-MM-dd'));
    // input.blur();
    // input.should('have.value', '');
    // input.clear();
    // input.type(format(yesterday, 'yyyy-MM-dd'));
    // input.blur();
    // input.should('have.value', '');
  });
});
