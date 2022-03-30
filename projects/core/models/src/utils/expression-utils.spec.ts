import {ALL_VALUES_OF, MainForm} from './expression-utils';

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

const forms: MainForm[] = [
  {dog_name: 'dog1', reps: {'rep_1': [{dog_name: 'dog4'}]}},
  {},
  {dog_name: 'dog2'},
  {dog_name: 'dog3'},
];
