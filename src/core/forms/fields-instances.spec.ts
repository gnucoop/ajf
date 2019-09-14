import {
    AjfChoice,
    AjfEmptyField,
    AjfFieldType,
    AjfNodeInstance,
    AjfNodeType,
    createField,
    createFieldWithChoicesInstance,
    createNode,
    isFieldWithChoicesInstance,
} from './public-api';

describe('isFieldWithChoicesInstance', () => {
    it('should return true if the argument is an instance \
    of type single or multiple choice field', () => {
        const node = createNode({id: 1, name: 'foo', nodeType: AjfNodeType.AjfField, parent: 0});
        const c1: AjfChoice<number> = {label: 'first', value: 0};
        const item = createFieldWithChoicesInstance({
            ...node,
            node: {
                ...node,
                editable: true,
                size: 'small',
                fieldType: AjfFieldType.SingleChoice,
                defaultValue: '',
                nodeType: 0,
                choices: [c1],
                choicesOrigin: {
                    type: 'fixed',
                    label: '',
                    name: '',
                    choices: [c1]
                },
                forceExpanded: true,
                forceNarrow: false
            }
        }, {});
        expect(isFieldWithChoicesInstance(item)).toBe(true);
    });

    it('should return false if the argument is not a field instance \
    or is not field instance of type single or multiple choice field', () => {
        const node = createNode({id: 1, name: 'foo', nodeType: AjfNodeType.AjfField, parent: 0});
        const c1: AjfChoice<number> = {label: 'first', value: 0};
        const item = createFieldWithChoicesInstance({
            ...node,
            node: {
                ...node,
                editable: true,
                size: 'small',
                fieldType: AjfFieldType.String,
                defaultValue: '',
                nodeType: 0,
                choices: [c1],
                choicesOrigin: {
                    type: 'fixed',
                    label: '',
                    name: '',
                    choices: [c1]
                },
                forceExpanded: true,
                forceNarrow: false
            }
        }, {});
        expect(isFieldWithChoicesInstance(item)).toBe(false);
        expect(isFieldWithChoicesInstance(null as unknown as AjfNodeInstance)).toBe(false);

        const fld = createField({
            id: 999,
            name: '',
            parent: -1,
            fieldType: AjfFieldType.Empty,
            label: ''
          }) as AjfEmptyField;

        expect(isFieldWithChoicesInstance(fld as unknown as AjfNodeInstance)).toBe(false);
    });
});
