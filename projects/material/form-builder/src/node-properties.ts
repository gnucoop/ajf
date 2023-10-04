/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
  AjfChoicesOrigin,
  AjfFieldWithChoices,
  AjfNode,
  AjfNumberField,
  AjfRangeField,
  AjfRepeatingContainerNode,
  AjfTableField,
  isField,
  isFieldWithChoices,
  isNumberField,
  isRangeField,
  isRepeatingContainerNode,
  isTableField,
} from '@ajf/core/forms';
import {AjfCondition, alwaysCondition, neverCondition} from '@ajf/core/models';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, map, shareReplay, take, withLatestFrom} from 'rxjs/operators';

import {AjfFbConditionEditorDialog} from './condition-editor-dialog';
import {AjfFormBuilderNodeEntry, AjfFormBuilderService} from './form-builder-service';
import {AjfFbValidationConditionEditorDialog} from './validation-condition-editor-dialog';
import {AjfFbWarningConditionEditorDialog} from './warning-condition-editor-dialog';

function checkRepsValidity(c: AbstractControl): {[key: string]: any} | null {
  const minReps = c.value.minReps;
  const maxReps = c.value.maxReps;
  if (minReps != null && maxReps != null && minReps > maxReps) {
    return {reps: 'Min repetions cannot be greater than max repetitions'};
  }
  return null;
}

function checkValueLimitsValidity(c: AbstractControl): {[key: string]: any} | null {
  const minValue = c.value.minValue;
  const maxValue = c.value.maxValue;
  if (minValue != null && maxValue != null && minValue > maxValue) {
    return {valueLimit: 'Min value cannot be greater than max value'};
  }
  return null;
}

function checkDigitsValidity(c: AbstractControl): {[key: string]: any} | null {
  const minDigits = c.value.minDigits;
  const maxDigits = c.value.maxDigits;
  if (minDigits != null && maxDigits != null && minDigits > maxDigits) {
    return {digits: 'Min digits cannot be greater than max digits'};
  }
  return null;
}

function checkRangeValidity(c: AbstractControl): {[key: string]: any} | null {
  const {start, end} = c.value;
  if (start != null && end != null && start > end) {
    return {range: 'End must be greater than start'};
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
  selector: 'ajf-fb-node-properties',
  templateUrl: 'node-properties.html',
  styleUrls: ['node-properties.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AjfFbNodeProperties implements OnDestroy {
  private _fieldSizes: {label: string; value: string}[] = [
    {label: 'Normal', value: 'normal'},
    {label: 'Small', value: 'small'},
    {label: 'Smaller', value: 'smaller'},
    {label: 'Tiny', value: 'tiny'},
    {label: 'Mini', value: 'mini'},
  ];
  get fieldSizes(): {label: string; value: string}[] {
    return this._fieldSizes;
  }

  private _nodeEntry: Observable<AjfFormBuilderNodeEntry | null>;
  get nodeEntry(): Observable<AjfFormBuilderNodeEntry | null> {
    return this._nodeEntry;
  }

  private _choicesOrigins: AjfChoicesOrigin<any>[] = [];
  get choicesOrigins(): AjfChoicesOrigin<any>[] {
    return this._choicesOrigins;
  }

  private _enabled: Observable<boolean>;
  get enabled(): Observable<boolean> {
    return this._enabled;
  }

  private _propertiesForm!: Observable<UntypedFormGroup>;
  get propertiesForm(): Observable<UntypedFormGroup> {
    return this._propertiesForm;
  }

  private _hasChoices: Observable<boolean> | undefined;
  get hasChoices(): Observable<boolean> | undefined {
    return this._hasChoices;
  }

  private _curVisibility: string | null = null;
  get curVisibility(): string | null {
    return this._curVisibility;
  }

  private _curFormulaReps: string | null = null;
  get curFormulaReps(): string | null {
    return this._curFormulaReps;
  }

  private _curChoicesFilter: string | null = null;
  get curChoicesFilter(): string | null {
    return this._curChoicesFilter;
  }

  private _curForceValue: string | null = null;
  get curForceValue(): string | null {
    return this._curForceValue;
  }

  private _curFormula: string | null = null;
  get curFormula(): string | null {
    return this._curFormula;
  }

  private _conditionalBranches: string[] = [];
  get conditionalBranches(): string[] {
    return this._conditionalBranches;
  }

  private _validationConditions: ValidationCondition[] = [];
  get validationConditions(): ValidationCondition[] {
    return this._validationConditions;
  }

  private _warningConditions: WarningCondition[] = [];
  get warningConditions(): WarningCondition[] {
    return this._warningConditions;
  }

  private _nextSlideCondition: string | undefined;
  get nextSlideCondition(): string | undefined {
    return this._nextSlideCondition;
  }

  private _triggerConditions: string[] = [];
  get triggerConditions(): string[] {
    return this._triggerConditions;
  }

  isRepeatingContainerNode: (nodeEntry: AjfFormBuilderNodeEntry | null) => boolean = nodeEntry => {
    return nodeEntry != null && isRepeatingContainerNode(nodeEntry.node);
  };

  private _visibilityOptSub: Subscription = Subscription.EMPTY;
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

  private _editConditionDialog: MatDialogRef<AjfFbConditionEditorDialog> | null = null;
  private _editConditionDialogSub: Subscription = Subscription.EMPTY;
  private _editValidationConditionDialog: MatDialogRef<AjfFbValidationConditionEditorDialog> | null =
    null;
  private _editValidationConditionDialogSub: Subscription = Subscription.EMPTY;
  private _editWarningConditionDialog: MatDialogRef<AjfFbWarningConditionEditorDialog> | null =
    null;
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
    private _cdr: ChangeDetectorRef,
    private _service: AjfFormBuilderService,
    private _dialog: MatDialog,
    private _fb: UntypedFormBuilder,
  ) {
    this._nodeEntry = _service.editedNodeEntry;
    this._choicesOriginsSub = _service.choicesOrigins.subscribe(
      c => (this._choicesOrigins = c || []),
    );

    this._enabled = this._nodeEntry.pipe(map(n => n != null));

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
    if (idx < 0 || idx >= this._conditionalBranches.length) {
      return;
    }
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
    if (idx < 0 || idx >= this._validationConditions.length) {
      return;
    }
    this._editValidationConditionEvt.emit(idx);
  }

  addValidationCondition(): void {
    this._addValidationConditionEvt.emit();
  }

  removeValidationCondition(idx: number): void {
    if (idx < 0 || idx >= this._validationConditions.length) {
      return;
    }
    this._removeValidationConditionEvt.emit(idx);
  }

  editWarningCondition(idx: number): void {
    if (idx < 0 || idx >= this._warningConditions.length) {
      return;
    }
    this._editWarningConditionEvt.emit(idx);
  }

  addWarningCondition(): void {
    this._addWarningConditionEvt.emit();
  }

  removeWarningCondition(idx: number): void {
    if (idx < 0 || idx >= this._warningConditions.length) {
      return;
    }
    this._removeWarningConditionEvt.emit(idx);
  }

  editNextSlideCondition(): void {
    this._editNextSlideConditionEvt.emit();
  }

  editTriggerCondition(idx: number): void {
    if (idx < 0 || idx >= this._triggerConditions.length) {
      return;
    }
    this._editTriggerConditionEvt.emit(idx);
  }

  addTriggerCondition(): void {
    this._addTriggerConditionEvt.emit();
  }

  removeTriggerCondition(idx: number): void {
    if (idx < 0 || idx >= this._triggerConditions.length) {
      return;
    }
    this._removeTriggerConditionEvt.emit(idx);
  }

  isField(nodeEntry: AjfFormBuilderNodeEntry | null): boolean {
    return nodeEntry != null && isField(nodeEntry.node);
  }

  isNumericField(node: AjfNode): node is AjfNumberField {
    return isField(node) && isNumberField(node);
  }

  isFieldWithChoices(node: AjfNode): node is AjfFieldWithChoices<any> {
    return isField(node) && isFieldWithChoices(node);
  }

  hasChoicesOriginRef(): Observable<boolean> {
    return this._propertiesForm.pipe(
      map(fg => {
        const value = fg.get('choicesOriginRef')?.value != null;
        return value;
      }),
      take(1),
    );
  }

  isRangeField(node: AjfNode): node is AjfRangeField {
    return isField(node) && isRangeField(node);
  }

  isTableField(node: AjfNode): node is AjfTableField {
    return isField(node) && isTableField(node);
  }

  save(): void {
    this._saveEvt.emit();
  }

  cancel(): void {
    this._service.cancelNodeEntryEdit();
  }

  ngOnDestroy(): void {
    this._choicesOriginsSub.unsubscribe();

    this._visibilityOptSub.unsubscribe();
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
    this._saveSub = this._saveEvt
      .pipe(withLatestFrom(this.propertiesForm))
      .subscribe(([_, formGroup]) => {
        const fg = formGroup as UntypedFormGroup;
        const val = {...fg.value, conditionalBranches: this._conditionalBranches};
        this._service.saveNodeEntry(val);
      });
  }

  private _initForm(): void {
    this._propertiesForm = this._nodeEntry.pipe(
      filter(n => n != null),
      map(n => {
        if (this._visibilityOptSub != null) {
          this._visibilityOptSub.unsubscribe();
        }
        if (this._visibilitySub != null) {
          this._visibilitySub.unsubscribe();
        }
        if (this._conditionalBranchesSub != null) {
          this._conditionalBranchesSub.unsubscribe();
        }
        if (n == null) {
          return this._fb.group({});
        }

        const visibility = n.node.visibility != null ? n.node.visibility.condition : null;
        const visibilityOpt =
          n.node.visibility != null ? this._guessVisibilityOpt(n.node.visibility) : null;
        let controls: any = {
          name: [n.node.name, Validators.required],
          label: n.node.label,
          visibilityOpt: [visibilityOpt, Validators.required],
          visibility: [visibility, Validators.required],
          conditionalBranchesNum: n.node.conditionalBranches.length,
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

        const {node} = n;

        if (isField(node)) {
          let forceValue: string | null = null;
          let notEmpty: boolean = false;
          let validationConditions: ValidationCondition[] = [];
          if (node.validation != null) {
            if (node.validation.forceValue != null) {
              forceValue = node.validation.forceValue.condition;
            }
            notEmpty = node.validation.notEmpty != null;
            validationConditions = (node.validation.conditions || []).map(c => {
              return {condition: c.condition, errorMessage: c.errorMessage};
            });
          }

          let notEmptyW: boolean = false;
          let warningConditions: WarningCondition[] = [];
          if (node.warning != null) {
            notEmptyW = node.warning.notEmpty != null;
            warningConditions = (node.warning.conditions || []).map(w => {
              return {condition: w.condition, warningMessage: w.warningMessage};
            });
          }
          const formula = node.formula != null ? node.formula.formula : null;

          controls.description = node.description;
          controls.defaultValue = node.defaultValue;
          controls.hint = node.hint;
          controls.size = node.size;
          controls.formula = formula;
          controls.forceValue = forceValue;
          controls.notEmpty = notEmpty;
          controls.validationConditions = [validationConditions, []];
          controls.notEmptyWarning = notEmptyW;
          controls.warningConditions = [warningConditions, []];
          controls.nextSlideCondition = [node.nextSlideCondition];

          this._curForceValue = forceValue;
          this._curFormula = formula;
          this._validationConditions = validationConditions;
          this._warningConditions = warningConditions;
        }

        if (this.isNumericField(node)) {
          let minValue: any;
          let maxValue: any;
          let minDigits: any;
          let maxDigits: any;
          if (node.validation != null) {
            if (node.validation.minValue != null) {
              minValue = (node.validation.minValue.condition || '').replace('$value >= ', '');
            }
            if (node.validation.maxValue != null) {
              maxValue = (node.validation.maxValue.condition || '').replace('$value <= ', '');
            }
            if (node.validation.minDigits != null) {
              minDigits = (node.validation.minDigits.condition || '').replace(
                '$value.toString().length >= ',
                '',
              );
            }
            if (node.validation.maxDigits != null) {
              maxDigits = (node.validation.maxDigits.condition || '').replace(
                '$value.toString().length <= ',
                '',
              );
            }
          }

          controls.minValue = minValue;
          controls.maxValue = maxValue;
          controls.minDigits = minDigits;
          controls.maxDigits = maxDigits;

          validators.push(checkValueLimitsValidity);
          validators.push(checkDigitsValidity);
        }

        if (this.isRangeField(node)) {
          const {start, end, step} = node;

          controls.start = start;
          controls.end = end;
          controls.step = step;

          validators.push(checkRangeValidity);
        }

        if (this.isFieldWithChoices(node)) {
          let triggerConditions: string[] = (node.triggerConditions || []).map(c => c.condition);

          controls.choicesOriginRef = (node as any).choicesOriginRef;
          controls.choicesFilter = node.choicesFilter != null ? node.choicesFilter.formula : null;
          controls.forceExpanded = node.forceExpanded;
          controls.forceNarrow = node.forceNarrow;
          controls.triggerConditions = triggerConditions;

          this._triggerConditions = triggerConditions;
        }

        if (this.isTableField(node)) {
          const {columnTypes, rows, columnLabels, rowLabels} = node;
          const tableDef = {columnTypes, rows, columnLabels, rowLabels};
          controls.tableDef = JSON.stringify(tableDef, undefined, 2);
          controls.hideEmptyRows = node.hideEmptyRows;
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
      shareReplay(1),
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
    this._removeTriggerConditionSub = this._removeTriggerConditionEvt
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe(([vcIdx, formGroup]) => {
        if (formGroup == null) {
          return;
        }
        const fg = formGroup as UntypedFormGroup;
        const ctrl = fg.controls['triggerConditions'];
        let vcs = (ctrl.value || []).slice(0);
        if (vcIdx < 0 || vcIdx >= vcs.length) {
          return;
        }
        vcs.splice(vcIdx, 1);
        ctrl.setValue(vcs);
      });
  }

  private _initAddTriggerCondition(): void {
    this._addTriggerConditionSub = this._addTriggerConditionEvt
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe(([_, formGroup]) => {
        if (formGroup == null) {
          return;
        }
        const fg = formGroup as UntypedFormGroup;
        const ctrl = fg.controls['triggerConditions'];
        let vcs = (ctrl.value || []).slice(0);
        vcs.push('');
        ctrl.setValue(vcs);
      });
  }

  private _initTriggerConditionEdit(): void {
    this._editConditionDialogSub = Subscription.EMPTY;
    this._cdr.markForCheck();
    this._editTriggerConditionSub = this._editTriggerConditionEvt
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe(([vcIdx, fg]) => {
        this._destroyConditionDialog();
        if (vcIdx < 0 || vcIdx >= this._triggerConditions.length || fg == null) {
          return;
        }
        this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
        const cmp = this._editConditionDialog.componentInstance;
        cmp.condition = this._triggerConditions[vcIdx];
        this._editConditionDialogSub = this._editConditionDialog
          .afterClosed()
          .subscribe((cond: string) => {
            if (cond !== void 0) {
              this._triggerConditions[vcIdx] = cond;
            }
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
            this._cdr.markForCheck();
          });
      });
  }

  private _initRemoveWarningCondition(): void {
    this._removeWarningConditionSub = this._removeWarningConditionEvt
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe(([vcIdx, formGroup]) => {
        if (formGroup == null) {
          return;
        }
        const fg = formGroup as UntypedFormGroup;
        const ctrl = fg.controls['warningConditions'];
        let vcs = (ctrl.value || []).slice(0);
        if (vcIdx < 0 || vcIdx >= vcs.length) {
          return;
        }
        vcs.splice(vcIdx, 1);
        ctrl.setValue(vcs);
      });
  }

  private _initAddWarningCondition(): void {
    this._addWarningConditionSub = this._addWarningConditionEvt
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe(([_, formGroup]) => {
        if (formGroup == null) {
          return;
        }
        const fg = formGroup as UntypedFormGroup;
        const ctrl = fg.controls['warningConditions'];
        let vcs = (ctrl.value || []).slice(0);
        vcs.push({condition: '', errorMessage: ''});
        ctrl.setValue(vcs);
      });
  }

  private _initWarningConditionEdit(): void {
    this._editWarningConditionSub = this._editWarningConditionEvt
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe(([vcIdx, fg]) => {
        this._destroyWarningConditionDialog();
        if (vcIdx < 0 || vcIdx >= this._warningConditions.length || fg == null) {
          return;
        }
        this._editWarningConditionDialog = this._dialog.open(AjfFbWarningConditionEditorDialog);
        const cmp = this._editWarningConditionDialog.componentInstance;
        const w = this._warningConditions[vcIdx];
        cmp.condition = w.condition;
        cmp.warningMessage = w.warningMessage;
        this._editWarningConditionDialogSub = this._editWarningConditionDialog
          .afterClosed()
          .subscribe((cond: WarningCondition) => {
            if (cond !== void 0) {
              this._warningConditions[vcIdx] = cond;
            }
            this._editWarningConditionDialogSub.unsubscribe();
            this._editWarningConditionDialogSub = Subscription.EMPTY;
            this._cdr.markForCheck();
          });
      });
  }

  private _initRemoveValidationCondition(): void {
    this._removeValidationConditionSub = this._removeValidationConditionEvt
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe(([vcIdx, formGroup]) => {
        if (formGroup == null) {
          return;
        }
        const fg = formGroup as UntypedFormGroup;
        const ctrl = fg.controls['validationConditions'];
        let vcs = (ctrl.value || []).slice(0);
        if (vcIdx < 0 || vcIdx >= vcs.length) {
          return;
        }
        vcs.splice(vcIdx, 1);
        ctrl.setValue(vcs);
      });
  }

  private _initAddValidationCondition(): void {
    this._addValidationConditionSub = this._addValidationConditionEvt
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe(([_, formGroup]) => {
        if (formGroup == null) {
          return;
        }
        const fg = formGroup as UntypedFormGroup;
        const ctrl = fg.controls['validationConditions'];
        let vcs = (ctrl.value || []).slice(0);
        vcs.push({condition: '', errorMessage: ''});
        ctrl.setValue(vcs);
      });
  }

  private _initValidationConditionEdit(): void {
    this._editValidationConditionSub = this._editValidationConditionEvt
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe(([vcIdx, fg]) => {
        this._destroyValidationConditionDialog();
        if (vcIdx < 0 || vcIdx >= this._validationConditions.length || fg == null) {
          return;
        }
        this._editValidationConditionDialog = this._dialog.open(
          AjfFbValidationConditionEditorDialog,
        );
        const cmp = this._editValidationConditionDialog.componentInstance;
        const v = this._validationConditions[vcIdx];
        cmp.condition = v.condition;
        cmp.errorMessage = v.errorMessage;
        this._editValidationConditionDialogSub = this._editValidationConditionDialog
          .afterClosed()
          .subscribe((cond: ValidationCondition) => {
            if (cond !== void 0) {
              this._validationConditions[vcIdx] = cond;
            }
            this._editValidationConditionDialogSub.unsubscribe();
            this._editValidationConditionDialogSub = Subscription.EMPTY;
            this._cdr.markForCheck();
          });
      });
  }

  private _initForceValueEdit(): void {
    this._editForceValueSub = this._editForceValueEvt
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe(([_, formGroup]) => {
        this._destroyConditionDialog();
        if (formGroup == null) {
          return;
        }
        const fg = formGroup as UntypedFormGroup;
        const ctrl = fg.controls['forceValue'];
        this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
        this._editConditionDialog.componentInstance.condition = ctrl.value;
        this._editConditionDialogSub = this._editConditionDialog
          .afterClosed()
          .subscribe((cond: string) => {
            if (cond !== void 0) {
              ctrl.setValue(cond);
            }
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
            this._cdr.markForCheck();
          });
      });
  }

  private _initNextSlideConditionEdit(): void {
    this._editNextSlideConditionSub = this._editNextSlideConditionEvt
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe(([_, formGroup]) => {
        this._destroyConditionDialog();
        if (formGroup == null) {
          return;
        }
        const fg = formGroup as UntypedFormGroup;
        const ctrl = fg.controls['nextSlideCondition'];
        this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
        this._editConditionDialog.componentInstance.condition = ctrl.value;
        this._editConditionDialogSub = this._editConditionDialog
          .afterClosed()
          .subscribe((cond: string) => {
            if (cond !== void 0) {
              ctrl.setValue(cond);
            }
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
            this._cdr.markForCheck();
          });
      });
  }

  private _initFormulaEdit(): void {
    this._editConditionDialogSub = Subscription.EMPTY;
    this._cdr.markForCheck();
    this._editFormulaSub = this._editFormulaEvt
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe(([_, formGroup]) => {
        this._destroyConditionDialog();
        if (formGroup == null) {
          return;
        }
        const fg = formGroup as UntypedFormGroup;
        const ctrl = fg.controls['formula'];
        this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
        this._editConditionDialog.componentInstance.condition = ctrl.value;
        this._editConditionDialogSub = this._editConditionDialog
          .afterClosed()
          .subscribe((cond: string) => {
            if (cond !== void 0) {
              ctrl.setValue(cond);
            }
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
            this._cdr.markForCheck();
          });
      });
  }

  private _initFormulaRepsEdit(): void {
    this._editFormulaRepsSub = this._editFormulaRepsEvt
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe(([_, formGroup]) => {
        this._destroyConditionDialog();
        if (formGroup == null) {
          return;
        }
        const fg = formGroup as UntypedFormGroup;
        const ctrl = fg.controls['formulaReps'];
        this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
        this._editConditionDialog.componentInstance.condition = ctrl.value;
        this._editConditionDialogSub = this._editConditionDialog
          .afterClosed()
          .subscribe((cond: string) => {
            if (cond !== void 0) {
              ctrl.setValue(cond);
            }
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
            this._cdr.markForCheck();
          });
      });
  }

  private _initChoicesFilterEdit(): void {
    this._editChoicesFilterSub = this._editChoicesFilterEvt
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe(([_, formGroup]) => {
        this._destroyConditionDialog();
        if (formGroup == null) {
          return;
        }
        const fg = formGroup as UntypedFormGroup;
        const ctrl = fg.controls['choicesFilter'];
        this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
        this._editConditionDialog.componentInstance.condition = ctrl.value;
        this._editConditionDialogSub = this._editConditionDialog
          .afterClosed()
          .subscribe((cond: string) => {
            if (cond !== void 0) {
              ctrl.setValue(cond);
            }
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
            this._cdr.markForCheck();
          });
      });
  }

  private _initConditionalBranchEdit(): void {
    this._editConditionalBranchSub = this._editConditionalBranchEvt
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe(([cbIdx, fg]) => {
        this._destroyConditionDialog();
        if (cbIdx < 0 || cbIdx >= this._conditionalBranches.length || fg == null) {
          return;
        }
        this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
        this._editConditionDialog.componentInstance.condition = this._conditionalBranches[cbIdx];
        this._editConditionDialogSub = this._editConditionDialog
          .afterClosed()
          .subscribe((cond: string) => {
            if (cond !== void 0) {
              this._conditionalBranches[cbIdx] = cond;
            }
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
            this._cdr.markForCheck();
          });
      });
  }

  private _initVisibilityEdit(): void {
    this._editVisibilitySub = this._editVisibilityEvt
      .pipe(withLatestFrom(this._propertiesForm))
      .subscribe(([_, formGroup]) => {
        this._destroyConditionDialog();
        if (formGroup == null) {
          return;
        }
        const fg = formGroup as UntypedFormGroup;
        const ctrl = fg.controls['visibility'];
        const condition = ctrl.value;
        this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
        this._editConditionDialog.componentInstance.condition = condition;
        this._editConditionDialogSub = this._editConditionDialog
          .afterClosed()
          .subscribe((cond: string) => {
            if (cond !== void 0) {
              ctrl.setValue(cond);
            }
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
            this._cdr.markForCheck();
          });
      });
  }

  private _handleTriggerCondtionsChange(fg: UntypedFormGroup): void {
    this._triggerConditionsSub = fg.valueChanges
      .pipe(
        distinctUntilChanged(
          (v1, v2) => JSON.stringify(v1.triggerConditions) === JSON.stringify(v2.triggerConditions),
        ),
      )
      .subscribe((v: any) => {
        this._triggerConditions = v.triggerConditions;
        this._cdr.markForCheck();
      });
  }

  private _handleWarningCondtionsChange(fg: UntypedFormGroup): void {
    this._warningConditionsSub = fg.valueChanges
      .pipe(
        distinctUntilChanged(
          (v1, v2) => JSON.stringify(v1.warningConditions) === JSON.stringify(v2.warningConditions),
        ),
      )
      .subscribe((v: any) => {
        this._warningConditions = v.warningConditions;
        this._cdr.markForCheck();
      });
  }

  private _handleValidationCondtionsChange(fg: UntypedFormGroup): void {
    this._validationConditionsSub = fg.valueChanges
      .pipe(
        distinctUntilChanged(
          (v1, v2) =>
            JSON.stringify(v1.validationConditions) === JSON.stringify(v2.validationConditions),
        ),
      )
      .subscribe((v: any) => {
        this._validationConditions = v.validationConditions;
        this._cdr.markForCheck();
      });
  }

  private _handleForceValueChange(fg: UntypedFormGroup): void {
    this._forceValueSub = fg.valueChanges
      .pipe(distinctUntilChanged((v1, v2) => v1.forceValue === v2.forceValue))
      .subscribe((v: any) => {
        this._curForceValue = v.forceValue;
        this._cdr.markForCheck();
      });
  }

  private _handleNextSlideConditionChange(fg: UntypedFormGroup): void {
    this._formulaSub = fg.valueChanges
      .pipe(distinctUntilChanged((v1, v2) => v1.nextSlideCondition === v2.nextSlideCondition))
      .subscribe((v: any) => {
        this._nextSlideCondition = v.nextSlideCondition;
        this._cdr.markForCheck();
      });
    this._formulaSub = fg.valueChanges
      .pipe(distinctUntilChanged((v1, v2) => v1.nextSlideCondition === v2.nextSlideCondition))
      .subscribe((v: any) => {
        this._nextSlideCondition = v.nextSlideCondition;
        this._cdr.markForCheck();
      });
  }

  private _handleFormulaChange(fg: UntypedFormGroup): void {
    this._formulaSub = fg.valueChanges
      .pipe(distinctUntilChanged((v1, v2) => v1.formula === v2.formula))
      .subscribe((v: any) => {
        this._curFormula = v.formula;
        this._cdr.markForCheck();
      });
  }

  private _handleFormulaRepsChange(fg: UntypedFormGroup): void {
    this._formulaRepsSub = fg.valueChanges
      .pipe(distinctUntilChanged((v1, v2) => v1.formulaReps === v2.formulaReps))
      .subscribe((v: any) => {
        this._curFormulaReps = v.formulaReps;
        this._cdr.markForCheck();
      });
  }

  private _handleChoicesFilterChange(fg: UntypedFormGroup): void {
    this._choicesFilterSub = fg.valueChanges
      .pipe(distinctUntilChanged((v1, v2) => v1.choicesFilter === v2.choicesFilter))
      .subscribe((v: any) => {
        this._curChoicesFilter = v.choicesFilter;
        this._cdr.markForCheck();
      });
  }

  private _handleConditionalBranchesChange(fg: UntypedFormGroup): void {
    this._conditionalBranchesSub = fg.valueChanges
      .pipe(
        distinctUntilChanged((v1, v2) => v1.conditionalBranchesNum === v2.conditionalBranchesNum),
      )
      .subscribe((v: any) => {
        const cbNum: number = v.conditionalBranchesNum;
        const curCbNum = this._conditionalBranches.length;
        if (curCbNum < cbNum) {
          let newCbs: string[] = [];
          for (let i = curCbNum; i < cbNum; i++) {
            newCbs.push(alwaysCondition().condition);
          }
          this._conditionalBranches = this._conditionalBranches.concat(newCbs);
        } else if (curCbNum > cbNum) {
          this._conditionalBranches.splice(0, curCbNum - cbNum);
        }
        this._cdr.markForCheck();
      });
  }

  private _handleVisibilityChange(fg: UntypedFormGroup): void {
    this._visibilitySub = fg.valueChanges
      .pipe(distinctUntilChanged((v1, v2) => v1.visibilityOpt === v2.visibilityOpt))
      .subscribe(v => {
        const visibilityOpt = v.visibilityOpt;
        const visibility: string = v.visibility;
        let newCondition: string | null;
        switch (visibilityOpt) {
          case 'always':
            newCondition = alwaysCondition().condition;
            break;
          case 'never':
            newCondition = neverCondition().condition;
            break;
          case 'condition':
            newCondition = visibility && visibility.length ? visibility : null;
            break;
          default:
            newCondition = null;
        }
        this._curVisibility = newCondition;
        fg.controls['visibility'].setValue(newCondition);
        this._cdr.markForCheck();
      });
    this._visibilitySub = fg.valueChanges
      .pipe(
        filter(v => v.visibilityOpt === 'condition'),
        distinctUntilChanged((v1, v2) => v1.visibility === v2.visibility),
      )
      .subscribe(v => {
        this._curVisibility = v.visibility;
        this._cdr.markForCheck();
      });
  }

  private _guessVisibilityOpt(condition: AjfCondition): string {
    if (condition.condition.localeCompare(alwaysCondition().condition) === 0) {
      return 'always';
    }
    if (condition.condition.localeCompare(neverCondition().condition) === 0) {
      return 'never';
    }
    return 'condition';
  }
}
