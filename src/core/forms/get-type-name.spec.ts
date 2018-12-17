import {getTypeName} from './index';

class TestClass {}

describe('getTypeName', () => {
  it('should return the name of the class of the given object in string', () => {
    expect(getTypeName(new TestClass())).toEqual('TestClass');
  });
});
