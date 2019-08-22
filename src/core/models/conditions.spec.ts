import {alwaysCondition, createCondition, neverCondition} from './public-api';

describe('createCondition', () => {
  it('should create an empty condition with no parameters', () => {
    const condition = createCondition();
    expect(condition.condition).toEqual('');
  });

  it('should create an condition', () => {
    const condition = createCondition({condition: 'foo'});
    expect(condition.condition).toEqual('foo');
  });
});

describe('alwaysCondition', () => {
  it('should create an always true condition', () => {
    const condition = alwaysCondition();
    expect(condition.condition).toBe('true');
  });
});

describe('neverCondition', () => {
  it('should create an always false condition', () => {
    const condition = neverCondition();
    expect(condition.condition).toBe('false');
  });
});
