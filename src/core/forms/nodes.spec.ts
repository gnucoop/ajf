import {alwaysCondition, createCondition, createFormula, neverCondition} from '../models';

import {AjfFieldType, AjfNodeType, createField, createNode} from './index';

describe('createNode', () => {
  it('should create a node with a parent and a parent node', () => {
    let node = createNode({id: 1, name: 'foo', nodeType: AjfNodeType.AjfField, parent: 0});

    expect(node.parent).toBe(0);
    expect(node.parentNode).toEqual(0);
  });
});

describe('createField', () => {
  it('should create a valid field', () => {
    let field = createField({id: 1, name: 'foo', parent: 0, fieldType: AjfFieldType.String});

    expect(field.fieldType).toEqual(AjfFieldType.String);
    expect(field.id).toEqual(1);
    expect(field.name).toEqual('foo');
    expect(field.label).toEqual('');
    expect(field.description).toBeUndefined();
    expect(field.visibility).toEqual(alwaysCondition());
    expect(field.conditionalBranches.length).toEqual(1);
    expect(field.conditionalBranches[0]).toEqual(alwaysCondition());
    expect(field.formula).toBeUndefined();
    expect(field.defaultValue).toBeNull();
    expect(field.editable).toBeTruthy();

    field = createField({
      id: 1,
      fieldType: AjfFieldType.Number,
      parent: 0,
      name: 'foo',
      label: 'bar',
      description: 'baz',
      visibility: neverCondition(),
      conditionalBranches: [createCondition({condition: 'a > 2'}), alwaysCondition()],
      formula: createFormula({formula: '3 * 4'}),
      defaultValue: 4,
    });

    expect(field.fieldType).toEqual(AjfFieldType.Number);
    expect(field.id).toEqual(1);
    expect(field.name).toEqual('foo');
    expect(field.label).toEqual('bar');
    expect(field.description).toEqual('baz');
    expect(field.visibility).toEqual(neverCondition());
    expect(field.conditionalBranches.length).toEqual(2);
    expect(field.conditionalBranches[0].condition).toEqual('a > 2');
    expect(field.conditionalBranches[1].condition).toEqual(alwaysCondition().condition);
    expect(field.formula ? field.formula.formula : '').toEqual('3 * 4');
    expect(field.defaultValue).toEqual(4);
    expect(field.editable).toBeTruthy();
  });
});
