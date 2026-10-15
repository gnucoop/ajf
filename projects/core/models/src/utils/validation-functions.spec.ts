import * as funcs from './expression-utils';

describe('Validation Function', () => {
  it('digitCount should return length in digits', () => {
    let msg = '';

    msg = 'null has no digits';
    expect(funcs.digitCount(<any>null), msg).toBe(0);

    msg = 'undefined has no digits';
    expect(funcs.digitCount(<any>undefined), msg).toBe(0);

    msg = 'NaN has no digits';
    expect(funcs.digitCount(NaN), msg).toBe(0);

    msg = 'not numbers have no digits';
    expect(funcs.digitCount(<any>'foo'), msg).toBe(0);
    expect(funcs.digitCount(<any>[]), msg).toBe(0);
    expect(funcs.digitCount(<any>{foo: 'bar'}), msg).toBe(0);

    msg = '0 has one digit';
    expect(funcs.digitCount(0), msg).toBe(1);

    msg = '1 has one digit';
    expect(funcs.digitCount(1), msg).toBe(1);

    msg = '42 has two digits';
    expect(funcs.digitCount(42), msg).toBe(2);

    msg = '-42 has two digits';
    expect(funcs.digitCount(-42), msg).toBe(2);

    msg = '0.42 has three digits';
    expect(funcs.digitCount(0.42), msg).toBe(3);

    msg = 'Infinite values have infinite digits';
    expect(funcs.digitCount(Number.POSITIVE_INFINITY), msg).toBe(Infinity);
    expect(funcs.digitCount(Number.NEGATIVE_INFINITY), msg).toBe(Infinity);
  });

  it('decimalCount should return length of decimal part', () => {
    let msg = '';

    msg = 'null has no decimal part';
    expect(funcs.decimalCount(<any>null), msg).toBe(0);

    msg = 'empty string has no decimal part';
    expect(funcs.decimalCount(''), msg).toBe(0);

    msg = 'undefined has no decimal part';
    expect(funcs.decimalCount(<any>undefined), msg).toBe(0);

    msg = 'NaN has no decimal part';
    expect(funcs.decimalCount(NaN), msg).toBe(0);

    msg = 'objects have no decimal part';
    expect(funcs.decimalCount(<any>{}), msg).toBe(0);

    msg = '"foo" string has no decimal part';
    expect(funcs.decimalCount('foo'), msg).toBe(0);

    msg = '"1" string has no decimal part';
    expect(funcs.decimalCount('1'), msg).toBe(0);

    msg = 'integer has no decimal part';
    expect(funcs.decimalCount(0), msg).toBe(0);
    expect(funcs.decimalCount(1), msg).toBe(0);
    expect(funcs.decimalCount(42), msg).toBe(0);

    msg = '0.42 has two decimal digits';
    expect(funcs.decimalCount(0.42), msg).toBe(2);

    msg = '-0.42 has two decimal digits';
    expect(funcs.decimalCount(-0.42), msg).toBe(2);

    msg = '"0.42" string has two decimal digits';
    expect(funcs.decimalCount('0.42'), msg).toBe(2);

    msg = '"0.4200" string has two decimal digits';
    expect(funcs.decimalCount('0.4200'), msg).toBe(2);
  });
  it('isInt should recognize integers given their string representation', () => {
    let msg = '';

    msg = 'null should not be seen as integer';
    expect(funcs.isInt(<any>null), msg).toBe(false);

    msg = 'undefined should not be seen as integer';
    expect(funcs.isInt(<any>undefined), msg).toBe(false);

    msg = 'NaN should not be seen as integer';
    expect(funcs.isInt(NaN), msg).toBe(false);

    msg = 'wrong typed value should not be seen as integer';
    expect(funcs.isInt(<any>[]), msg).toBe(false);
    expect(funcs.isInt(<any>{}), msg).toBe(false);

    msg = 'empty string should not be seen as integer';
    expect(funcs.isInt(''), msg).toBe(false);

    msg = '"foo" string should not be seen as integer';
    expect(funcs.isInt('foo'), msg).toBe(false);

    msg = 'string of float should not be seen as integer';
    expect(funcs.isInt('0.42'), msg).toBe(false);

    msg = 'string of integer should be seen as integer';
    expect(funcs.isInt('42'), msg).toBe(true);

    msg = 'string of negative integer should be seen as integer';
    expect(funcs.isInt('-42'), msg).toBe(true);

    msg = 'float should not be seen as integer';
    expect(funcs.isInt(0.42), msg).toBe(false);

    msg = 'integer should be seen as integer';
    expect(funcs.isInt(42), msg).toBe(true);

    msg = 'negative integer should be seen as integer';
    expect(funcs.isInt(-42), msg).toBe(true);
  });
});
