import {format} from 'date-fns';
import {join} from 'path';

describe('ajf-widget-export', () => {
  beforeEach(() => cy.visit('/mat-report'));

  it('should show the export menu for an exportable widget', () => {
    cy.get('ajf-widget-export').should('exist');
    cy.get('.ajf-export-menu').should('exist').should('not.be.visible');
    cy.get('ajf-widget-export').trigger('mouseenter');
    cy.get('.ajf-export-menu').should('be.visible');
  });

  it('should download widget data in csv', () => {
    cy.get('ajf-widget-export').trigger('mouseenter');
    cy.get('button:contains("CSV")').click();
    const downloadsFolder = Cypress.config('downloadsFolder');
    const fileName = `Chart ${format(new Date(), `yyyy-MM-dd`)}.csv`;
    cy.readFile(join(downloadsFolder, fileName));
  });

  it('should download widget data in xlsx', () => {
    cy.get('ajf-widget-export').trigger('mouseenter');
    cy.get('button:contains("XLSX")').click();
    const downloadsFolder = Cypress.config('downloadsFolder');
    const fileName = `Chart ${format(new Date(), `yyyy-MM-dd`)}.xlsx`;
    cy.readFile(join(downloadsFolder, fileName));
  });
});
