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

import {
  ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, ViewEncapsulation
} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {Observable, Subscription} from 'rxjs';
import {
  distinctUntilChanged, filter, map, publishReplay, refCount, withLatestFrom
} from 'rxjs/operators';

import {AjfCondition} from '@ajf/core/models';
import {
  AjfField, AjfFieldWithChoices, AjfNode, AjfNumberField, IAjfChoicesOrigin,
} from '@ajf/core/forms';

import {AjfFbConditionEditorDialog} from './condition-editor-dialog';
import {
  AjfFormBuilderNodeEntry, AjfFormBuilderService,
  AjfRepeatingContainerNode, isRepeatingContainerNode
} from './form-builder-service';
import {AjfFbValidationConditionEditorDialog} from './validation-condition-editor-dialog';
import {AjfFbWarningConditionEditorDialog} from './warning-condition-editor-dialog';


function checkRepsValidity(c: AbstractControl): {[key: string]: any} | null {
  const minReps = c.value.minReps;
  const maxReps = c.value.maxReps;
  if (minReps != null && maxReps != null && minReps > maxReps) {
    return {
      reps: 'Min repetions cannot be greater than max repetitions'
    };
  }
  return null;
}

function checkValueLimitsValidity(c: AbstractControl): {[key: string]: any} | null {
  const minValue = c.value.minValue;
  const maxValue = c.value.maxValue;
  if (minValue != null && maxValue != null && minValue > maxValue) {
    return {
      valueLimit: 'Min value cannot be greater than max value'
    };
  }
  return null;
}

function checkDigitsValidity(c: AbstractControl): {[key: string]: any} | null {
  const minDigits = c.value.minDigits;
  const maxDigits = c.value.maxDigits;
  if (minDigits != null && maxDigits != null && minDigits > maxDigits) {
    return {
      digits: 'Min digits cannot be greater than max digits'
    };
  }
  return null;
}

export interface ValidationCondition {
  condition: string;
  errorMessage: string;
}

export interface WarningCondition {
  condition: string;
  warningMessage: string;
}


@Component({
  moduleId: module.id,
  selector: 'ajf-fb-node-properties',
  templateUrl: 'node-properties.html',
  styleUrls: ['node-properties.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfFbNodeProperties implements OnDestroy {
  private _fieldSizes: {label: string, value: string}[] = [
    {label: 'Normal', value: 'normal'},
    {label: 'Small', value: 'small'},
    {label: 'Smaller', value: 'smaller'},
    {label: 'Tiny', value: 'tiny'},
    {label: 'Mini', value: 'mini'}
  ];
  get fieldSizes(): {label: string, value: string}[] { return this._fieldSizes; }

  private _nodeEntry: Observable<AjfFormBuilderNodeEntry | null>;
  get nodeEntry(): Observable<AjfFormBuilderNodeEntry | null> { return this._nodeEntry; }

  private _choicesOrigins: IAjfChoicesOrigin[] = [];
  get choicesOrigins(): IAjfChoicesOrigin[] { return this._choicesOrigins; }

  private _enabled: Observable<boolean>;
  get enabled(): Observable<boolean> { return this._enabled; }

  private _propertiesForm: Observable<FormGroup>;
  get propertiesForm(): Observable<FormGroup> { return this._propertiesForm; }

  private _hasChoices: Observable<boolean>;
  get hasChoices(): Observable<boolean> { return this._hasChoices; }

  private _curVisibility: string | null;
  get curVisibility(): string | null { return this._curVisibility; }

  private _curFormulaReps: string | null;
  get curFormulaReps(): string | null { return this._curFormulaReps; }

  private _curChoicesFilter: string;
  get curChoicesFilter(): string { return this._curChoicesFilter; }

  private _curForceValue: string | null;
  get curForceValue(): string | null { return this._curForceValue; }

  private _curFormula: string | null;
  get curFormula(): string | null { return this._curFormula; }

  private _conditionalBranches: string[] = [];
  get conditionalBranches(): string[] { return this._conditionalBranches; }

  private _validationConditions: ValidationCondition[] = [];
  get validationConditions(): ValidationCondition[] { return this._validationConditions; }

  private _warningConditions: WarningCondition[] = [];
  get warningConditions(): WarningCondition[] { return this._warningConditions; }

  private _nextSlideCondition: string;
  get nextSlideCondition(): string { return this._nextSlideCondition; }

  private _triggerConditions: string[];
  get triggerConditions(): string[] { return this._triggerConditions; }

  isRepeatingContainerNode: (node: AjfNode) => boolean = isRepeatingContainerNode;

  private _visibilitySub: Subscription = Subscription.EMPTY;
  private _conditionalBranchesSub = Subscription.EMPTY;
  private _formulaRepsSub = Subscription.EMPTY;
  private _choicesFilterSub = Subscription.EMPTY;
  private _formulaSub = Subscription.EMPTY;
  private _forceValueSub = Subscription.EMPTY;
  private _validationConditionsSub = Subscription.EMPTY;
  private _warningConditionsSub = Subscription.EMPTY;
  private _nextSlideConditionSub = Subscription.EMPTY;
  private _choicesOriginsSub = Subscription.EMPTY;
  private _triggerConditionsSub = Subscription.EMPTY;

  private _editConditionDialog: MatDialogRef<AjfFbConditionEditorDialog> | null;
  private _editConditionDialogSub: Subscription = Subscription.EMPTY;
  private _editValidationConditionDialog: MatDialogRef<AjfFbValidationConditionEditorDialog> | null;
  private _editValidationConditionDialogSub: Subscription = Subscription.EMPTY;
  private _editWarningConditionDialog: MatDialogRef<AjfFbWarningConditionEditorDialog> | null;
  private _editWarningConditionDialogSub: Subscription = Subscription.EMPTY;

  private _editVisibilityEvt: EventEmitter<void> = new EventEmitter<void>();
  private _editVisibilitySub = Subscription.EMPTY;

  private _editConditionalBranchEvt: EventEmitter<number> = new EventEmitter<number>();
  private _editConditionalBranchSub = Subscription.EMPTY;

  private _editFormulaRepsEvt: EventEmitter<void> = new EventEmitter<void>();
  private _editFormulaRepsSub = Subscription.EMPTY;

  private _editChoicesFilterEvt: EventEmitter<void> = new EventEmitter<void>();
  private _editChoicesFilterSub = Subscription.EMPTY;

  private _editFormulaEvt: EventEmitter<void> = new EventEmitter<void>();
  private _editFormulaSub = Subscription.EMPTY;

  private _editForceValueEvt: EventEmitter<void> = new EventEmitter<void>();
  private _editForceValueSub = Subscription.EMPTY;

  private _editValidationConditionEvt: EventEmitter<number> = new EventEmitter<number>();
  private _editValidationConditionSub = Subscription.EMPTY;

  private _addValidationConditionEvt: EventEmitter<void> = new EventEmitter<void>();
  private _addValidationConditionSub = Subscription.EMPTY;

  private _removeValidationConditionEvt: EventEmitter<number> = new EventEmitter<number>();
  private _removeValidationConditionSub = Subscription.EMPTY;

  private _editWarningConditionEvt: EventEmitter<number> = new EventEmitter<number>();
  private _editWarningConditionSub = Subscription.EMPTY;

  private _addWarningConditionEvt: EventEmitter<void> = new EventEmitter<void>();
  private _addWarningConditionSub = Subscription.EMPTY;

  private _removeWarningConditionEvt: EventEmitter<number> = new EventEmitter<number>();
  private _removeWarningConditionSub = Subscription.EMPTY;

  private _editNextSlideConditionEvt: EventEmitter<void> = new EventEmitter<void>();
  private _editNextSlideConditionSub = Subscription.EMPTY;

  private _editTriggerConditionEvt: EventEmitter<number> = new EventEmitter<number>();
  private _editTriggerConditionSub = Subscription.EMPTY;

  private _addTriggerConditionEvt: EventEmitter<void> = new EventEmitter<void>();
  private _addTriggerConditionSub = Subscription.EMPTY;

  private _removeTriggerConditionEvt: EventEmitter<number> = new EventEmitter<number>();
  private _removeTriggerConditionSub = Subscription.EMPTY;

  private _saveEvt: EventEmitter<void> = new EventEmitter<void>();
  private _saveSub = Subscription.EMPTY;

  constructor(
    private _service: AjfFormBuilderService,
    private _dialog: MatDialog,
    private _fb: FormBuilder
  ) {
    this._nodeEntry = _service.editedNodeEntry;
    this._choicesOriginsSub = _service.choicesOrigins
      .subscribe((c) => this._choicesOrigins = c || []);

    this._enabled = this._nodeEntry.pipe(map((n) => n != null));

    this._initForm();
    this._initVisibilityEdit();
    this._initConditionalBranchEdit();
    this._initFormulaRepsEdit();
    this._initChoicesFilterEdit();
    this._initFormulaEdit();
    this._initForceValueEdit();
    this._initValidationConditionEdit();
    this._initAddValidationCondition();
    this._initRemoveValidationCondition();
    this._initWarningConditionEdit();
    this._initAddWarningCondition();
    this._initRemoveWarningCondition();
    this._initNextSlideConditionEdit();
    this._initTriggerConditionEdit();
    this._initAddTriggerCondition();
    this._initRemoveTriggerCondition();
    this._initSave();
  }

  editVisibility(): void {
    this._editVisibilityEvt.emit();
  }

  editConditionalBranch(idx: number): void {
    if (idx < 0 || idx >= this._conditionalBranches.length) { return; }
    this._editConditionalBranchEvt.emit(idx);
  }

  editFormulaReps(): void {
    this._editFormulaRepsEvt.emit();
  }

  editChoicesFilter(): void {
    this._editChoicesFilterEvt.emit();
  }

  editFormula(): void {
    this._editFormulaEvt.emit();
  }

  editForceValue(): void {
    this._editForceValueEvt.emit();
  }

  editValidationCondition(idx: number): void {
    if (idx < 0 || idx >= this._validationConditions.length) { return; }
    this._editValidationConditionEvt.emit(idx);
  }

  addValidationCondition(): void {
    this._addValidationConditionEvt.emit();
  }

  removeValidationCondition(idx: number): void {
    if (idx < 0 || idx >= this._validationConditions.length) { return; }
    this._removeValidationConditionEvt.emit(idx);
  }

  editWarningCondition(idx: number): void {
    if (idx < 0 || idx >= this._warningConditions.length) { return; }
    this._editWarningConditionEvt.emit(idx);
  }

  addWarningCondition(): void {
    this._addWarningConditionEvt.emit();
  }

  removeWarningCondition(idx: number): void {
    if (idx < 0 || idx >= this._warningConditions.length) { return; }
    this._removeWarningConditionEvt.emit(idx);
  }

  editNextSlideCondition(): void {
    this._editNextSlideConditionEvt.emit();
  }

  editTriggerCondition(idx: number): void {
    if (idx < 0 || idx >= this._triggerConditions.length) { return; }
    this._editTriggerConditionEvt.emit(idx);
  }

  addTriggerCondition(): void {
    this._addTriggerConditionEvt.emit();
  }

  removeTriggerCondition(idx: number): void {
    if (idx < 0 || idx >= this._triggerConditions.length) { return; }
    this._removeTriggerConditionEvt.emit(idx);
  }

  isField(node: AjfNode): boolean {
    return node != null && node instanceof AjfField;
  }

  isNumericField(node: AjfNode): boolean {
    return node != null && node instanceof AjfNumberField;
  }

  isFieldWithChoices(node: AjfNode): boolean {
    return node != null && node instanceof AjfFieldWithChoices;
  }

  save(): void {
    this._saveEvt.emit();
  }

  cancel(): void {
    this._service.cancelNodeEntryEdit();
  }

  ngOnDestroy(): void {
    this._choicesOriginsSub.unsubscribe();

    this._visibilitySub.unsubscribe();
    this._formulaRepsSub.unsubscribe();
    this._choicesFilterSub.unsubscribe();
    this._formulaSub.unsubscribe();
    this._forceValueSub.unsubscribe();
    this._validationConditionsSub.unsubscribe();
    this._warningConditionsSub.unsubscribe();
    this._triggerConditionsSub.unsubscribe();

    this._editConditionDialogSub.unsubscribe();
    this._editValidationConditionDialogSub.unsubscribe();
    this._editWarningConditionDialogSub.unsubscribe();

    this._editChoicesFilterSub.unsubscribe();
    this._editConditionalBranchSub.unsubscribe();
    this._editVisibilitySub.unsubscribe();
    this._editFormulaRepsSub.unsubscribe();
    this._editFormulaSub.unsubscribe();
    this._editForceValueSub.unsubscribe();
    this._editValidationConditionSub.unsubscribe();
    this._editWarningConditionSub.unsubscribe();
    this._nextSlideConditionSub.unsubscribe();

    this._addTriggerConditionSub.unsubscribe();
    this._addValidationConditionSub.unsubscribe();
    this._addWarningConditionSub.unsubscribe();
    this._editNextSlideConditionSub.unsubscribe();
    this._editTriggerConditionSub.unsubscribe();
    this._removeTriggerConditionSub.unsubscribe();
    this._removeValidationConditionSub.unsubscribe();
    this._removeWarningConditionSub.unsubscribe();

    this._saveSub.unsubscribe();
  }

  private _initSave(): void {
    this._saveSub = (<Observable<void>>this._saveEvt)
      .pipe(withLatestFrom(this.propertiesForm))
      .subscribe((r: [void, FormGroup]) => {
        const fg = r[1];
        const val = Object.assign({}, fg.value, {
          conditionalBranches: this._conditionalBranches
        });
        this._service.saveNodeEntry(val);
      });
  }

  private _initForm(): void {
    this._propertiesForm = this._nodeEntry.pipe(
      filter((n) => n != null),
      map((n) => {
        if (this._visibilitySub != null) { this._visibilitySub.unsubscribe(); }
        if (this._conditionalBranchesSub != null) { this._conditionalBranchesSub.unsubscribe(); }
        n = n!;

        const visibility = n.node.visibility != null ?
          n.node.visibility.condition : null;
        const visibilityOpt = n.node.visibility != null ?
          this._guessVisibilityOpt(n.node.visibility) : null;
        let controls: any = {
          name: [n.node.name, Validators.required],
          label: n.node.label,
          visibilityOpt: [visibilityOpt, Validators.required],
          visibility: [visibility, Validators.required],
          conditionalBranchesNum: n.node.conditionalBranches.length
        };
        const validators: ValidatorFn[] = [];

        if (isRepeatingContainerNode(n.node)) {
          const rn = <AjfRepeatingContainerNode>n.node;

          const formulaReps = rn.formulaReps != null ? rn.formulaReps.formula : null;

          controls.formulaReps = [formulaReps, Validators.required];
          controls.minReps = rn.minReps;
          controls.maxReps = rn.maxReps;

          this._curFormulaReps = formulaReps;

          validators.push(checkRepsValidity);
        }

        if (this.isField(n.node)) {
          const field = <AjfField>n.node;

          let forceValue: string | null = null;
          let notEmpty: boolean = false;
          let validationConditions: ValidationCondition[] = [];
          if (field.validation != null) {
            if (field.validation.forceValue != null) {
              forceValue = field.validation.forceValue.condition;
            }
            notEmpty = field.validation.notEmpty != null;
            validationConditions = (field.validation.conditions || [])
              .map(c => {
                return {
                  condition: c.condition,
                  errorMessage: c.errorMessage
                };
              });
          }

          let notEmptyW: boolean = false;
          let warningConditions: WarningCondition[] = [];
          if (field.warning != null) {
            notEmptyW = field.warning.notEmpty != null;
            warningConditions = (field.warning.conditions || [])
              .map(w => {
                return {
                  condition: w.condition,
                  warningMessage: w.warningMessage
                };
              });
          }
          const formula = field.formula != null ? field.formula.formula : null;

          controls.description = field.description;
          controls.defaultValue = field.defaultValue;
          controls.size = field.size;
          controls.formula = formula;
          controls.forceValue = forceValue;
          controls.notEmpty = notEmpty;
          controls.validationConditions = [validationConditions, []];
          controls.notEmptyWarning = notEmptyW;
          controls.warningConditions = [warningConditions, []];
          controls.nextSlideCondition = [field.nextSlideCondition];

          this._curForceValue = forceValue;
          this._curFormula = formula;
          this._validationConditions = validationConditions;
          this._warningConditions = warningConditions;
        }

        if (this.isNumericField(n.node)) {
          const numField = <AjfNumberField>n.node;

          let minValue: any;
          let maxValue: any;
          let minDigits: any;
          let maxDigits: any;
          if (numField.validation != null) {
            if (numField.validation.minValue != null) {
              minValue = (numField.validation.minValue.condition || '').replace('$value >= ', '');
            }
            if (numField.validation.maxValue != null) {
              maxValue = (numField.validation.maxValue.condition || '').replace('$value <= ', '');
            }
            if (numField.validation.minDigits != null) {
              minDigits = (numField.validation.minDigits.condition || '')
                .replace('$value.toString().length >= ', '');
            }
            if (numField.validation.maxDigits != null) {
              maxDigits = (numField.validation.maxDigits.condition || '')
                .replace('$value.toString().length <= ', '');
            }
          }

          controls.minValue = minValue;
          controls.maxValue = maxValue;
          controls.minDigits = minDigits;
          controls.maxDigits = maxDigits;

          validators.push(checkValueLimitsValidity);
          validators.push(checkDigitsValidity);
        }

        if (this.isFieldWithChoices(n.node)) {
          const fieldWithChoices = <AjfFieldWithChoices>n.node;

          let triggerConditions: string[] = (fieldWithChoices.triggerConditions || [])
            .map((c) => c.condition);

          controls.choicesOrigin = fieldWithChoices.choicesOrigin.getName();
          controls.choicesFilter = fieldWithChoices.choicesFilter != null ?
            fieldWithChoices.choicesFilter.formula : null;
          controls.forceExpanded = fieldWithChoices.forceExpanded;
          controls.forceNarrow = fieldWithChoices.forceNarrow;
          controls.triggerConditions = triggerConditions;

          this._triggerConditions = triggerConditions;
        }

        const fg = this._fb.group(controls);
        fg.setValidators(validators);

        this._conditionalBranches = n.node.conditionalBranches.map(c => c.condition);
        this._curVisibility = n.node.visibility != null ? n.node.visibility.condition : null;

        this._handleConditionalBranchesChange(fg);
        this._handleVisibilityChange(fg);
        this._handleFormulaRepsChange(fg);
        this._handleChoicesFilterChange(fg);
        this._handleFormulaChange(fg);
        this._handleForceValueChange(fg);
        this._handleValidationCondtionsChange(fg);
        this._handleWarningCondtionsChange(fg);
        this._handleNextSlideConditionChange(fg);
        this._handleTriggerCondtionsChange(fg);

        return fg;
      }),
      publishReplay(1),
      refCount()
    );
  }

  private _destroyConditionDialog(): void {
    if (this._editConditionDialogSub != null) {
      this._editConditionDialogSub.unsubscribe();
      this._editConditionDialogSub = Subscription.EMPTY;
    }
    if (this._editConditionDialog != null) {
      this._editConditionDialog.close();
      this._editConditionDialog = null;
    }
  }

  private _destroyValidationConditionDialog(): void {
    if (this._editValidationConditionDialogSub != null) {
      this._editValidationConditionDialogSub.unsubscribe();
      this._editValidationConditionDialogSub = Subscription.EMPTY;
    }
    if (this._editValidationConditionDialog != null) {
      this._editValidationConditionDialog.close();
      this._editValidationConditionDialog = null;
    }
  }

  private _destroyWarningConditionDialog(): void {
    if (this._editWarningConditionDialogSub != null) {
      this._editWarningConditionDialogSub.unsubscribe();
      this._editWarningConditionDialogSub = Subscription.EMPTY;
    }
    if (this._editWarningConditionDialog != null) {
      this._editWarningConditionDialog.close();
      this._editWarningConditionDialog = null;
    }
  }

  private _initRemoveTriggerCondition(): void {
    this._removeTriggerConditionSub = (<Observable<number>>this._removeTriggerConditionEvt)
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe((r: [number, FormGroup]) => {
        const vcIdx = r[0];
        const fg = r[1];
        if (fg == null) { return; }
        const ctrl = fg.controls['triggerConditions'];
        let vcs = (ctrl.value || []).slice(0);
        if (vcIdx < 0 || vcIdx >= vcs.length) { return; }
        vcs.splice(vcIdx, 1);
        ctrl.setValue(vcs);
      });
  }

  private _initAddTriggerCondition(): void {
    this._addTriggerConditionSub = (<Observable<void>>this._addTriggerConditionEvt)
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe((r: [void, FormGroup]) => {
        const fg = r[1];
        if (fg == null) { return; }
        const ctrl = fg.controls['triggerConditions'];
        let vcs = (ctrl.value || []).slice(0);
        vcs.push('');
        ctrl.setValue(vcs);
      });
  }

  private _initTriggerConditionEdit(): void {
    this._editTriggerConditionSub = (<Observable<number>>this._editTriggerConditionEvt)
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe((r: [number, FormGroup]) => {
        this._destroyConditionDialog();
        const vcIdx = r[0];
        const fg = r[1];
        if (vcIdx < 0 || vcIdx >= this._triggerConditions.length || fg == null) { return; }
        this._editConditionDialog = this._dialog
          .open(AjfFbConditionEditorDialog);
        const cmp = this._editConditionDialog.componentInstance;
        cmp.condition = this._triggerConditions[vcIdx];
        this._editConditionDialogSub = this._editConditionDialog.afterClosed()
          .subscribe((cond: string) => {
            if (cond !== void 0) {
              this._triggerConditions[vcIdx] = cond;
            }
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
          });
      });
  }

  private _initRemoveWarningCondition(): void {
    this._removeWarningConditionSub = (<Observable<number>>this._removeWarningConditionEvt)
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe((r: [number, FormGroup]) => {
        const vcIdx = r[0];
        const fg = r[1];
        if (fg == null) { return; }
        const ctrl = fg.controls['warningConditions'];
        let vcs = (ctrl.value || []).slice(0);
        if (vcIdx < 0 || vcIdx >= vcs.length) { return; }
        vcs.splice(vcIdx, 1);
        ctrl.setValue(vcs);
      });
  }

  private _initAddWarningCondition(): void {
    this._addWarningConditionSub = (<Observable<void>>this._addWarningConditionEvt)
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe((r: [void, FormGroup]) => {
        const fg = r[1];
        if (fg == null) { return; }
        const ctrl = fg.controls['warningConditions'];
        let vcs = (ctrl.value || []).slice(0);
        vcs.push({condition: '', errorMessage: ''});
        ctrl.setValue(vcs);
      });
  }

  private _initWarningConditionEdit(): void {
    this._editWarningConditionSub = (<Observable<number>>this._editWarningConditionEvt)
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe((r: [number, FormGroup]) => {
        this._destroyWarningConditionDialog();
        const vcIdx = r[0];
        const fg = r[1];
        if (vcIdx < 0 || vcIdx >= this._warningConditions.length || fg == null) { return; }
        this._editWarningConditionDialog = this._dialog
          .open(AjfFbWarningConditionEditorDialog);
        const cmp = this._editWarningConditionDialog.componentInstance;
        const w = this._warningConditions[vcIdx];
        cmp.condition = w.condition;
        cmp.warningMessage = w.warningMessage;
        this._editWarningConditionDialogSub = this._editWarningConditionDialog.afterClosed()
          .subscribe((cond: WarningCondition) => {
            if (cond !== void 0) {
              this._warningConditions[vcIdx] = cond;
            }
            this._editWarningConditionDialogSub.unsubscribe();
            this._editWarningConditionDialogSub = Subscription.EMPTY;
          });
      });
  }

  private _initRemoveValidationCondition(): void {
    this._removeValidationConditionSub = (<Observable<number>>this._removeValidationConditionEvt)
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe((r: [number, FormGroup]) => {
        const vcIdx = r[0];
        const fg = r[1];
        if (fg == null) { return; }
        const ctrl = fg.controls['validationConditions'];
        let vcs = (ctrl.value || []).slice(0);
        if (vcIdx < 0 || vcIdx >= vcs.length) { return; }
        vcs.splice(vcIdx, 1);
        ctrl.setValue(vcs);
      });
  }

  private _initAddValidationCondition(): void {
    this._addValidationConditionSub = (<Observable<void>>this._addValidationConditionEvt)
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe((r: [void, FormGroup]) => {
        const fg = r[1];
        if (fg == null) { return; }
        const ctrl = fg.controls['validationConditions'];
        let vcs = (ctrl.value || []).slice(0);
        vcs.push({condition: '', errorMessage: ''});
        ctrl.setValue(vcs);
      });
  }

  private _initValidationConditionEdit(): void {
    this._editValidationConditionSub = (<Observable<number>>this._editValidationConditionEvt)
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe((r: [number, FormGroup]) => {
        this._destroyValidationConditionDialog();
        const vcIdx = r[0];
        const fg = r[1];
        if (vcIdx < 0 || vcIdx >= this._validationConditions.length || fg == null) { return; }
        this._editValidationConditionDialog = this._dialog
          .open(AjfFbValidationConditionEditorDialog);
        const cmp = this._editValidationConditionDialog.componentInstance;
        const v = this._validationConditions[vcIdx];
        cmp.condition = v.condition;
        cmp.errorMessage = v.errorMessage;
        this._editValidationConditionDialogSub = this._editValidationConditionDialog.afterClosed()
          .subscribe((cond: ValidationCondition) => {
            if (cond !== void 0) {
              this._validationConditions[vcIdx] = cond;
            }
            this._editValidationConditionDialogSub.unsubscribe();
            this._editValidationConditionDialogSub = Subscription.EMPTY;
          });
      });
  }

  private _initForceValueEdit(): void {
    this._editForceValueSub = (<Observable<void>>this._editForceValueEvt)
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe((r: [void, FormGroup]) => {
        this._destroyConditionDialog();
        const fg = r[1];
        if (fg == null) { return; }
        const ctrl = fg.controls['forceValue'];
        this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
        this._editConditionDialog.componentInstance.condition = ctrl.value;
        this._editConditionDialogSub = this._editConditionDialog.afterClosed()
          .subscribe((cond: string) => {
            if (cond !== void 0) {
              ctrl.setValue(cond);
            }
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
          });
      });
  }

  private _initNextSlideConditionEdit(): void {
    this._editNextSlideConditionSub = (<Observable<void>>this._editNextSlideConditionEvt)
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe((r: [void, FormGroup]) => {
        this._destroyConditionDialog();
        const fg = r[1];
        if (fg == null) { return; }
        const ctrl = fg.controls['nextSlideCondition'];
        this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
        this._editConditionDialog.componentInstance.condition = ctrl.value;
        this._editConditionDialogSub = this._editConditionDialog.afterClosed()
          .subscribe((cond: string) => {
            if (cond !== void 0) {
              ctrl.setValue(cond);
            }
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
          });
      });
  }

  private _initFormulaEdit(): void {
    this._editFormulaSub = (<Observable<void>>this._editFormulaEvt)
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe((r: [void, FormGroup]) => {
        this._destroyConditionDialog();
        const fg = r[1];
        if (fg == null) { return; }
        const ctrl = fg.controls['formula'];
        this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
        this._editConditionDialog.componentInstance.condition = ctrl.value;
        this._editConditionDialogSub = this._editConditionDialog.afterClosed()
          .subscribe((cond: string) => {
            if (cond !== void 0) {
              ctrl.setValue(cond);
            }
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
          });
      });
  }

  private _initFormulaRepsEdit(): void {
    this._editFormulaRepsSub = (<Observable<void>>this._editFormulaRepsEvt)
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe((r: [void, FormGroup]) => {
        this._destroyConditionDialog();
        const fg = r[1];
        if (fg == null) { return; }
        const ctrl = fg.controls['formulaReps'];
        this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
        this._editConditionDialog.componentInstance.condition = ctrl.value;
        this._editConditionDialogSub = this._editConditionDialog.afterClosed()
          .subscribe((cond: string) => {
            if (cond !== void 0) {
              ctrl.setValue(cond);
            }
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
          });
      });
  }

  private _initChoicesFilterEdit(): void {
    this._editChoicesFilterSub = (<Observable<void>>this._editChoicesFilterEvt)
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe((r: [void, FormGroup]) => {
        this._destroyConditionDialog();
        const fg = r[1];
        if (fg == null) { return; }
        const ctrl = fg.controls['choicesFilter'];
        this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
        this._editConditionDialog.componentInstance.condition = ctrl.value;
        this._editConditionDialogSub = this._editConditionDialog.afterClosed()
          .subscribe((cond: string) => {
            if (cond !== void 0) {
              ctrl.setValue(cond);
            }
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
          });
      });
  }

  private _initConditionalBranchEdit(): void {
    this._editConditionalBranchSub = (<Observable<number>>this._editConditionalBranchEvt)
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe((r: [number, FormGroup]) => {
        this._destroyConditionDialog();
        const cbIdx = r[0];
        const fg = r[1];
        if (cbIdx < 0 || cbIdx >= this._conditionalBranches.length || fg == null) { return; }
        this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
        this._editConditionDialog.componentInstance.condition = this._conditionalBranches[cbIdx];
        this._editConditionDialogSub = this._editConditionDialog.afterClosed()
          .subscribe((cond: string) => {
            if (cond !== void 0) {
              this._conditionalBranches[cbIdx] = cond;
            }
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
          });
      });
  }

  private _initVisibilityEdit(): void {
    this._editVisibilitySub = (<Observable<void>>this._editVisibilityEvt)
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe((r: [void, FormGroup]) => {
        this._destroyConditionDialog();
        const fg = r[1];
        if (fg == null) { return; }
        const ctrl = fg.controls['visibility'];
        const condition = ctrl.value;
        this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
        this._editConditionDialog.componentInstance.condition = condition;
        this._editConditionDialogSub = this._editConditionDialog.afterClosed()
          .subscribe((cond: string) => {
            if (cond !== void 0) {
              ctrl.setValue(cond);
            }
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
          });
      });
  }

  private _handleTriggerCondtionsChange(fg: FormGroup): void {
    this._triggerConditionsSub = fg.valueChanges
      .pipe(distinctUntilChanged((v1, v2) =>
        JSON.stringify(v1.triggerConditions) === JSON.stringify(v2.triggerConditions)))
      .subscribe((v: any) => {
        this._triggerConditions = v.triggerConditions;
      });
  }

  private _handleWarningCondtionsChange(fg: FormGroup): void {
    this._warningConditionsSub = fg.valueChanges
      .pipe(distinctUntilChanged((v1, v2) =>
        JSON.stringify(v1.warningConditions) === JSON.stringify(v2.warningConditions)))
      .subscribe((v: any) => {
        this._warningConditions = v.warningConditions;
      });
  }

  private _handleValidationCondtionsChange(fg: FormGroup): void {
    this._validationConditionsSub = fg.valueChanges
      .pipe(distinctUntilChanged((v1, v2) =>
        JSON.stringify(v1.validationConditions) === JSON.stringify(v2.validationConditions)))
      .subscribe((v: any) => {
        this._validationConditions = v.validationConditions;
      });
  }

  private _handleForceValueChange(fg: FormGroup): void {
    this._forceValueSub = fg.valueChanges
      .pipe(distinctUntilChanged((v1, v2) => v1.forceValue === v2.forceValue))
      .subscribe((v: any) => {
        this._curForceValue = v.forceValue;
      });
  }

  private _handleNextSlideConditionChange(fg: FormGroup): void {
    this._formulaSub = fg.valueChanges
      .pipe(distinctUntilChanged((v1, v2) => v1.nextSlideCondition === v2.nextSlideCondition))
      .subscribe((v: any) => {
        this._nextSlideCondition = v.nextSlideCondition;
      });
  }

  private _handleFormulaChange(fg: FormGroup): void {
    this._formulaSub = fg.valueChanges
      .pipe(distinctUntilChanged((v1, v2) => v1.formula === v2.formula))
      .subscribe((v: any) => {
        this._curFormula = v.formula;
      });
  }

  private _handleFormulaRepsChange(fg: FormGroup): void {
    this._formulaRepsSub = fg.valueChanges
      .pipe(distinctUntilChanged((v1, v2) => v1.formulaReps === v2.formulaReps))
      .subscribe((v: any) => {
        this._curFormulaReps = v.formulaReps;
      });
  }

  private _handleChoicesFilterChange(fg: FormGroup): void {
    this._choicesFilterSub = fg.valueChanges
      .pipe(distinctUntilChanged((v1, v2) => v1.choicesFilter === v2.choicesFilter))
      .subscribe((v: any) => {
        this._curChoicesFilter = v.choicesFilter;
      });
  }

  private _handleConditionalBranchesChange(fg: FormGroup): void {
    this._conditionalBranchesSub = fg.valueChanges
      .pipe(distinctUntilChanged((v1, v2) =>
          v1.conditionalBranchesNum === v2.conditionalBranchesNum))
      .subscribe((v: any) => {
        const cbNum: number = v.conditionalBranchesNum;
        const curCbNum = this._conditionalBranches.length;
        if (curCbNum < cbNum) {
          let newCbs: string[] = [];
          for (let i = curCbNum ; i < cbNum ; i++) {
            newCbs.push(AjfCondition.alwaysCondition().condition);
          }
          this._conditionalBranches = this._conditionalBranches.concat(newCbs);
        } else if (curCbNum > cbNum) {
          this._conditionalBranches.splice(0, curCbNum - cbNum);
        }
      });
  }

  private _handleVisibilityChange(fg: FormGroup): void {
    this._visibilitySub = fg.valueChanges
      .pipe(distinctUntilChanged((v1, v2) => v1.visibilityOpt === v2.visibilityOpt))
      .subscribe((v) => {
        const visibilityOpt = v.visibilityOpt;
        let newCondition: string | null;
        switch (visibilityOpt) {
          case 'always':
          newCondition = AjfCondition.alwaysCondition().condition;
          break;
          case 'never':
          newCondition = AjfCondition.neverCondition().condition;
          break;
          default:
          newCondition = null;
        }
        this._curVisibility = newCondition;
        fg.controls['visibility'].setValue(newCondition);
      });
  }

  private _guessVisibilityOpt(condition: AjfCondition): string {
    if (condition.condition.localeCompare(AjfCondition.alwaysCondition().condition) === 0) {
      return 'always';
    }
    if (condition.condition.localeCompare(AjfCondition.neverCondition().condition) === 0) {
      return 'never';
    }
    return 'condition';
  }
}
