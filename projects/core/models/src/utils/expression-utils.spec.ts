import {
  MainForm,
  evaluateExpression,
  ALL_VALUES_OF,
  SUM,
  MEAN,
  COUNT_FORMS,
  JOIN_FORMS,
  FILTER_BY,
  ADD_DAYS,
  DAYS_DIFF,
  FIRST,
  LAST,
} from './expression-utils';

const forms: MainForm[] = [
  {
    created_at: '0000-00-00',
    dog_name: 'dog1',
    dog_puppies: 3,
    dog_point: 0.1,
    to_check: true,
    reps: {'rep_1': [{dog_type: 'dogtype1', score: 3}]},
  },
  {
    created_at: '2023-02-19',
  },
  {
    created_at: '9999-99-99',
    dog_name: 'dog2',
    to_check: true,
    dog_puppies: 2,
    dog_point: 0.2,
    reps: {
      'rep_1': [{dog_type: 'dogtype1', score: 6}],
      'rep_2': [{dog_type: 'dogtype2', score: 4}],
    },
  },
  {dog_name: 'dog3', to_check: true, reps: {'rep_1': [{dog_type: 'dogtype1', score: 5}]}},
  {dog_name: 'dog4', dog_puppies: 1, reps: {'rep_1': [{dog_type: 'dogtype1', score: 1}]}},
];

describe('ALL_VALUES_OF', () => {
  it('should get all values by key in dataset', () => {
    const result = ALL_VALUES_OF(forms, 'dog_name');
    const dogs = 4;
    expect(result.length).toBe(dogs);
    for (let i = 1; i <= dogs; i++) {
      expect(result).toContain(`dog${i}`);
    }
  });
});

describe('SUM', () => {
  it('should sum the values of one field in dataset', () => {
    const result = SUM(forms, 'dog_puppies', (form: any) => form.to_check === true);
    const dog_puppies = 5;
    expect(result).toBe(dog_puppies);
  });

  it('should sum the values of one field in repeating slide', () => {
    const result = SUM(forms, 'score', (form: any) => form.to_check === true);
    const score = 18;
    expect(result).toBe(score);
  });

  it('should sum the values of one field in repeating slide with condition in rep slide', () => {
    const result = SUM(forms, 'score', 'dog_type === "dogtype1"');
    const score = 15;
    expect(result).toBe(score);
  });
  it('should sum the values with corrent decimal numbers', () => {
    const result = SUM(forms, 'dog_point', 'to_check === true');
    const score = 0.3;
    expect(result).toBe(score);
  });
});

describe('COUNT_FORMS', () => {
  it('should count the forms in dataset with condition', () => {
    const result = COUNT_FORMS(forms, 'to_check === true');
    const count = 3;
    expect(result).toBe(count);
  });

  it('should count the forms with condition in repeating slide', () => {
    const result = COUNT_FORMS(forms, 'dog_type === "dogtype1"');
    const count = 4;
    expect(result).toBe(count);
  });
});

describe('MEAN', () => {
  it('should calculate the mean of a value in dataset', () => {
    const result = MEAN(forms, 'dog_puppies');
    const dog_puppies_mean = 2;
    expect(result).toBe(dog_puppies_mean);
  });
});

describe('JOIN_FORMS', () => {
  it('JOIN_FORMS', () => {
    const age = [{name: 'pippo', age: 10}, {name: 'pluto', age: 20}];
    const gender = [{name: 'pippo', gender: 'm'}, {name: 'pluto', gender: 'm'}];
    const expected = [
      {name: 'pippo', age: 10, gender: 'm', reps: {}},
      {name: 'pluto', age: 20, gender: 'm', reps: {}},
    ];
    const result = JOIN_FORMS(age, gender, 'name');
    expect(result).toEqual(expected);
  });
});

describe('FILTER_BY', () => {
  it('FILTER_BY', () => {
    const nums = [{num: 1}, {num: 2}, {num: 3},
      {ajf_foo_count: 2, reps: {foo: [{num: 4}, {num: 0}]}}] as MainForm[];
    const expected = [{num: 3, reps: {}},
      {ajf_foo_count: 1, reps: {foo: [{num: 4}]}}] as MainForm[];
    const result = FILTER_BY(nums, "num > 2");
    expect(result).toEqual(expected);
  });
});

describe('MAP', () => {
  it('MAP', () => {
    const forms = [{menu: ['pizza', 'fries']}, {menu: ['pizza', 'burger']}];
    const items = ['pizza', 'fries', 'cheese'];
    const result = evaluateExpression(
      "MAP(items, (elem) => COUNT_FORMS(forms, (form) => INCLUDES(form.menu, elem)))",
      {forms, items},
    );
    expect(result).toEqual([2, 1, 0]);
  });
});

describe('date functions', () => {
  it('ADD_DAYS', () => {
    expect(ADD_DAYS('2000-12-31', 1)).toBe('2001-01-01');
    expect(ADD_DAYS('2000-12-30', -15)).toBe('2000-12-15');
  });
  it('DAYS_DIFF', () => {
    expect(DAYS_DIFF('2000-12-31', '2000-12-29')).toBe(2);
    expect(DAYS_DIFF('1998-12-31', '1999-12-31')).toBe(-365);
  });
});

describe('FIRST/LAST', () => {
  it('FIRST', () => {
    expect(FIRST(forms, 'dog_name')).toBe('dog1');
  });
  it('LAST', () => {
    expect(LAST(forms, (f: any) => f.dog_name, 'created_at')).toBe('dog2');
  });
});
