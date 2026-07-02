import {renameArguments} from './rename-arguments';

describe('renameArguments', () => {
  it('should rename a bare identifier that matches an ancestor name', () => {
    const result = renameArguments("foo === 'yes'", {foo: 0}, [3]);
    expect(result).toBe("foo__3 === 'yes'");
  });

  it('should not rename a property access with the same name as an ancestor', () => {
    const result = renameArguments("$choice.foo === 'yes'", {foo: 0}, [3]);
    expect(result).toBe("$choice.foo === 'yes'");
  });

  it('should rename a bare identifier but not a property access sharing the same formula', () => {
    const result = renameArguments('$choice.foo === foo', {foo: 0}, [3]);
    expect(result).toBe('$choice.foo === foo__3');
  });

  it('should not rename a property access at the end of a longer property chain', () => {
    const result = renameArguments('a.b.foo === foo', {foo: 0}, [3]);
    expect(result).toBe('a.b.foo === foo__3');
  });
});
