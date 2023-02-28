import {indicatorToJs} from './hindikit-parser';

describe('indicatorToJs', () => {
  const indicator1 = 'SUM(forms, $pippo, $name = pluto)';
  it(indicator1, () => {
    const result = indicatorToJs(indicator1);
    expect(result).toBe('SUM.call({pluto}, forms, "pippo", "name === pluto")');
  });

  const indicator2 = 'SUM(forms, $pippo)';
  it(indicator2, () => {
    const result = indicatorToJs(indicator2);
    expect(result).toBe('SUM(forms, "pippo")');
  });

  const indicator3 = '[forms[0], 4+(5), IF_THEN_ELSE(foo, pippo, pluto)]';
  it(indicator3, () => {
    const result = indicatorToJs(indicator3);
    expect(result).toBe('[forms[0], 4 + (5), (foo ? pippo : pluto)]');
  });
});
