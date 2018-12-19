/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {AjfCondition, AjfFormula, AjfJsonSerializable} from '@ajf/core/models';
import {deepCopy} from '@ajf/core/utils';

import {AjfAttachmentsOrigin} from './attachments';
import {IAjfChoicesOrigin} from './choices';
import {AjfInvalidFieldDefinitionError} from './errors';
import {factorial} from './math';
import {AjfValidationGroup} from './validation';
import {AjfWarningGroup} from './warning';


export enum AjfNodeType {
  AjfField,
  AjfFieldNodeLink,
  AjfNodeGroup,
  AjfSlide,
  AjfRepeatingSlide,
  LENGTH
}


/**
 * This class will define an ajf node
 */
export class AjfNode extends AjfJsonSerializable {
  // node identification number
  private _id: number;
  get id(): number { return this._id; }
  set id(id: number) { this._id = id; }

  // id of predecessor node
  private _parent: number;
  get parent(): number { return this._parent; }
  set parent(parent: number) { this._parent = parent; }

  // is a id of parent node,  if this node is part of an AjfNodeGroup
  private _parentNode: number;
  get parentNode(): number { return this._parentNode; }
  set parentNode(parentNode: number) { this._parentNode = parentNode; }

  // an AjfCondition array
  private _conditionalBranches: AjfCondition[];
  /**
   * this method will get the conditionalBranches of the field
   * @return : _conditionalBranches
   */
  get conditionalBranches(): AjfCondition[] {
    return this._conditionalBranches;
  }
  /**
   * this method will set the conditionalBranches of the field
   * @param conditionalBranches : AjfCondition[] - the new conditionalBranches
   */
  set conditionalBranches(conditionalBranches: AjfCondition[]) {
    this._conditionalBranches = conditionalBranches;
  }

  // the name of the field
  private _name: string;
  /**
   * this method will get the current name of field
   * @return : _name
   */
  get name(): string {
    return this._name;
  }
  /**
   * this method will set the current name of field
   * @param name : string - the new name
   */
  set name(name: string) {
    this._name = name;
  }
  // hte label of the field
  private _label: string;
  /**
   * this method will get the label of the field
   * @return : _label
   */
  get label(): string {
    return this._label;
  }
  /**
   * this method will set the label of the field
   * @param label : string - the new label
   */
  set label(label: string) {
    this._label = label;
  }

  // AjfCondition for handling visibility
  private _visibility: AjfCondition | null;
  /**
   * this method will get the visibility of the field
   * @return : _visibility
   */
  get visibility(): AjfCondition | null {
    return this._visibility;
  }
  /**
   * this method will set the visibility of the field
   * @param visibility : AjfCondition - the new visibility
   */
  set visibility(visibility: AjfCondition | null) {
    this._visibility = visibility;
  }

  /**
   * this method will load an AjfNode from json
   * @param obj                : any - object node
   * @param choicesOrigins     : any[] - array of choicesOrigins
   * @param attachmentsOrigins : any[] - array of attachmentsOrigins
   * @return AjfNode
   */
  static fromJson(obj: any, choicesOrigins?: any[], attachmentsOrigins?: any[],
      context?: any): AjfNode {
    // array of string:  contains a keys Object
    // example:
    // ["id", "name", "label", "visibility", "hasChoices", "parent",
    //  "parentNode", "nodeType", "conditionalBranches", "fieldType", "nodes"]
    obj = deepCopy(obj);
    if (context) {
      context = deepCopy(context);
    }
    let keys: string[] = Object.keys(obj);

    if (keys.indexOf('nodeType') === -1) {
      throw new Error('Node type missing type');
    }

    let nodeType = obj.nodeType;
    delete obj.nodeType;
    if (AjfNodeType[nodeType] == null) {
      throw new Error('Invalid node type');
    }

    if (keys.indexOf('visibility') > -1) {
      obj.visibility = AjfCondition.fromJson(obj.visibility);
    }

    if (keys.indexOf('conditionalBranches') > -1 && obj.conditionalBranches instanceof Array) {
      let cbs: AjfCondition[] = [];
      for (let i = 0 ; i < obj.conditionalBranches.length ; i ++) {
        cbs.push(AjfCondition.fromJson(obj.conditionalBranches[i]));
      }
      if (cbs.length == 0) {
        cbs.push(AjfCondition.alwaysCondition());
      }
      obj.conditionalBranches = cbs;
    }

    return AjfNode.createNode(nodeType, obj, choicesOrigins, attachmentsOrigins, context);
  }
  /**
   * this method will create an AjfNode
   * @param nodeType           : identified a type of node (nodeGroup or nodeField)
   * @param obj                : any - object node
   * @param choicesOrigins     : any[] - array of choicesOrigins
   * @param attachmentsOrigins : any[] - array of attachmentsOrigins
   * @return AjfNode
   */
  static createNode(
    nodeType: AjfNodeType, obj?: any, choicesOrigins?: any[],
    attachmentsOrigins?: any[], context?: any
  ): AjfNode {
    choicesOrigins = choicesOrigins || [];
    attachmentsOrigins = attachmentsOrigins || [];
    switch (nodeType) {
      case AjfNodeType.AjfNodeGroup:
        return AjfNodeGroup.fromJson(obj, choicesOrigins, attachmentsOrigins, context);
      case AjfNodeType.AjfField:
        return AjfField.fromJson(obj, choicesOrigins, attachmentsOrigins, context);
      case AjfNodeType.AjfRepeatingSlide:
        return AjfRepeatingSlide.fromJson(obj, choicesOrigins, attachmentsOrigins, context);
      case AjfNodeType.AjfSlide:
        return AjfSlide.fromJson(obj, choicesOrigins, attachmentsOrigins, context);
      default:
        throw new Error('Invalid node type');
    }
  }
  /**
   * this method get the nodeType
   * @return AjfNodeType
   */
  get nodeType(): AjfNodeType {
    const thisObj: any = this;
    if (thisObj instanceof AjfField) {
      return AjfNodeType.AjfField;
    }
    if (thisObj instanceof AjfFieldNodeLink) {
      return AjfNodeType.AjfFieldNodeLink;
    }
    if (thisObj instanceof AjfNodeGroup) {
      return AjfNodeType.AjfNodeGroup;
    }
    if (thisObj instanceof AjfRepeatingSlide) {
      return AjfNodeType.AjfRepeatingSlide;
    }
    if (thisObj instanceof AjfSlide) {
      return AjfNodeType.AjfSlide;
    }
    throw new Error('Invalid node type');
  }
  /**
   * this constructor will assign the obj value to a class variables
   */
  constructor(obj?: any) {
    super();

    this.jsonExportedMembers = this.jsonExportedMembers.concat([
      'id', 'nodeType', 'parent', 'parentNode', 'visibility', 'name', 'label',
      'conditionalBranches'
    ]);

    this._id         = obj && obj.id          || null;
    this._parent     = obj && obj.parent      || null;
    this._parentNode = obj && obj.parentNode  || 0;
    this._visibility = obj && obj.visibility  || AjfCondition.alwaysCondition();
    this._name       = obj && obj.name        || null;
    this._label      = obj && obj.label       || null;
    this._conditionalBranches = obj && obj.conditionalBranches || [AjfCondition.alwaysCondition()];
  }

  /**
   * this method will set the conditiona branch number of the field
   * @param cbn : number
   */
  setConditionalBranchesNum(cbn: number): void {
    if (this.getMaxConditionalBranches() >= 0) {
      cbn = Math.min(cbn, this.getMaxConditionalBranches());
    }
    if (cbn < this.conditionalBranches.length) {
      this.conditionalBranches = this.conditionalBranches.slice(0, cbn);
    } else if (cbn > this.conditionalBranches.length) {
      for (let i = this.conditionalBranches.length; i < cbn; i++) {
        this.conditionalBranches.push(AjfCondition.alwaysCondition());
      }
    }
  }

  /**
   * this method will get the max xonditional branches of the field
   * @return number
   */
  getMaxConditionalBranches(): number {
    return -1;
  }
}

export class AjfFieldNodeLink extends AjfNode {
}

/**
 * this enumerate any field type
 */
export enum AjfFieldType {
  String,
  Text,
  Number,
  Boolean,
  SingleChoice,
  MultipleChoice,
  Formula,
  Empty,
  Date,
  DateInput,
  Time,
  Table,
  LENGTH
}

/**
 * This class will define an ajf node group
 */
export class AjfNodeGroup extends AjfNode {
  // array of ajfNode
  private _nodes: AjfNode[];
  get nodes(): AjfNode[] { return this._nodes; }
  set nodes(nodes: AjfNode[]) { this._nodes = nodes; }

  // is a node group repeat condition
  // example: "opd_treatment == 'Yes' && ($groupReps || 1) || 0"
  private _formulaReps: AjfFormula;
  get formulaReps(): AjfFormula { return this._formulaReps; }
  set formulaReps(formulaReps: AjfFormula) { this._formulaReps = formulaReps; }

  // max number of repetitions
  private _maxReps: number;
  get maxReps(): number { return this._maxReps; }
  set maxReps(maxReps: number) { this._maxReps = maxReps; }

  // min number of repetitions
  private _minReps: number;
  get minReps(): number { return this._minReps; }
  set minReps(minReps: number) { this._minReps = minReps; }

  /**
   * this method will load an AjfNodeGroup from json
   * @param obj                : any - object node
   * @param choicesOrigins     : any[] - array of choicesOrigins
   * @param attachmentsOrigins : any[] - array of attachmentsOrigins
   * @return AjfNodeGroup
   */
  static fromJson(obj: any, choicesOrigins: any[], attachmentsOrigins: any[],
      context: any): AjfNodeGroup {
    // array of string:  contains a keys Object
    // example:
    // ["id", "parent", "parentNode", "formulaReps", "nodes"]
    obj = deepCopy(obj);
    if (context) {
      context = deepCopy(context);
    }
    let keys: string[] = Object.keys(obj);

    if (keys.indexOf('nodes') > -1 && obj.nodes instanceof Array) {
      let nodes: AjfNode[] = [];
      for (let i = 0 ; i < obj.nodes.length ; i ++) {
        nodes.push(AjfNode.fromJson(obj.nodes[i], choicesOrigins, attachmentsOrigins));
      }
      obj.nodes = nodes;
    }

    if (keys.indexOf('formulaReps') > -1 && obj.formulaReps != null) {
      obj.formulaReps = AjfFormula.fromJson(obj.formulaReps);
    }

    if (keys.indexOf('visibility') > -1 && obj.visibility != null) {
      obj.visibility = AjfCondition.fromJson(obj.visibility);
    }

    if (keys.indexOf('conditionalBranches') > -1 && obj.conditionalBranches instanceof Array) {
      let cbs: AjfCondition[] = [];
      for (let i = 0 ; i < obj.conditionalBranches.length ; i ++) {
        cbs.push(AjfCondition.fromJson(obj.conditionalBranches[i]));
      }
      obj.conditionalBranches = cbs;
    }

    let ret =  new AjfNodeGroup(obj);

    return ret;
  }
  /**
   * this constructor will assign the obj value to a class variables
   */
  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers.concat([
      'formulaReps', 'minReps', 'maxReps', 'nodes'
    ]);

    this.nodes = obj && obj.nodes || [];
    this.formulaReps = obj && obj.formulaReps || null;
    this.maxReps = obj && obj.maxReps || null;
    this.minReps = obj && obj.minReps || null;
  }
}

export interface IAjfSlide {
  nodes: AjfNode[];
}

/**
 * Represents a form slide.
 * Slides are specialized node groups used to layout the form.
 * They must be at the root level of the form
 *
 * @export
 */
export class AjfSlide extends AjfNode implements IAjfSlide {
  private _nodes: AjfNode[];
  get nodes(): AjfNode[] { return this._nodes.slice(0); }
  set nodes(nodes: AjfNode[]) { this._nodes = nodes.slice(0); }

  static fromJson(
    obj: any, choicesOrigins: any[], attachmentsOrigins: any[], context: any
  ): AjfSlide {
    obj = deepCopy(obj);
    if (context) {
      context = deepCopy(context);
    }
    let keys: string[] = Object.keys(obj);

    if (keys.indexOf('visibility') > -1 && obj.visibility != null) {
      obj.visibility = AjfCondition.fromJson(obj.visibility);
    }

    if (keys.indexOf('nodes') > -1 && obj.nodes instanceof Array) {
      let nodes: AjfNode[] = [];
      for (let i = 0 ; i < obj.nodes.length ; i ++) {
        nodes.push(AjfNode.fromJson(obj.nodes[i], choicesOrigins, attachmentsOrigins));
      }
      obj.nodes = nodes;
    }

    if (keys.indexOf('conditionalBranches') > -1 && obj.conditionalBranches instanceof Array) {
      let cbs: AjfCondition[] = [];
      for (let i = 0 ; i < obj.conditionalBranches.length ; i ++) {
        cbs.push(AjfCondition.fromJson(obj.conditionalBranches[i]));
      }
      obj.conditionalBranches = cbs;
    }

    return new AjfSlide(obj);
  }

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers.concat(['nodes']);

    this._nodes = obj && obj.nodes || [];
  }
}

export class AjfRepeatingSlide extends AjfSlide {
  private _formulaReps: AjfFormula | null;
  get formulaReps(): AjfFormula | null { return this._formulaReps; }
  set formulaReps(formulaReps: AjfFormula | null) { this._formulaReps = formulaReps; }

  // max number of repetitions
  private _maxReps: number;
  get maxReps(): number { return this._maxReps; }
  set maxReps(maxReps: number) { this._maxReps = maxReps; }

  // min number of repetitions
  private _minReps: number;
  get minReps(): number { return this._minReps; }
  set minReps(minReps: number) { this._minReps = minReps; }

  static fromJson(
    obj: any, choicesOrigins: any[], attachmentsOrigins: any[], context: any
  ): AjfRepeatingSlide {
    obj = deepCopy(obj);
    if (context) {
      context = deepCopy(context);
    }
    let keys: string[] = Object.keys(obj);

    if (keys.indexOf('visibility') > -1 && obj.visibility != null) {
      obj.visibility = AjfCondition.fromJson(obj.visibility);
    }

    if (keys.indexOf('nodes') > -1 && obj.nodes instanceof Array) {
      let nodes: AjfNode[] = [];
      for (let i = 0 ; i < obj.nodes.length ; i ++) {
        nodes.push(AjfNode.fromJson(obj.nodes[i], choicesOrigins, attachmentsOrigins));
      }
      obj.nodes = nodes;
    }

    if (keys.indexOf('formulaReps') > -1 && obj.formulaReps != null) {
      obj.formulaReps = AjfFormula.fromJson(obj.formulaReps);
    }

    if (keys.indexOf('conditionalBranches') > -1 && obj.conditionalBranches instanceof Array) {
      let cbs: AjfCondition[] = [];
      for (let i = 0 ; i < obj.conditionalBranches.length ; i ++) {
        cbs.push(AjfCondition.fromJson(obj.conditionalBranches[i]));
      }
      obj.conditionalBranches = cbs;
    }

    return new AjfRepeatingSlide(obj);
  }

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers.concat([
      'nodes', 'formulaReps', 'minReps', 'maxReps'
    ]);

    this.formulaReps = obj && obj.formulaReps || null;
    this.nodes = obj && obj.nodes || [];
    this.minReps = obj && obj.minReps || 1;
    this.maxReps = obj && obj.maxReps || 0;
  }
}

/**
 * This class will define an ajf Field
 */
export abstract class AjfField extends AjfNode {
  // a field description
  private _description: string;
  /**
   * this method will get the description of the field
   * @return : _description
   */
  get description(): string {
    return this._description;
  }
  /**
   * this method will set the description of the field
   * @param description : string - the new description
   */
  set description(description: string) {
    this._description = description;
  }

  // a boolean to identify an editable status
  private _editable: boolean;
  /**
   * this method will get the editable status  of the field
   * @return : _editable
   */
  get editable(): boolean {
    return this._editable;
  }
  //  an AjfFormula
  private _formula: AjfFormula | null;
  /**
   * this method will get the formula of the field
   * @return : _formula
   */
  get formula(): AjfFormula | null {
    return this._formula;
  }
  set formula(formula: AjfFormula | null) {
    this._formula = formula;
  }

  // a boolean to identify if the field have choices
  private _hasChoices = false;
  /**
   * this method will get the hasChoices status of the field
   * @return : _hasChoices
   */
  get hasChoices(): boolean {
    return this._hasChoices;
  }

  //  a default value
  private _defaultValue: any;

  /**
   * this method will get the default value of the field
   * @return : _defaultValue
   */
  get defaultValue(): any {
    return this._defaultValue;
  }

  /**
   * this method will set the defaultValue of the field
   * @param defaultValue : any - the new defaultValue
   */
  set defaultValue(defaultValue: any) {
    if (defaultValue == null || this.validateValue(defaultValue)) {
      this._defaultValue = defaultValue;
    } else {
      throw new AjfInvalidFieldDefinitionError(
        'The default value is not valid for this field type');
    }
  }

  private _size: 'normal' | 'small' | 'smaller' | 'tiny' | 'mini';
  get size(): 'normal' | 'small' | 'smaller' | 'tiny' | 'mini' {
    return this._size;
  }
  set size(size: 'normal' | 'small' | 'smaller' | 'tiny' | 'mini') {
    this._size = size;
  }

  //  an AjfValidationGroup
  private _validation: AjfValidationGroup | null;

  /**
   * this method will get the validation value of the field
   * @return : _validation
   */
  get validation(): AjfValidationGroup | null {
    return this._validation;
  }
  set validation(validation: AjfValidationGroup | null) {
    this._validation = validation;
  }

  // an AjfWarningGroup
  private _warning: AjfWarningGroup | null;

  /**
   * this method will get the warning value of the field
   * @return : _warning
   */
  get warning(): AjfWarningGroup | null {
    return this._warning;
  }
  set warning(warning: AjfWarningGroup | null) {
    this._warning = warning;
  }

  //  a boolean to identify if field has attachments
  private _hasAttachments = false;
  /**
   * this method will get the hasAttachments status of the field
   * @return : _hasAttachments
   */
  get hasAttachments(): boolean { return this._hasAttachments; }

  // an AjfAttachmentsOrigin
  private _attachmentsOrigin: AjfAttachmentsOrigin;

  /**
   * this method will get the attachmentsOrigin of the field
   * @return : AjfAttachmentsOrigin
   */
  get attachmentsOrigin(): AjfAttachmentsOrigin | null {
    return this.hasAttachments && this._attachmentsOrigin || null;
  }

  /**
   * this method will get the attachments of the field
   * @return : any the attachments
   */
  get attachments(): any[] {
      return this.hasAttachments &&
         this._attachmentsOrigin.getAttachments()  || [];
  }

  private _nextSlideCondition: AjfCondition | null;
  get nextSlideCondition(): AjfCondition | null {
    return this._nextSlideCondition;
  }
  set nextSlideCondition(condition: AjfCondition | null) {
    this._nextSlideCondition = condition;
  }

  // @TODO Maybe not used??
  private _nextSlide: boolean;
  get nextSlide(): boolean {
    return this._nextSlide;
  }
  set nextSlide(val: boolean) {
    this._nextSlide = val;
  }

  /**
   * this method will get the field type
   * @return : AjfFieldType
   */
  get fieldType(): AjfFieldType {
    const thisObj: any = this;
    if (thisObj instanceof AjfFormulaField) {
      return AjfFieldType.Formula;
    }
    if (thisObj instanceof AjfMultipleChoiceField) {
      return AjfFieldType.MultipleChoice;
    }
    if (thisObj instanceof AjfSingleChoiceField) {
      return AjfFieldType.SingleChoice;
    }
    if (thisObj instanceof AjfBooleanField) {
      return AjfFieldType.Boolean;
    }
    if (thisObj instanceof AjfNumberField) {
      return AjfFieldType.Number;
    }
    if (thisObj instanceof AjfTextField) {
      return AjfFieldType.Text;
    }
    if (thisObj instanceof AjfStringField) {
      return AjfFieldType.String;
    }
    if (thisObj instanceof AjfDateField) {
      return AjfFieldType.Date;
    }
    if (thisObj instanceof AjfDateInputField) {
      return AjfFieldType.DateInput;
    }
    if (thisObj instanceof AjfTableField) {
      return AjfFieldType.Table;
    }
    if (thisObj instanceof AjfTimeField) {
      return AjfFieldType.Time;
    }
    return AjfFieldType.Empty;
  }

  /**
   * this method will get the node type of the field
   * @return : AjfFieldType
   */
  get nodeType(): AjfNodeType { return AjfNodeType.AjfField; }

  /**
   * this method will create new field
   * @return : ajfField
   */
  static create(fieldType: AjfFieldType, obj?: any): AjfField {
    let ret: AjfField;
    switch (fieldType) {
      case AjfFieldType.String:
        ret = new AjfStringField(obj);
        break;
      case AjfFieldType.Text:
        ret = new AjfTextField(obj);
        break;
      case AjfFieldType.Number:
        ret = new AjfNumberField(obj);
        break;
      case AjfFieldType.Boolean:
        ret = new AjfBooleanField(obj);
        break;
      case AjfFieldType.SingleChoice:
        ret = new AjfSingleChoiceField(obj);
        break;
      case AjfFieldType.MultipleChoice:
        ret = new AjfMultipleChoiceField(obj);
        break;
      case AjfFieldType.Formula:
        ret = new AjfFormulaField(obj);
        break;
      case AjfFieldType.Empty:
        ret = new AjfEmptyField(obj);
        break;
      case AjfFieldType.Date:
        ret = new AjfDateField(obj);
        break;
      case AjfFieldType.DateInput:
        ret = new AjfDateInputField(obj);
        break;
      case AjfFieldType.Time:
        ret = new AjfTimeField(obj);
        break;
      case AjfFieldType.Table:
        ret = new AjfTableField(obj);
        break;
      default:
        throw new Error('Invalid field type');
    }
    return ret;
  }

  /**
   * this method will load an AjfField from json
   * @param obj                : any - object node
   * @param choicesOrigins     : any[] - array of choicesOrigins
   * @param attachmentsOrigins : any[] - array of attachmentsOrigins
   * @return AjfNode
   */
  static fromJson(obj: any, choicesOrigins: any[], attachmentsOrigins: any[],
      context: any): AjfField {
    // array of string: contains a keys object
    // example:
    // ["id", "name", "label", "visibility", "hasChoices", "parent",
    // "parentNode", "conditionalBranches", "fieldType", "nodes"]
    obj = deepCopy(obj);
    if (context) {
      context = deepCopy(context);
    }
    let keys: string[] = Object.keys(obj);

    if (keys.indexOf('fieldType') === -1) {
      throw new Error('Field type missing type');
    }
    let fieldType = obj.fieldType;
    delete obj.fieldType;
    if (AjfFieldType[fieldType] == null) {
      throw new Error('Invalid field type');
    }

    if (keys.indexOf('visibility') > -1 && obj.visibility != null) {
      obj.visibility = AjfCondition.fromJson(obj.visibility);
    }

    if (keys.indexOf('formula') > -1 && obj.formula != null) {
      obj.formula = AjfFormula.fromJson(obj.formula);
    }

    if (keys.indexOf('choicesFilter') > -1 && obj.choicesFilter != null) {
      obj.choicesFilter = AjfFormula.fromJson(obj.choicesFilter);
    }

    if (keys.indexOf('validation') > -1 && obj.validation != null) {
      obj.validation = AjfValidationGroup.fromJson(obj.validation);
    }

    if (keys.indexOf('warning') > -1  && obj.warning != null) {
      obj.warning = AjfWarningGroup.fromJson(obj.warning);
    }

    if (keys.indexOf('choicesOriginRef') > -1) {
      let origins = choicesOrigins.filter(x => x.getName() === obj.choicesOriginRef);
      obj.choicesOrigin = origins.length > 0 ? origins[0] : null;
    }

    if (keys.indexOf('attachmentsOriginRef') > -1) {
      let origins = attachmentsOrigins.filter(x => x.getName() === obj.attachmentsOriginRef);
      obj.attachmentsOrigin = origins.length > 0 ? origins[0] : null;
    }

    if (keys.indexOf('triggerConditions') > -1 &&
        obj.triggerConditions != null &&
        obj.triggerConditions.length > 0) {
      obj.triggerConditions = obj.triggerConditions
        .map((t: any) => {
          return AjfCondition.fromJson(t);
        });
    }

    if (keys.indexOf('nodes') > -1 && obj.nodes instanceof Array) {
      let nodes: AjfNode[] = [];
      for (let i = 0 ; i < obj.nodes.length ; i ++) {
        let childNode = obj.nodes[i];
        childNode.parentField = obj.id;
        nodes.push(AjfNode.fromJson(childNode, choicesOrigins, attachmentsOrigins, context));
      }
      obj.nodes = nodes;
    }

    if (keys.indexOf('nextSlideCondition') > -1 && obj.nextSlideCondition != null) {
      obj.nextSlideCondition = AjfCondition.fromJson(obj.nextSlideCondition);
    }

    if (keys.indexOf('conditionalBranches') > -1 && obj.conditionalBranches instanceof Array) {
      let cbs: AjfCondition[] = [];
      for (let i = 0 ; i < obj.conditionalBranches.length ; i ++) {
        cbs.push(AjfCondition.fromJson(obj.conditionalBranches[i]));
      }
      obj.conditionalBranches = cbs;
    }

    return AjfField.create(fieldType, obj);
  }
  /**
   * this constructor will assign the obj value to a class variables
   */
  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers.concat([
      'fieldType', 'description',
      'editable', 'formula', 'validation', 'warning', 'hasChoices', 'defaultValue', 'size',
      'nextSlideCondition'
    ]);

    this._description         = obj && obj.description         || null;
    this._formula             = obj && obj.formula             || null;
    this._validation          = obj && obj.validation          || null;
    this._warning             = obj && obj.warning             || null;
    this._attachmentsOrigin   = obj && obj.attachmentsOrigin   || null;
    this.defaultValue         = obj && obj.defaultValue != null ? obj.defaultValue : null;
    this._size                = obj && obj.size                || 'normal';
    this._nextSlideCondition  = obj && obj.nextSlideCondition  || null;

    this.setHasAttachments(this._attachmentsOrigin && true || false);

    this._hasChoices = false;
    this.setEditable();
  }

  /**
   * this method will set the editable value of the field
   * @param editable : boolean
   */
  protected setEditable(editable = true) {
    this._editable = editable;
  }

  /**
   * this method will set the HasChoices value of the field
   * @param hasChoices : boolean
   */
  protected setHasChoices(hasChoices: boolean) {
    this._hasChoices = hasChoices;
  }

  /**
   * this method will set the hasAttachments value of the field
   * @param hasAttachments : boolean
   */
  protected setHasAttachments(hasAttachments: boolean) {
    this._hasAttachments = hasAttachments;
  }

  abstract validateValue(defaultValue: any): boolean;
}

/**
 * This class will define an ajf empty field
 */
export class AjfEmptyField extends AjfField {
  HTML: string;

  validateValue(_: any): boolean {
    return true;
  }

  constructor(obj?: any) {
    super(obj);
    this.jsonExportedMembers = this.jsonExportedMembers.concat([
      'HTML'
    ]);
    this.HTML = obj && obj.HTML || null;
  }
}

/**
 * This class will define an ajf string field
 */
export class AjfStringField extends AjfField {
  validateValue(value: any): boolean {
    return value === value.toString();
  }
}

/**
 * This class will define an ajf text field
 */

export class AjfTextField extends AjfStringField {
}

/**
 * This class will define an ajf number field
 */
export class AjfNumberField extends AjfField {
  validateValue(value: any): boolean {
    return value === parseInt(value, 10) || value === parseFloat(value);
  }
}

/**
 * This class will define an ajf boolean field
 */
export class AjfBooleanField extends AjfField {
  validateValue(value: any): boolean {
    return value === !!value;
  }

  getMaxConditionalBranches(): number {
    return 2;
  }
}

/**
 * This class will define an ajf field with choices
 */
export class AjfFieldWithChoices extends AjfField {
  choicesOrigin: IAjfChoicesOrigin;
  choicesFilter: AjfFormula;
  forceExpanded: boolean;
  forceNarrow: boolean;
  triggerConditions: AjfCondition[];

  get choices(): any[] {
    return this.choicesOrigin && this.choicesOrigin.getChoices() || [];
  }

  get choicesOriginRef(): string {
    return this.choicesOrigin.getName();
  }

  validateValue(_: any): boolean {
    return true;
  }

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers
      .concat([
        'choicesOriginRef', 'choicesFilter',
        'forceExpanded', 'forceNarrow', 'triggerConditions'
      ]);

    this.choicesOrigin     = obj && obj.choicesOrigin     || null;
    this.choicesFilter     = obj && obj.choicesFilter     || null;
    this.forceExpanded     = obj && obj.forceExpanded     || false;
    this.forceNarrow       = obj && obj.forceNarrow       || false;
    this.triggerConditions = obj && obj.triggerConditions || null;

    this.setHasChoices(true);
  }
}

/**
 * This class will define an ajf field with SingleChoice
 */
export class AjfSingleChoiceField extends AjfFieldWithChoices {
  constructor(obj?: any) {
    super(obj);
  }

  validateValue(value: any): boolean {
    return value == null || this.choices.filter(x => x === value).length > 0;
  }

  getMaxConditionalBranches(): number {
    return Math.max(1, this.choices.length + 1);
  }
}

/**
 * This class will define an ajf field with MultipleChoice
 */
export class AjfMultipleChoiceField extends AjfSingleChoiceField {
  constructor(obj?: any) {
    let defaultValue = obj && obj.defaultValue || [];
    obj = {...obj || {}, defaultValue};
    super(obj);
  }

  validateValue(value: any): boolean {
    if (value instanceof Array) {
      let i = 0;
      let l: number = value.length;
      let good = true;
      while (good && i < l) {
        good = super.validateValue(value[i++]);
      }
      return good;
    } else {
      return super.validateValue(value);
    }
  }

  getMaxConditionalBranches(): number {
    let total = 0;
    let l: number = this.choices.length;
    let f: number[] = [1];

    for (let i = 1; i <= l; i++) {
      f.push(factorial(i));
    }

    for (let i = 1; i <= l; i++) {
      total += f[l] / (f[i] * f[l - i]);
    }

    return total;
  }
}

/**
 * This class will define an formula field
 */
export class AjfFormulaField extends AjfNumberField {
  constructor(obj?: any) {
    super(obj);
    this.setEditable(false);
  }
}

/**
 * This class will define an ajf date field
 */
export class AjfDateField extends AjfField {
  minDate: Date | 'today';
  maxDate: Date | 'today';

  minDateValue: Date;
  maxDateValue: Date;

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers
      .concat(['maxDate', 'minDate']);

    this.minDate = obj && obj.minDate || null;
    this.maxDate = obj && obj.maxDate || null;

    this.minDateValue = this.minDate === 'today' ? new Date() : <Date>this.minDate;
    this.maxDateValue = this.maxDate === 'today' ? new Date() : <Date>this.maxDate;
  }

  validateValue(value: any): boolean {
    return value === value.toString();
  }
}


export class AjfDateInputField extends AjfField {
  constructor(obj?: any) {
    super(obj);
  }

  validateValue(value: any): boolean {
    return value === value.toString();
  }
}

export class AjfTimeField extends AjfField {

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers
      .concat([]);
  }

  validateValue(value: any): boolean {
    return value === value.toString();
  }
}

export class AjfTableField extends AjfField {
  rows: string[][];
  columnLabels: string[] = [];
  rowLabels: string[] = [];
  hideEmptyRows: boolean = false;


  constructor(obj?: any) {
    super(obj);

    this.setEditable(obj && obj.editable || false);

    this.jsonExportedMembers = this.jsonExportedMembers.concat(
      [ 'rows', 'columnLabels', 'rowLabels' ]);

    this.rows = obj && obj.rows || [];
    this.columnLabels = obj && obj.columnLabels || [];
    this.rowLabels = obj && obj.rowLabels || [];
    this.hideEmptyRows = obj && obj.hideEmptyRows || false;
  }

  validateValue(value: any): boolean { return value === value.toString(); }
}
