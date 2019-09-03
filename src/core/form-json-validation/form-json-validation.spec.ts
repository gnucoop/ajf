import {AjfFormJsonValidator} from './form-json-validation';
import {OPD_DATA} from './testdata/testdata.json';

describe('Form JSON Validator', () => {

  it('Should be defined', () => {
    expect(AjfFormJsonValidator).toBeDefined();
  });

  it('Should have v1 schema defined with given id', () => {
    expect(AjfFormJsonValidator.getKnownSchema('ajf_v1')).toBeTruthy();
  });

  it('Should have a default schema defined', () => {
    expect(AjfFormJsonValidator.getKnownSchema()).toBeTruthy();
  });

  it('Should validate OPD test Data with default schema, provide no errors', () => {
    let valid = AjfFormJsonValidator.validate(OPD_DATA);
    expect(valid).toEqual(true);
    let errors = AjfFormJsonValidator.getErrors();
    expect(errors).toBeFalsy();
  });

  it('Should not validate OPD test Data with an unknown schema key', () => {
    let valid = AjfFormJsonValidator.validate(OPD_DATA, '__fake_schema_key');
    expect(valid).toEqual(false);
  });

  it('Should not validate FAILING test Data with default schema, provide errors', () => {
    const FAIL_DATA = {};
    let valid = AjfFormJsonValidator.validate(FAIL_DATA);
    expect(valid).toEqual(false);
    let errors = AjfFormJsonValidator.getErrors();
    expect(errors).toBeTruthy();
  });

});
