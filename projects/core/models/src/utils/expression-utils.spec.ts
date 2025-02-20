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
  GET_AGE,
  APPLY_LABELS,
  MEDIAN,
  MODE,
  ROUND,
} from './expression-utils';

const schema = {
  choicesOrigins: [
    {
      choices: [
        {
          value: 'choiceValue1',
          label: 'choiceLabel1',
        },
        {
          value: 'choiceValue2',
          label: 'choiceLabel2',
        },
      ],
    },
  ],
};

const forms: MainForm[] = [
  {
    created_at: '0000-00-00',
    dog_name: 'dog1',
    dog_puppies: 3,
    dog_years: 5,
    dog_point: 0.1,
    to_check: true,
    single_choice: 'choiceValue1',
    reps: {'rep_1': [{dog_type: 'dogtype1', score: 3, multiple_choice: ['choiceValue2'] as any}]},
  },
  {
    created_at: '2023-02-19',
  },
  {
    created_at: '9999-99-99',
    dog_name: 'dog2',
    to_check: true,
    dog_puppies: 2,
    dog_years: 8,
    dog_point: 0.2,
    reps: {
      'rep_1': [{dog_type: 'dogtype1', score: 6}],
      'rep_2': [{dog_type: 'dogtype2', score: 4}],
    },
  },
  {
    dog_name: 'dog3',
    dog_years: 11,
    to_check: true,
    reps: {'rep_1': [{dog_type: 'dogtype1', score: 5}]},
  },
  {
    dog_name: 'dog4',
    dog_puppies: 1,
    dog_years: 7,
    reps: {'rep_1': [{dog_type: 'dogtype1', score: 1}]},
  },
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

describe('MEDIAN', () => {
  it('should calculate the median of a value in dataset', () => {
    const result = MEDIAN(forms, 'dog_puppies');
    const dog_puppies_median = 2;
    expect(result).toBe(dog_puppies_median);
    const resultY = MEDIAN(forms, 'dog_years');
    const dog_years_median = 7.5;
    expect(resultY).toBe(dog_years_median);
  });
});

describe('JOIN_FORMS', () => {
  it('JOIN_FORMS', () => {
    const age = [
      {name: 'pippo', age: 10},
      {name: 'pluto', age: 20},
    ];
    const gender = [
      {name: 'pippo', gender: 'm'},
      {name: 'pluto', gender: 'm'},
    ];
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
    const nums = [
      {num: 1},
      {num: 2},
      {num: 3},
      {ajf_foo_count: 2, reps: {foo: [{num: 4}, {num: 0}]}},
    ] as MainForm[];
    const expected = [
      {num: 3, reps: {}},
      {ajf_foo_count: 1, reps: {foo: [{num: 4}]}},
    ] as MainForm[];
    const result = FILTER_BY(nums, 'num > 2');
    expect(result).toEqual(expected);
  });
});

describe('MAP', () => {
  it('MAP', () => {
    const forms = [{menu: ['pizza', 'fries']}, {menu: ['pizza', 'burger']}];
    const items = ['pizza', 'fries', 'cheese'];
    const result = evaluateExpression(
      'MAP(items, (elem) => COUNT_FORMS(forms, (form) => INCLUDES(form.menu, elem)))',
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

describe('GET_AGE', () => {
  it("GET_AGE('1989-02-19', '1989-02-19')", () => {
    expect(GET_AGE('1989-02-19', '1989-02-19')).toBe(0);
  });
  it("GET_AGE('1989-02-19', '1989-02-18')", () => {
    expect(GET_AGE('1989-02-19', '1989-02-18')).toBe(-1);
  });
  it("GET_AGE('1989-02-19', '1992-06-15')", () => {
    expect(GET_AGE('1989-02-19', '1992-06-15')).toBe(3);
  });
  it("GET_AGE('1989-02-19', '2023-06-15')", () => {
    expect(GET_AGE('1989-02-19', '2023-06-15')).toBe(34);
  });
});

describe('APPLY_LABELS', () => {
  it('APPLY_LABELS', () => {
    const form = APPLY_LABELS(forms, schema, ['single_choice', 'multiple_choice'])[0] as any;
    expect(form.single_choice).toBe('choiceLabel1');
    expect(form.reps.rep_1[0].multiple_choice[0]).toBe('choiceLabel2');
  });
});

describe('MODE', () => {
  it('should calculate the mode of a value in dataset', () => {
    const result = MODE(forms, 'dog_puppies');
    const dog_puppies_mode = 1;
    expect(result).toBe(dog_puppies_mode);
  });
});

describe('ROUND', () => {
  it('should round the dog_point property of the first form to 2 decimal places', () => {
    const result = ROUND(forms[0]['dog_point'] as number, 2);
    expect(result).toBe(0.1);
  });
});
