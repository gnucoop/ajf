import {factorial} from './math';

describe('factorial', () => {
  it('should return the factorial of a given number', () => {
    expect(factorial(0)).toEqual(1);
    expect(factorial(1)).toEqual(1);
    expect(factorial(3)).toEqual(6);
    expect(factorial(7)).toEqual(5040);
  });
});
