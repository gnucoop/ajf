import {indicatorToJs} from './hindikit-parser';

describe('indicatorToJs', () => {
  const indicator1 = 'SUM(forms, $pippo, $name = pluto)';
  it(indicator1, () => {
    const result = indicatorToJs(indicator1);
    expect(result).toBe("SUM(forms, 'pippo', (form) => form.name === pluto)");
  });

  const indicator2 = 'SUM(forms, $pippo)';
  it(indicator2, () => {
    const result = indicatorToJs(indicator2);
    expect(result).toBe("SUM(forms, 'pippo')");
  });

  const indicator3 = '[forms[0], 4+(5), IF(foo, pippo, pluto)]';
  it(indicator3, () => {
    const result = indicatorToJs(indicator3);
    expect(result).toBe("[forms[0], 4 + (5), (foo ? pippo : pluto)]");
  });

  const indicator4 = 'OP(a, b, elemA + elemB)';
  it(indicator4, () => {
    const result = indicatorToJs(indicator4);
    expect(result).toBe("OP(a, b, (elemA, elemB) => elemA + elemB)");
  });

  const indicator5 = 'MAP(dates, COUNT_FORMS(progetti, IS_BEFORE($dino_created_at, elem)))';
  it(indicator5, () => {
    const result = indicatorToJs(indicator5);
    expect(result).toBe(
      "MAP(dates, (elem) => COUNT_FORMS(progetti, (form) => IS_BEFORE(form.dino_created_at, elem)))"
    );
  });
});
