import {AjfJsonValidator} from './json-validation';
import {OPD_DATA} from './testdata/testdata.json';

describe('JSON Validator', () => {

  it('Should be defined', () => {
    expect(AjfJsonValidator).toBeDefined();
  });

  it('Should have v1 schema defined with given id', () => {
    expect(AjfJsonValidator.getKnownSchema('ajf_v1')).toBeTruthy();
  });

  it('Should have a default schema defined', () => {
    expect(AjfJsonValidator.getKnownSchema()).toBeTruthy();
  });

  it('Should validate OPD test Data with default schema, provide no errors', () => {
    let valid = AjfJsonValidator.validate(OPD_DATA);
    expect(valid).toEqual(true);
    let errors = AjfJsonValidator.getErrors();
    expect(errors).toBeFalsy();
  });

  it('Should not validate OPD test Data with an unknown schema key', () => {
    let valid = AjfJsonValidator.validate(OPD_DATA, '__fake_schema_key');
    expect(valid).toEqual(false);
  });

  it('Should not validate FAILING test Data with default schema, provide errors', () => {
    const FAIL_DATA = {};
    let valid = AjfJsonValidator.validate(FAIL_DATA);
    expect(valid).toEqual(false);
    let errors = AjfJsonValidator.getErrors();
    expect(errors).toBeTruthy();
  });

});
