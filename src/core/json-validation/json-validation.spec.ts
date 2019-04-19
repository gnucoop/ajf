import {AjfJsonValidator} from './json-validation';
import {OPD_DATA} from './testdata/testdata.json';

describe('JSON Validator', () => {

  it('Should be defined', () => {
    expect(AjfJsonValidator).toBeDefined();
  });

  it('Should validate OPD test Data with default schema', () => {
    let valid = AjfJsonValidator.validate(OPD_DATA);
    expect(valid).toEqual(true);
  });

});
