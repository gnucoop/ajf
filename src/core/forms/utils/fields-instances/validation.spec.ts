import {AjfFieldType} from '../../interface/fields/field-type';
import {createFieldInstance} from '../fields-instances/create-field-instance';
import {createField} from '../fields/create-field';

import {updateValidation} from './update-validation';

describe('updateValidation', () => {
  it('should set instance as valid if no validation is defined', () => {
    const instance = createFieldInstance(
        {
          node: createField({
            id: 1,
            parent: 0,
            name: 'test',
            label: 'test',
            fieldType: AjfFieldType.String,
            conditionalBranches: [{condition: 'true'}],
          })
        },
        {});
    updateValidation(instance, {});
    expect(instance.valid).toBeTruthy();
  });
});
