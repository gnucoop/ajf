import {ENG} from '../../transloco/src/eng';
import {FRA} from '../../transloco/src/fra';

const origStrings = Object.keys(ENG).slice(0, 10);
const trnStrings = origStrings.map(str => FRA[str]);

describe('transloco', () => {
  beforeEach(() => cy.visit('/transloco'));

  it('should support override of the default transloco configuration', () => {
    const strNum = origStrings.length;
    cy.get('.test-string').should('have.length', strNum);
    for (let i = 0; i < strNum; i++) {
      cy.get(`.test-string:nth-of-type(${i + 1})`).should('have.text', origStrings[i]);
    }
    cy.get('mat-select').click();
    cy.get('mat-option:contains("FRA")').click();
    for (let i = 0; i < strNum; i++) {
      cy.get(`.test-string:nth-of-type(${i + 1})`).should('have.text', trnStrings[i]);
    }
  });
});
