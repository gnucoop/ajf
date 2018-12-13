import {AjfFormula} from './formula';
import {AjfValidatedProperty} from './validated-property';


describe('AjfFormula', () => {
  it('should have a formula', () => {
    let formula: AjfFormula = new AjfFormula();

    expect(formula.formula).toBeNull();

    formula = new AjfFormula({'formula' : 'foo'});

    expect(formula.formula).toEqual('foo');
  });

  it('should evaluate built-in functions', () => {
    const formula: AjfFormula = new AjfFormula({'formula': 'decimalCount(2.23)'});

    expect(formula.evaluate()).toEqual(2);
  });

  it('should evaluate custom functions', () => {
    AjfValidatedProperty.utils['customFunction'] = {fn: (x: string) => {
      let y: any = {foo: 'bar'};
      return y[x];
    }};

    let formula: AjfFormula = new AjfFormula({'formula': 'customFunction(z)'});

    expect(formula.evaluate({z: 'foo'})).toEqual('bar');
    expect(formula.evaluate({z: 'baz'})).toBeUndefined();
  });
});
