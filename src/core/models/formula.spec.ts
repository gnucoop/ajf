import {createFormula} from './public-api';

describe('createFormula', () => {
  it('should create an empty formula with no parameters', () => {
    const formula = createFormula();
    expect(formula.formula).toEqual('');
  });

  it('should create a formula', () => {
    const formula = createFormula({formula: 'foo'});
    expect(formula.formula).toEqual('foo');
  });
});
