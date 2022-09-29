import {ALL_VALUES_OF, SUM, MainForm} from './expression-utils';

const forms: MainForm[] = [
  {dog_name: 'dog1', dog_puppies: 3, to_check: true, reps: {'rep_1': [{dog_type: 'dogtype1'}]}},
  {},
  {dog_name: 'dog2', to_check: true, dog_puppies: 2, reps: {'rep_1': [{dog_type: 'dogtype1'}]}},
  {dog_name: 'dog3', to_check: true, reps: {'rep_1': [{dog_type: 'dogtype1'}]}},
  {dog_name: 'dog4', dog_puppies: 1, reps: {'rep_1': [{dog_type: 'dogtype2'}]}},
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
});
