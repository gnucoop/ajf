import {AjfExpressionUtils, createFunction, FILTER_BY} from './public_api';

function evaluate(expression: string, context?: any): any {
  return createFunction(expression)(context);
}

describe('createFunction', () => {
  it('should evaluate simple expressions', () => {
    expect(evaluate('undefined')).toEqual(null);
    expect(evaluate('null')).toEqual(null);
    expect(evaluate('false')).toEqual(false);
    expect(evaluate('5')).toEqual(5);
    expect(evaluate('"pippo"')).toEqual('pippo');
    expect(evaluate('"[]"')).toEqual('[]');
    expect(evaluate('[1, 2, 3]')).toEqual([1, 2, 3]);
    expect(evaluate('{"foo":"bar"}')).toEqual({foo: 'bar'});
    expect(evaluate('pluto', {pluto: 6})).toEqual(6);
  });

  it('should evaluate expressions given a context', () => {
    expect(evaluate('foo > 2', {foo: 4})).toBe(true);
    expect(evaluate('foo == false', {foo: false})).toBe(true);
    expect(evaluate('foo == "foo"', {foo: 'foo'})).toBe(true);
  });

  it('should evaluate builtin functions', () => {
    expect(evaluate('valueInChoice(foo, b)', {foo: 'b', b: 'b'})).toBe(true);
    expect(evaluate('decimalCount(2.23)', {})).toEqual(2);

    let context: any = {
      opd_duration: ['Day(s)', 'Day(s)', 'Week(s)', 'Once'],
      opd_duration_day: [2, null, null, null],
      opd_duration_week: [null, 2, 2, null],
      opd_freq: [1, 2, 8, null],
    };
    let formula = `sum(scanGroupField(opd_duration.length, [], function(result, i) {
                result.push((opd_duration[i] == 'Day(s)' && opd_duration_day[i] * opd_freq[i]) ||
                    (opd_duration[i] == 'Week(s)' && opd_duration_week[i] * opd_freq[i] * 7) ||
                    (opd_duration[i] == 'Once') && 1);
                return result;
            }))`;
    expect(evaluate(formula, context)).toEqual(115);

    formula = 'notEmpty(a) == false && notEmpty(b) == false && notEmpty(c) == true';
    context = {a: '', b: null, c: 0};
    expect(evaluate(formula, context)).toBe(true);
  });

  it('should evaluate custom functions', () => {
    AjfExpressionUtils.utils['customFunction'] = {
      fn: (x: string) => {
        let y: any = {foo: 'bar'};
        return y[x];
      },
    };
    expect(evaluate('customFunction(z)', {z: 'foo'})).toEqual('bar');
    expect(evaluate('customFunction(z)', {z: 'baz'})).toBeUndefined();
  });
});

describe('FILTER_BY', () => {
  it('should not generate invalid expressions when variables have common prefixes', () => {
    const formula = 'pp > pp_a';
    const forms = [
      {pp: 7, pp_a: 3},
      {pp: 2, pp_a: 8},
    ];
    const result = FILTER_BY(forms, formula).filter(form => form != null);
    expect(result.length).toBe(1);
  });
});
