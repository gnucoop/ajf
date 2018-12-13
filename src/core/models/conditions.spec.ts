import {AjfCondition} from './conditions';


describe('AjfCondition', () => {
  it('should have a condition', () => {
    let condition: AjfCondition = new AjfCondition();

    expect(condition.condition).toEqual('');

    condition = new AjfCondition({'condition' : 'foo'});

    expect(condition.condition).toEqual('foo');

    expect(AjfCondition.alwaysCondition().condition).toBe('true');

    expect(AjfCondition.neverCondition().condition).toBe('false');

    expect(condition.evaluate({foo : 4}, 'foo > 2')).toEqual(true);

    expect(condition.evaluate({foo : false}, 'foo == false')).toEqual(true);

    expect(condition.evaluate({foo : 'foo'}, 'foo == "foo"')).toEqual(true);

    expect(condition.evaluate({foo : '["a", "b", "c"]', b : 'b'},
                              'valueInChoice(foo, b)'))
        .toEqual(true);

    expect(condition.evaluate({foo : 'b', b : 'b'}, 'valueInChoice(foo, b)'))
        .toEqual(true);

    let context = {
      opd_duration : [ 'Day(s)', 'Day(s)', 'Week(s)', 'Once' ],
      opd_duration_day : [ 2, null, null, null ],
      opd_duration_week : [ null, 2, 2, null ],
      opd_freq : [ 1, 2, 8, null ]
    };
    let formula =
        `sum(scanGroupField(opd_duration.length, [], function(result, i) {
                result.push((opd_duration[i] == 'Day(s)' && opd_duration_day[i] * opd_freq[i]) ||
                    (opd_duration[i] == 'Week(s)' && opd_duration_week[i] * opd_freq[i] * 7) ||
                    (opd_duration[i] == 'Once') && 1);
                return result;
            }))`;

    expect(condition.evaluate(context, formula)).toEqual(115);

    expect(
        condition.evaluate(
            {a : '', b : null, c : 0},
            'notEmpty(a) == false && notEmpty(b) == false && notEmpty(c) == true'
        )
    ).toEqual(true);
  });
});
