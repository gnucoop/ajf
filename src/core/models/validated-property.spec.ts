import {AjfValidatedProperty} from './validated-property';


describe('AjfValidatedProperty', () => {
  it('should validate code as executable given an optional context', () => {
    expect(AjfValidatedProperty.validate('(1 + 2) / 3')).toBe(true);

    expect(AjfValidatedProperty.validate('(foo + 2) / 3', {
      'foo' : 1
    })).toBe(true);

    expect(AjfValidatedProperty.validate('(foo + 2) / 3')).toBe(false);
  });
});
