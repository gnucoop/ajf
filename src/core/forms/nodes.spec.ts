import {AjfCondition, AjfFormula} from '@ajf/core/models';
import {
  AjfBooleanField,
  AjfChoicesFixedOrigin,
  AjfField,
  AjfFieldType,
  AjfFieldWithChoices,
  AjfFormulaField,
  AjfMultipleChoiceField,
  AjfNode,
  AjfNumberField,
  AjfSingleChoiceField,
  AjfStringField,
  AjfTextField
} from './index';


describe('AjfNode', () => {
  it('should have a parent and a parent node', () => {
    let node: AjfNode = new AjfNode();

    expect(node.parent).toBeNull();
    expect(node.parentNode).toEqual(0);

    node = new AjfNode({'parent' : 1, 'parentNode' : 2});

    expect(node.parent).toEqual(1);
    expect(node.parentNode).toEqual(2);
  });

});

describe('AjfField', () => {
  it('should have type, id, name, label, description, visibility, conditional branches, ' +
          'formula, defaultValue, editable, hasChoices, maxConditionalBranches', () => {
    let field: AjfField = AjfField.create(AjfFieldType.String);

    expect(field.fieldType).toEqual(AjfFieldType.String);
    expect(field.id).toBeNull();
    expect(field.name).toBeNull();
    expect(field.label).toBeNull();
    expect(field.description).toBeNull();
    expect(field.visibility).toEqual(AjfCondition.alwaysCondition());
    expect(field.conditionalBranches.length).toEqual(1);
    expect(field.conditionalBranches[0]).toEqual(AjfCondition.alwaysCondition());
    expect(field.formula).toBeNull();
    expect(field.defaultValue).toBeNull();
    expect(field.editable).toBeTruthy();
    expect(field.hasChoices).toBeFalsy();
    expect(field.getMaxConditionalBranches()).toEqual(-1);

    field = AjfField.create(AjfFieldType.Number, {
      id : 1,
      name : 'foo',
      label : 'bar',
      description : 'baz',
      visibility : AjfCondition.neverCondition(),
      conditionalBranches : <AjfCondition[]>[
        new AjfCondition({condition : 'a > 2'}),
        AjfCondition.alwaysCondition()
      ],
      formula : new AjfFormula({formula : '3 * 4'}),
      defaultValue : 4
    });

    expect(field.fieldType).toEqual(AjfFieldType.Number);
    expect(field.id).toEqual(1);
    expect(field.name).toEqual('foo');
    expect(field.label).toEqual('bar');
    expect(field.description).toEqual('baz');
    expect(field.visibility).toEqual(AjfCondition.neverCondition());
    expect(field.conditionalBranches.length).toEqual(2);
    expect(field.conditionalBranches[0].condition).toEqual('a > 2');
    expect(field.conditionalBranches[1].condition)
      .toEqual(AjfCondition.alwaysCondition().condition);
    expect(field.formula ? field.formula.formula : '').toEqual('3 * 4');
    expect(field.defaultValue).toEqual(4);
    expect(field.editable).toBeTruthy();
    expect(field.hasChoices).toBeFalsy();
    expect(field.getMaxConditionalBranches()).toEqual(-1);
  });

  it('should create n empty conditional branches with empty condition' +
      'when conditional branches number is set to n', () => {
    let field: AjfField = AjfField.create(AjfFieldType.String);
    field.setConditionalBranchesNum(3);

    expect(field.conditionalBranches.length).toEqual(3);
    expect(field.conditionalBranches[0]).toEqual(AjfCondition.alwaysCondition());
    expect(field.conditionalBranches[1]).toEqual(AjfCondition.alwaysCondition());
    expect(field.conditionalBranches[2]).toEqual(AjfCondition.alwaysCondition());
  });
});

describe('AjfStringField', () => {
  it('should accept only strings as default value', () => {
    let field: AjfStringField = new AjfStringField();

    field.defaultValue = 'foo';
    expect(field.defaultValue).toEqual('foo');

    expect(() => field.defaultValue = 3)
        .toThrowError('The default value is not valid for this field type');
    expect(field.defaultValue).toEqual('foo');
  });
});

describe('AjfTextField', () => {
  it('should accept only strings as default value', () => {
    let field: AjfTextField = new AjfTextField();

    field.defaultValue = 'foo';
    expect(field.defaultValue).toEqual('foo');

    expect(() => field.defaultValue = 3)
        .toThrowError('The default value is not valid for this field type');
    expect(field.defaultValue).toEqual('foo');
  });
});

describe('AjfNumberField', () => {
  it('should accept only numbers as default value', () => {
    let field: AjfNumberField = new AjfNumberField();

    field.defaultValue = 3;
    expect(field.defaultValue).toEqual(3);

    expect(() => field.defaultValue = 'foo')
      .toThrowError('The default value is not valid for this field type');
    expect(field.defaultValue).toEqual(3);
  });
});

describe('AjfBooleanField', () => {
  it('should accept only booleans as default value', () => {
    let field: AjfBooleanField = new AjfBooleanField();

    field.defaultValue = true;
    expect(field.defaultValue).toEqual(true);

    expect(() => field.defaultValue = 'foo')
      .toThrowError('The default value is not valid for this field type');
    expect(field.defaultValue).toEqual(true);
  });

  it('should have maximum two conditional branches', () => {
    let field: AjfBooleanField = new AjfBooleanField();

    expect(field.getMaxConditionalBranches()).toEqual(2);

    field.setConditionalBranchesNum(2);
    expect(field.conditionalBranches.length).toEqual(2);

    field.setConditionalBranchesNum(4);
    expect(field.conditionalBranches.length).toEqual(2);

    field.setConditionalBranchesNum(1);
    expect(field.conditionalBranches.length).toEqual(1);
  });
});

describe('AjfFieldWithChoices', () => {
  it('should have choices', () => {
    let field: AjfFieldWithChoices = new AjfFieldWithChoices();

    expect(field.hasChoices).toBeTruthy();
    expect(field.choices.length).toEqual(0);

    field = new AjfFieldWithChoices({
      choicesOrigin : new AjfChoicesFixedOrigin<string>(
        {choices : [ 'foo', 'bar', 'baz' ]}
      )
    });

    expect(field.hasChoices).toBeTruthy();
    expect(field.choices.length).toEqual(3);
    expect(field.choices[0]).toEqual('foo');
    expect(field.choices[1]).toEqual('bar');
    expect(field.choices[2]).toEqual('baz');
  });
});

describe('AjfSingleChoiceField', () => {
  it('should accept only one of the available choices as default value', () => {
    let field: AjfSingleChoiceField = new AjfSingleChoiceField({
      choicesOrigin : new AjfChoicesFixedOrigin<string>(
          {choices : [ 'foo', 'bar', 'baz' ]})
    });

    field.defaultValue = 'foo';
    expect(field.defaultValue).toEqual('foo');

    field.defaultValue = 'bar';
    expect(field.defaultValue).toEqual('bar');

    field.defaultValue = 'baz';
    expect(field.defaultValue).toEqual('baz');

    expect(() => field.defaultValue = 'moo')
      .toThrowError('The default value is not valid for this field type');
  });

  it('should have a maximum number of conditional branches equal to ' +
      'the number of defined choices + 1 (no selection)', () => {
    let field: AjfSingleChoiceField = new AjfSingleChoiceField({
      choicesOrigin : new AjfChoicesFixedOrigin<string>(
          {choices : [ 'foo', 'bar', 'baz' ]})
    });

    expect(field.getMaxConditionalBranches()).toEqual(4);

    field.setConditionalBranchesNum(1);
    expect(field.conditionalBranches.length).toEqual(1);

    field.setConditionalBranchesNum(5);
    expect(field.conditionalBranches.length).toEqual(4);
  });
});

describe('AjfMultipleChoiceField', () => {
  it('should accept only or more of the available choices as default value', () => {
    let field: AjfMultipleChoiceField = new AjfMultipleChoiceField({
      choicesOrigin : new AjfChoicesFixedOrigin<string>(
          {choices : [ 'foo', 'bar', 'baz' ]})
    });

    field.defaultValue = 'foo';
    expect(field.defaultValue).toEqual('foo');

    field.defaultValue = 'bar';
    expect(field.defaultValue).toEqual('bar');

    field.defaultValue = 'baz';
    expect(field.defaultValue).toEqual('baz');

    expect(() => field.defaultValue = 'moo')
      .toThrowError('The default value is not valid for this field type');
  });

  it('should have a maximum number of conditional branches equal to ' +
      'the number of possible combination of choices + 1 (no selection)', () => {
    let field: AjfMultipleChoiceField = new AjfMultipleChoiceField({
      choicesOrigin : new AjfChoicesFixedOrigin<string>(
          {choices : [ 'foo', 'bar', 'baz' ]})
    });

    expect(field.getMaxConditionalBranches()).toEqual(7);

    field.setConditionalBranchesNum(2);
    expect(field.conditionalBranches.length).toEqual(2);

    field.setConditionalBranchesNum(10);
    expect(field.conditionalBranches.length).toEqual(7);
  });
});

describe('AjfFormulaField', () => {
  it('should not be editable', () => {
    let field: AjfFormulaField = new AjfFormulaField();

    expect(field.editable).toBeFalsy();
  });
});
