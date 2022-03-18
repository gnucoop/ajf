import {AjfExpressionUtils, evaluateExpression, validateExpression} from './public_api';

describe('evaluateExpression', () => {
  it('should evalute expressions given a context', () => {
    expect(evaluateExpression('foo > 2', {foo: 4})).toBe(true);
    expect(evaluateExpression('foo == false', {foo: false})).toBe(true);
    expect(evaluateExpression('foo == "foo"', {foo: 'foo'})).toBe(true);
  });

  it('should evaluate builtin functions', () => {
    expect(evaluateExpression('valueInChoice(foo, b)', {foo: 'b', b: 'b'})).toBe(true);
    expect(evaluateExpression('decimalCount(2.23)', {})).toEqual(2);

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
    expect(evaluateExpression(formula, context)).toEqual(115);

    formula = 'notEmpty(a) == false && notEmpty(b) == false && notEmpty(c) == true';
    context = {a: '', b: null, c: 0};
    expect(evaluateExpression(formula, context)).toBe(true);
  });

  it('should evaluate custom functions', () => {
    AjfExpressionUtils.utils['customFunction'] = {
      fn: (x: string) => {
        let y: any = {foo: 'bar'};
        return y[x];
      },
    };
    expect(evaluateExpression('customFunction(z)', {z: 'foo'})).toEqual('bar');
    expect(evaluateExpression('customFunction(z)', {z: 'baz'})).toBeUndefined();
  });
});

describe('validateExpression', () => {
  it('should validate code as executable given an optional context', () => {
    expect(validateExpression('(1 + 2) / 3')).toBe(true);

    expect(validateExpression('(foo + 2) / 3', {'foo': 1})).toBe(true);

    expect(validateExpression('(foo + 2) / 3')).toBe(false);
  });
});
