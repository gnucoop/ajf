import {sizedEnumToStringArray} from './index';

// tslint:disable-next-line:prefer-const-enum
enum TestEnum {
  Foo,
  Bar,
  Baz,
  LENGTH
}

describe('sizedEnumToStringArray', () => {
  it('should return an array of string options given an enum terminated by LENGTH', () => {
    expect(sizedEnumToStringArray(TestEnum)).toEqual(['Foo', 'Bar', 'Baz']);
  });
});
