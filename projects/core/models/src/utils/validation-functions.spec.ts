import * as funcs from './expression-utils';

describe('Validation Function', () => {
  it('digitCount should return length in digits', () => {
    let msg = '';

    msg = 'null has no digits';
    expect(funcs.digitCount(<any>null))
      .withContext(msg)
      .toBe(0);

    msg = 'undefined has no digits';
    expect(funcs.digitCount(<any>undefined))
      .withContext(msg)
      .toBe(0);

    msg = 'NaN has no digits';
    expect(funcs.digitCount(NaN)).withContext(msg).toBe(0);

    msg = 'not numbers have no digits';
    expect(funcs.digitCount(<any>'foo'))
      .withContext(msg)
      .toBe(0);
    expect(funcs.digitCount(<any>[]))
      .withContext(msg)
      .toBe(0);
    expect(funcs.digitCount(<any>{foo: 'bar'}))
      .withContext(msg)
      .toBe(0);

    msg = '0 has one digit';
    expect(funcs.digitCount(0)).withContext(msg).toBe(1);

    msg = '1 has one digit';
    expect(funcs.digitCount(1)).withContext(msg).toBe(1);

    msg = '42 has two digits';
    expect(funcs.digitCount(42)).withContext(msg).toBe(2);

    msg = '-42 has two digits';
    expect(funcs.digitCount(-42)).withContext(msg).toBe(2);

    msg = '0.42 has three digits';
    expect(funcs.digitCount(0.42)).withContext(msg).toBe(3);

    msg = 'Infinite values have infinite digits';
    expect(funcs.digitCount(Number.POSITIVE_INFINITY)).withContext(msg).toBe(Infinity);
    expect(funcs.digitCount(Number.NEGATIVE_INFINITY)).withContext(msg).toBe(Infinity);
  });

  it('decimalCount should return length of decimal part', () => {
    let msg = '';

    msg = 'null has no decimal part';
    expect(funcs.decimalCount(<any>null))
      .withContext(msg)
      .toBe(0);

    msg = 'empty string has no decimal part';
    expect(funcs.decimalCount('')).withContext(msg).toBe(0);

    msg = 'undefined has no decimal part';
    expect(funcs.decimalCount(<any>undefined))
      .withContext(msg)
      .toBe(0);

    msg = 'NaN has no decimal part';
    expect(funcs.decimalCount(NaN)).withContext(msg).toBe(0);

    msg = 'objects have no decimal part';
    expect(funcs.decimalCount(<any>{}))
      .withContext(msg)
      .toBe(0);

    msg = '"foo" string has no decimal part';
    expect(funcs.decimalCount('foo')).withContext(msg).toBe(0);

    msg = '"1" string has no decimal part';
    expect(funcs.decimalCount('1')).withContext(msg).toBe(0);

    msg = 'integer has no decimal part';
    expect(funcs.decimalCount(0)).withContext(msg).toBe(0);
    expect(funcs.decimalCount(1)).withContext(msg).toBe(0);
    expect(funcs.decimalCount(42)).withContext(msg).toBe(0);

    msg = '0.42 has two decimal digits';
    expect(funcs.decimalCount(0.42)).withContext(msg).toBe(2);

    msg = '-0.42 has two decimal digits';
    expect(funcs.decimalCount(-0.42)).withContext(msg).toBe(2);

    msg = '"0.42" string has two decimal digits';
    expect(funcs.decimalCount('0.42')).withContext(msg).toBe(2);

    msg = '"0.4200" string has two decimal digits';
    expect(funcs.decimalCount('0.4200')).withContext(msg).toBe(2);
  });
  it('isInt should recognize integers given their string representation', () => {
    let msg = '';

    msg = 'null should not be seen as integer';
    expect(funcs.isInt(<any>null))
      .withContext(msg)
      .toBe(false);

    msg = 'undefined should not be seen as integer';
    expect(funcs.isInt(<any>undefined))
      .withContext(msg)
      .toBe(false);

    msg = 'NaN should not be seen as integer';
    expect(funcs.isInt(NaN)).withContext(msg).toBe(false);

    msg = 'wrong typed value should not be seen as integer';
    expect(funcs.isInt(<any>[]))
      .withContext(msg)
      .toBe(false);
    expect(funcs.isInt(<any>{}))
      .withContext(msg)
      .toBe(false);

    msg = 'empty string should not be seen as integer';
    expect(funcs.isInt('')).withContext(msg).toBe(false);

    msg = '"foo" string should not be seen as integer';
    expect(funcs.isInt('foo')).withContext(msg).toBe(false);

    msg = 'string of float should not be seen as integer';
    expect(funcs.isInt('0.42')).withContext(msg).toBe(false);

    msg = 'string of integer should be seen as integer';
    expect(funcs.isInt('42')).withContext(msg).toBe(true);

    msg = 'string of negative integer should be seen as integer';
    expect(funcs.isInt('-42')).withContext(msg).toBe(true);

    msg = 'float should not be seen as integer';
    expect(funcs.isInt(0.42)).withContext(msg).toBe(false);

    msg = 'integer should be seen as integer';
    expect(funcs.isInt(42)).withContext(msg).toBe(true);

    msg = 'negative integer should be seen as integer';
    expect(funcs.isInt(-42)).withContext(msg).toBe(true);
  });
  it('sumLastProperties should return the sum of the number not the concat string', () => {
    let msg = '';
    const src = [{'a': 3, 'b': 5, 'c': '', 'd': 10}];
    const props = ['a', 'b', 'c', 'd'];

    msg = 'empty string should not be sum as string';
    expect(funcs.sumLastProperties(src, props)).withContext(msg).toBe(18);
  });
  it('extractArray should return the sum of the number not the concat string', () => {
    let msg = '';
    const src = [
      {'a': 3, 'b': ''},
      {'a': 2, 'b': 6},
      {'a': 2, 'b': null},
    ];
    const props = ['a', 'b'];

    msg = 'empty string should not be sum as string';
    expect(funcs.extractArray(src, props[0], props[1])).withContext(msg).toEqual([3, 8, 2]);
  });
});
