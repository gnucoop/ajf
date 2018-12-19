import {sanitizeConditionString} from './utils';

describe('sanitizeConditionString', () => {
  it('should remove trailing, leading and multiple consequent spaces', () => {
    expect(sanitizeConditionString(' foo  bar   baz    ')).toEqual('foo bar baz');
  });
});
