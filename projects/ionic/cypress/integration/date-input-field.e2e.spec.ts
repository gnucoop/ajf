import {addDays, format, subDays} from 'date-fns';

describe('ajf-date-input-field', () => {
  beforeEach(() => {
    cy.visit('/ion-date-input-field');
  });

  it('should show a date input field', () => {
    cy.get('input[type=date]').should('exist');
  });

  it('should prevent selecting dates before minDate and after maxDate', () => {
    const today = new Date(2019, 0, 5);
    const tomorrow = addDays(today, 1);
    const yesterday = subDays(today, 1);
    const input = cy.get('input[type=date]');
    input.type(format(today, 'yyyy-MM-dd'));
    input.blur();
    input.should('have.value', format(today, 'yyyy-MM-dd'));
    input.type(format(tomorrow, 'yyyy-MM-dd'));
    input.blur();
    input.should('have.value', '');
    input.type(format(today, 'yyyy-MM-dd'));
    input.blur();
    input.should('have.value', format(today, 'yyyy-MM-dd'));
    input.type(format(yesterday, 'yyyy-MM-dd'));
    input.blur();
    input.should('have.value', '');
  });
});
