import {AjfJsonValidator} from '@ajf/core/json-validation';
import {TestBed} from '@angular/core/testing';

describe('AjfJsonValidator', () => {
  let jsonValidator: AjfJsonValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AjfJsonValidator],
    });
    jsonValidator = TestBed.get(AjfJsonValidator);
  });

  it('should validate a valid JSON object', () => {
    const valid = jsonValidator.validate('form', {nodes: []});
    expect(valid.valid).toBe(true);
  });

  it('should not validate an invalid JSON object', () => {
    const valid = jsonValidator.validate('form', {foo: []});
    expect(valid.valid).toBe(false);
  });

  it('should fail when trying to validate against an unknown schema', () => {
    expect(() => jsonValidator.validate('form', {}, {version: 'foo'})).toThrowError();
  });
});
