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

import {EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';

import {Observable, ReplaySubject} from 'rxjs';

import {AjfCondition, AjfFormula} from '@ajf/core/models';
import {AjfChoice} from './choices';
import {
  AjfDateField, AjfEmptyField, AjfField, AjfFieldWithChoices, AjfNode, AjfNodeGroup,
  AjfRepeatingSlide, AjfSlide, AjfTableField, IAjfSlide
} from './nodes';
import {AjfValidationGroup, AjfValidationResult} from './validation';
import {AjfWarningGroup, AjfWarningResult} from './warning';


export interface AjfFieldState {
  visibility: boolean;
  value: any;
}

export interface IAjfNodeInstance {
  node: AjfNode;
  prefix?: number[];
  visible?: boolean;
}


export class AjfNodeInstance implements IAjfNodeInstance {
  private _updatedEvt: EventEmitter<void> = new EventEmitter<void>();
  private _updated: Observable<void>;
  get updated(): Observable<void> { return this._updated; }

  private _node: AjfNode;
  get node(): AjfNode { return this._node; }
  // is the index of node loop
  private _prefix: number[];
  get prefix(): number[] { return this._prefix.slice(0); }
  // if is true this node is visible on the form
  private _visible: boolean;
  get visible(): boolean { return this._visible; }

  get suffix(): string {
    if (this.prefix == null || this.prefix.length == 0) { return ''; }
    return `__${this.prefix.join('__')}`;
  }

  /**
   * this method will get the complete name of the field
   * @return : string
   */
  get completeName(): string {
    return `${this.node.name}${this.suffix}`;
  }

  //  index of conditionalBranches that verified the branch
  verifiedBranch: number;
  conditionalBranches: AjfCondition[];

  visibility: AjfCondition | null;

  constructor(params: IAjfNodeInstance, _context?: any) {
    this._updated = this._updatedEvt.asObservable();

    this._node = params.node;
    this._prefix = params.prefix != null ? params.prefix.slice(0) : [];
    this._visible = params.visible != null ? params.visible : true;
  }

  protected setNode(node: AjfNode) { this._node = node; }

  triggerUpdate(): void {
    this._updatedEvt.emit();
  }

  /**
   * Update nodes visibility based on context value.
   * Returns true if the visibility has changes
   *
   * @param context Context value
   * @param branchVisibility
   *
   * @memberOf AjfNodeInstance
   */
  updateVisibility(context: any, branchVisibility = true): boolean {
    if (this.visibility == null) { return false; }
    const visibility: AjfCondition = this.visibility;

    const oldVisibility: boolean = this.visible;
    let newVisibility: boolean = branchVisibility && visibility.evaluate(context);
    if (newVisibility !== this.visible) {
      this._visible = newVisibility;
    }

    return oldVisibility !== newVisibility;
  }

  updateConditionalBranches(context: any): boolean {
    const conditionalBranches = this.conditionalBranches;

    if (conditionalBranches != null) {
      const oldBranch = this.verifiedBranch;
      let idx = 0;
      let found = false;
      while (idx < conditionalBranches.length && !found) {
        let verified: boolean = conditionalBranches[idx].evaluate(context);
        if (verified) {
          found = true;
          if (idx !== this.verifiedBranch) {
            this.verifiedBranch = idx;
          }
        }
        idx++;
      }

      if (oldBranch !== this.verifiedBranch) {
        return true;
      }
    }

    return false;
  }
}

export class AjfFieldInstance extends AjfNodeInstance {
  // if the field pass the validation
  valid: boolean;
  // number of repetitions
  reps = 0;
  // an array of AjfValidationResult
  protected _validationResults: AjfValidationResult[] = [];
  // an array of AjfWarningResult
  protected _warningResults: AjfWarningResult[] = [];
  protected _defaultValue: any = null;

  get field(): AjfField { return <AjfField>this.node; }
  set field(field: AjfField) { this.setNode(field); }

  private _value: any;
  // the value of field
  get value(): any { return this._value != null && this._value || this._defaultValue; }
  set value(value: any) { this._value = value; }

  private _triggerWarning: ReplaySubject<void> = new ReplaySubject<void>(1);
  get triggerWarning(): Observable<void> { return this._triggerWarning.asObservable(); }

  constructor(params: IAjfNodeInstance, context?: any) {
    super(params, context);
    this.value = this.node && context && this.node.name in context
      && context[this.node.name] || null;
    const defVal = (<AjfField>this.node).defaultValue;
    this._defaultValue = this.node && defVal != null ? defVal : null;
  }

  /**
   * this method will get the validationResults value of the field
   * @return : _validationResults
   */
  get validationResults(): AjfValidationResult[] {
    return this._validationResults;
  }

  /**
   * this method will get the warningResults value of the field
   * @return : _warningResults
   */
  get warningResults(): AjfWarningResult[] {
    return this._warningResults;
  }

  formula: AjfFormula | null;
  validation: AjfValidationGroup | null;
  warning: AjfWarningGroup | null;
  nextSlideCondition: AjfCondition | null;

  updateFormula(context: any): { changed: boolean, value: any } {
    const formula = this.formula;
    const editable = this.field.editable;
    if (formula != null && this.visible && (!editable || (editable && this.value == null))) {
      let newValue: any = formula.evaluate(context);
      const oldValue = this.value;
      if (newValue !== this.value) {
        this.value = newValue;
        context[this.completeName] = this.value;
        context.$value = this.value;
      }
      return {
        changed: newValue !== oldValue,
        value: newValue
      };
    }
    return { changed: false, value: this.value };
  }

  private _makeSupplementaryContext(context: any, supplementaryInformations: any): any {
    Object.keys(supplementaryInformations).forEach((key) => {
      context[`__supplementary__${key}__`] = supplementaryInformations[key];
    });
    return context;
  }

  updateValidation(context: any, supplementaryInformations?: any): void {
    const validation = this.validation;
    if (validation == null) { return; }

    if (supplementaryInformations) {
      this._makeSupplementaryContext(context, supplementaryInformations);
    }

    if (context[this.completeName] != null && validation && validation.forceValue) {
      this.value = validation.evaluateForceValue(context);
      context[this.completeName] = this.value;
      context.$value = this.value;
    }

    if (validation != null) {
      this._validationResults = validation.evaluate(context[this.completeName], context);
      this.valid = this.validationResults
        .reduce((prev: boolean, x: AjfValidationResult) => prev && x.result, true);
    } else {
      this.valid = true;
    }
  }

  updateWarning(context: any): void {
    const warning = this.warning;

    if (context[this.completeName] != null && warning) {
      this._warningResults = warning.evaluate(context);
    }
  }

  updateNextSlideCondition(context: any): boolean {
    if (this.nextSlideCondition != null) {
      return this.nextSlideCondition.evaluate(context);
    }
    return false;
  }

  /**
   * this method will update the state of the field
   * @param   context         : any - the context of the field to update
   * @param   branchVisibility: boolean
   */
  updateFieldState(context: any, branchVisibility = true): void {
    this.updateVisibility(context, branchVisibility);
    this.updateConditionalBranches(context);
    this.updateFormula(context);
    this.updateValidation(context);
    this.updateWarning(context);
    this.updateNextSlideCondition(context);
  }

  emitTriggerWarning(): void {
    this._triggerWarning.next();
  }
}

export class AjfFieldWithChoicesInstance extends AjfFieldInstance {
  choicesFilter: AjfFormula;
  filteredChoices: AjfChoice<any>[];
  triggerConditions: AjfCondition[];

  get field(): AjfFieldWithChoices { return <AjfFieldWithChoices>this.node; }
  set field(field: AjfFieldWithChoices) { this.setNode(field); }

  private _triggerSelection: ReplaySubject<null> = new ReplaySubject<null>(1);
  get triggerSelection(): Observable<null> { return this._triggerSelection.asObservable(); }
  private _firstTriggerConditionDone: any = {};

  constructor(params: IAjfNodeInstance, context?: any) {
    super(params, context);
    this.filteredChoices = this.field.choices.slice(0);
  }

  updateFilteredChoices(context: any): void {
    if (this.choicesFilter != null) {
      this.filteredChoices = this.field.choicesOrigin
        .getChoices()
        .filter(c => {
          context.$choiceValue = c.value;
          return this.choicesFilter.evaluate(context);
        });
    } else {
      this.filteredChoices = this.field.choicesOrigin
        .getChoices();
    }
  }

  updateTriggerConditions(context: any): boolean {
    if (this._firstTriggerConditionDone[this.completeName]) {
      return false;
    }
    let found = false;
    const conditionsNum = this.triggerConditions.length;
    for (let i = 0 ; i < conditionsNum ; i++) {
      if (this.triggerConditions[i].evaluate(context)) {
        found = true;
        break;
      }
    }
    this._firstTriggerConditionDone[this.completeName] = found;
    return found;
  }

  emitTriggerSelection(): void {
    this._triggerSelection.next(null);
  }
}

export class AjfNodeGroupInstance extends AjfNodeInstance {
  nodesNames: string[];
  nodes: AjfNodeInstance[];
  flatNodes: AjfNodeInstance[];
  formulaReps: AjfFormula | null;

  // number of repetitions
  private _reps: number;
  get reps(): number { return this._reps; }
  set reps(reps: number) {
    this._reps = reps;
    this._repsArr = new Array(reps);
  }

  private _repsArr: Array<number>;
  get repsArr(): Array<number> { return this._repsArr; }

  get valid(): boolean {
    return this.nodes.map(n => {
      if (Object.keys(n).indexOf('valid') > -1) {
        return (<any>n).valid;
      }
      return true;
    }).reduce((v1, v2) => v1 && v2);
  }

  get nodeGroup(): AjfNodeGroup { return <AjfNodeGroup>this.node; }
  protected setNodeGroup(nodeGroup: AjfNodeGroup) { this.setNode(nodeGroup); }

  constructor(params: IAjfNodeInstance, context?: any) {
    super(params, context);
  }

  updateRepsNum(context: any): number {
    const oldReps: number = this.reps || 0;
    if (this.nodeGroup.formulaReps == null) {
      const ctxReps = context[this.completeName];
      if (ctxReps != null) {
        this.reps = ctxReps;
      } else if (oldReps == 0) {
        this.reps = 1;
      }
    } else {
      let newReps = this.nodeGroup.formulaReps.evaluate(context);
      if (newReps !== oldReps) {
        this.reps = newReps;
      }
    }
    return oldReps;
  }
}

export interface IAjfSlideInstance extends IAjfNodeInstance {
  nodes: AjfNodeInstance[];
  flatNodes: AjfNodeInstance[];
  readonly valid: boolean;
  readonly slide: IAjfSlide;
}

export class AjfSlideInstance extends AjfNodeInstance implements IAjfSlideInstance {
  nodes: AjfNodeInstance[] = [];
  flatNodes: AjfNodeInstance[] = [];
  position: number;
  get valid(): boolean {
    return this.flatNodes.map(n => {
      if (n.visible && Object.keys(n).indexOf('valid') > -1) {
        return (<any>n).valid;
      }
      return true;
    }).reduce((v1, v2) => v1 && v2, true);
  }
  get slide(): AjfSlide { return <AjfSlide>this.node; }
  protected setSlide(slide: AjfSlide) { this.setNode(slide); }
}

export class AjfRepeatingSlideInstance extends AjfSlideInstance implements IAjfSlideInstance {
  formulaReps: AjfFormula;
  position: number;
  slideNodes: AjfNodeInstance[][];
  canRemoveGroup: boolean;
  canAddGroup: boolean;

  private _reps: number;
  get reps(): number { return this._reps; }
  set reps(reps: number) {
    this._reps = reps;
    this.canRemoveGroup = this.slide.minReps === 0 || reps > this.slide.minReps;
    this.canAddGroup = this.slide.maxReps === 0 || reps < this.slide.maxReps;
    this._repsArr = new Array(reps);
  }

  private _repsArr: Array<number>;
  get repsArr(): Array<number> { return this._repsArr; }

  get slide(): AjfRepeatingSlide { return <AjfRepeatingSlide>this.node; }

  get nodesPerSlide(): number {
    return this.nodes != null ? this.nodes.length / this.reps : 0;
  }

  protected setSlide(slide: AjfRepeatingSlide) { this.setNode(slide); }

  constructor(params: IAjfNodeInstance, context?: any) {
    super(params, context);
  }

  validSlide(idx: number): boolean {
    if (idx >= this.slideNodes.length) {
      return true;
    }
    return this.slideNodes[idx]
      .map(n => {
        if (n.visible && Object.keys(n).indexOf('valid') > -1) {
          return (<any>n).valid;
        }
        return true;
      }).reduce((v1, v2) => v1 && v2, true);
  }

  slidePosition(idx: number): number {
    return this.position + idx;
  }

  updateRepsNum(context: any): number {
    const oldReps: number = this.reps || 0;
    if (this.slide.formulaReps == null) {
      const ctxReps = context[this.completeName];
      if (ctxReps != null) {
        this.reps = ctxReps;
      } else if (oldReps == 0) {
        this.reps = 1;
      }
    } else {
      let newReps = this.slide.formulaReps.evaluate(context);
      if (newReps !== oldReps) {
        this.reps = newReps;
      }
    }
    return oldReps;
  }
}

export class AjfTableFieldInstance extends AjfFieldInstance {

  constructor(params: IAjfNodeInstance, context?: any) {
    super(params, context);
    this.setValue(context);
    this._hideEmptyRows = (<AjfTableField>this.node).hideEmptyRows;
  }

  private _hideEmptyRows: boolean;

  get hideEmptyRows(): boolean {
    return this._hideEmptyRows;
  }

  private _matrixValue: string[][];
  private _matrixFormControl: FormControl[][];
  private _matrixFormControlWithLabels: (FormControl | string)[][];
  private _context: any = {};


  get controls(): FormControl[][] {
    return this._matrixFormControl;
  }

  set controls(v: FormControl[][]) {
    this._matrixFormControl = v;
    this._matrixFormControlWithLabels = this._controlsWithLabels();
  }

  get controlsWithLabels(): (FormControl | string)[][] {
    return this._matrixFormControlWithLabels;
  }

  private _controlsWithLabels(): (FormControl | string) [][] {
    let node = <AjfTableField>this.node;
    let ret: (FormControl | string)[][] = [];
    let i = 0;
    for (let rowLabel of <any>(node.rowLabels)) {
      ret.push([rowLabel].concat(<any>this._matrixFormControl[i]));
      i = i + 1;
    }
    ret.unshift([node.label].concat(node.columnLabels));
    return ret;
  }

  get value() {
    let node = <AjfTableField>this.node;
    if (node.editable) {
      return this._matrixFormControl;
    }
    return this._matrixValue;
  }
  set value(_v: any) {}

  get context(): any {
    return this._context;
  }

  setValue(context: any) {
    let node = <AjfTableField>this.node;
    if (!node.editable) {
      let value: string[][] = [];
      let rowIndex = 0;
      node.rows.forEach((row) => {
        row.forEach((k) => {
          this._context[k] = context[k];
        });
        value[rowIndex] = [node.rowLabels[rowIndex]]
          .concat(
          row.map(k => context[k])
          );
        rowIndex += 1;
      });
      value.unshift([node.label].concat(node.columnLabels));
      this._matrixValue = value;
    } else {
      this._context = context;
    }
  }

  get visibleColumns(): string[][] {
    if (this.hideEmptyRows) {
      return this.value
        .filter((column: any[]) =>
          column
            .slice(1)
            .reduce((a: any, b: any) => {
              return a || (b != null && b !== '' && b !== 0 && b !== '0');
            }, false));
    }
    return this.value;
  }
}

export class AjfDateFieldInstance extends AjfFieldInstance {
  get field(): AjfDateField { return this.field; }
  set field(field: AjfDateField) { this.setNode(field); }
}

export class AjfEmptyFieldInstance extends AjfFieldInstance {
  get field(): AjfEmptyField { return this.field; }
  set field(field: AjfEmptyField) { this.setNode(field); }
}
