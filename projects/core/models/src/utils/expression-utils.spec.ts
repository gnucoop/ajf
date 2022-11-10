import {ALL_VALUES_OF, SUM, MainForm, MEAN, COUNT_FORMS} from './expression-utils';

const forms: MainForm[] = [
  {
    dog_name: 'dog1',
    dog_puppies: 3,
    to_check: true,
    reps: {'rep_1': [{dog_type: 'dogtype1', score: 3}]},
  },
  {},
  {
    dog_name: 'dog2',
    to_check: true,
    dog_puppies: 2,
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
    const result = SUM(forms, 'dog_puppies', 'to_check === true');
    const dog_puppies = 5;
    expect(result).toBe(dog_puppies);
  });

  it('should sum the values of one field in repeating slide', () => {
    const result = SUM(forms, 'score', 'to_check === true');
    const score = 18;
    expect(result).toBe(score);
  });

  it('should sum the values of one field in repeating slide with condition in rep slide', () => {
    const result = SUM(forms, 'score', 'dog_type === "dogtype1"');
    const score = 15;
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
    const dog_puppies_mean = '2';
    expect(result).toBe(dog_puppies_mean);
  });
});
