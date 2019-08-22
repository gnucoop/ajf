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

import {AjfFieldType, AjfValidationService} from '@ajf/core/forms';
import {AjfImageType} from '@ajf/core/image';
import {AjfExpressionUtils, createFormula, validateExpression} from '@ajf/core/models';
import {
  AjfAggregationType, AjfDataset, AjfDataWidget, AjfImageWidget, AjfWidget
} from '@ajf/core/reports';
import {sizedEnumToStringArray} from '@ajf/core/utils';
import {AjfMonacoEditor} from '@ajf/material/monaco-editor';
import {
  AfterViewChecked, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

import {AjfFormVariables} from './models';
import {AjfReportBuilderService} from './report-builder-service';

export enum AjfDataType {
  MainData,
  Dataset,
  RelatedData,
  LENGTH
}
declare var monaco: any;

@Component({
  moduleId: module.id,
  selector: 'forms-analyzer-dialog',
  templateUrl: 'forms-analyzer-dialog.html',
  styleUrls: ['forms-analyzer-dialog.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfReportBuilderFormsAnalyzerDialog implements OnInit, AfterViewChecked, OnDestroy {

  aggregationTypes: string[] = sizedEnumToStringArray(AjfAggregationType);

  //  operators is an array of any type that contains all allow operators
  operators: string[] = [
    'true', 'false', '( )', '\' \'',
    '<', '<=', '>=', '>', '!=', '!',
    '&&', '||',
    '+', '-', '*', '/', '%', '=='
  ];

  formulaText: string = '';
  formulaDate: string = '';
  safeFormulaText: string = '';
  label: string = '';
  condition: string = '';
  aggregationType: AjfAggregationType = AjfAggregationType.Sum;
  dataset: AjfDataset;
  currentId: number = 0;
  currentIndex: number = 0;
  labels: string[] = [];
  currentWidget: AjfWidget|null = null;
  formsVariables: AjfFormVariables[];
  formsVariablesName: string[] = [];
  formsVariablesType: string[] = [];
  isValid: boolean;

  @Input()
  formula: string;

  @Input()
  isFormula: boolean;

  @Input()
  labelText: string;

  @Input()
  aggregation: number;

  @Input()
  init: boolean;

  @Input()
  level: number;

  @Input()
  index: number;

  @Input()
  mainIndex: number;

  @Input()
  reference: any;

  @ViewChild('formulaTextArea', {static: true}) formulaTextArea: any;
  @ViewChild('errorMessage', {static: true}) errorMessage: any;
  @ViewChild(AjfMonacoEditor, {static: false}) monacoEditor: AjfMonacoEditor;

  private _formAnalyzerSub: Subscription = Subscription.EMPTY;
  private _currentWidgetSub: Subscription = Subscription.EMPTY;
  private _first: boolean = true;

  constructor(
    private _service: AjfReportBuilderService,
    private _dialogRef: MatDialogRef<AjfReportBuilderFormsAnalyzerDialog>,
    _: AjfValidationService
  ) {
    if (this.init == false) {
      this.formulaText = '';
      this.aggregationType = AjfAggregationType.Sum;
    }
    this._currentWidgetSub = this._service.currentWidget
      .subscribe(x => {
        if (x != null) {
          this.currentWidget = <AjfDataWidget>x;

          if (this.currentWidget.widgetType == 2) {
            let myObj: AjfImageWidget = <AjfImageWidget>this.currentWidget;
            if (myObj.imageType == AjfImageType.Flag) {
              this.formula = (myObj.flag) ? myObj.flag.formula : '';
            } else {
              this.formula = (myObj.icon) ? myObj.icon.formula : '';
            }
          }

        }
      });

    this._formAnalyzerSub = this._service.formsVariables
      .subscribe((x) => {
        if (x != null) {
          this.formsVariables = x;
        }
      });
  }

  onEditorInit(): void {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false
    });

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2015,
      allowNonTsExtensions: true,
      allowJs: true,
      module: monaco.languages.typescript.ModuleKind.None
    });

    try {
      monaco.languages.typescript.javascriptDefaults.addExtraLib(
        '', 'condition-editor-variables.d.ts'
      );
    } catch (e) {
      monaco.languages.typescript.javascriptDefaults
        ._extraLibs['condition-editor-variables.d.ts'] = '';
    }
    try {
      monaco.languages.typescript.javascriptDefaults.addExtraLib(
        '', 'condition-editor-functions.d.ts'
      );
    } catch (e) {
      monaco.languages.typescript.javascriptDefaults
        ._extraLibs['condition-editor-functions.d.ts'] = '';
    }

    this._initFormsVariablesNames();
    this._updateVariables();
    this._updateFunctions();
  }


  private _initFormsVariablesNames(): void {
    this.formsVariables.forEach((formVar) => {
      formVar.names.forEach((name) => {
        this.formsVariablesName.push(name);
      });
      formVar.types.forEach((type) => {
        this.formsVariablesType.push(this._fieldVarType(type) || '');
      });
    });
  }


  private _updateVariables(): void {
    if (this.formsVariables == null) { return; }
    try {
      let value: string = '';

      for (let i = 0; i < this.formsVariablesName.length; i++) {
        value += `declare const ${this.formsVariablesName[i]}: ${this.formsVariablesType[i]};`;
      }

      value += `\n`;
      monaco.languages.typescript.javascriptDefaults
        ._extraLibs['condition-editor-variables.d.ts'] = value;
    } catch (e) { }
  }

  private _updateFunctions(): void {
    try {
      monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-functions.d.ts'] =
          AjfExpressionUtils.UTIL_FUNCTIONS;
    } catch (e) { }
  }

  private _fieldVarType(fieldType: AjfFieldType): string | null {
    switch (fieldType) {
      case AjfFieldType.Boolean:
        return 'boolean';
      case AjfFieldType.Date:
      case AjfFieldType.DateInput:
      case AjfFieldType.Time:
        return 'Date';
      case AjfFieldType.Empty:
        return 'void';
      case AjfFieldType.Formula:
        return 'number';
      case AjfFieldType.MultipleChoice:
      case AjfFieldType.SingleChoice:
        return 'any';
      case AjfFieldType.Number:
        return 'number';
      case AjfFieldType.Table:
        return 'Array';
      case AjfFieldType.String:
      case AjfFieldType.Text:
        return 'string';
    }
    return null;
  }

  setCurrent(id: number, label: string, index: number) {
    if (!this.init) {
      this.label = label;
      this.init = true;
    }
    this.insertVariable(this.formsVariables[id].names[index] || '');
  }

  setCurrentId(id: number) {
    this.currentId = id;
    this.labels = this.formsVariables[id].labels;
    this._updateVariables();
  }

  setAggregationType(type: AjfAggregationType) {
    this.aggregationType = type;
  }

  checkValidation() {
    if (this.validateFormula()) {
      this.safeFormulaText = this.formulaText;
      this.isValid = true;
    } else {
      this.isValid = false;
    }
    if (this.formulaText == '') {
      this.isValid = false;
    }
  }

  validateFormula(): boolean {
    if (this.formulaText == '') {
      this.init = false;
    }
    if (this.formsVariables == null) {
      return false;
    } else {
      return validateExpression(this.formulaText, this.formsVariablesName);
    }
  }

  saveDataset() {
    if (this.currentWidget != null) {
      switch (this.currentWidget.widgetType) {
        case 2:
          this.saveImageFormula();
          break;
        case 3:
          this.saveFormulaHtml();
          break;
        case 4:
          this.saveChartFormula();
          break;
        case 5:
          this.saveTableFormula();
          break;
      }
    }
    this.close();
  }

  saveImageFormula() {
    this._service.saveImageFormula(createFormula({formula: this.formulaText}));
  }

  saveFormulaHtml() {
    this._service.saveFormulaToHtml(this.formulaText, this.reference);
  }

  saveChartFormula(): void {
    this._service.saveChartFormula(
      this.label,
      this.level,
      this.mainIndex,
      this.index,
      this.formulaText,
      this.aggregationType);
  }

  saveTableFormula(): void {
    this._service.saveTableFormula(
      this.label,
      this.aggregationType,
      this.formulaText,
      this.mainIndex,
      this.index);
  }

  hideErrorMessage(): void {
    if (this.errorMessage == null) {
      return;
    }
  }

  insertVariable(variable: string): void {
    if (this.monacoEditor != null && this.monacoEditor.editor != null) {
      const editor = this.monacoEditor.editor;
      let value: string[] = editor.getValue().split('\n');
      let position: { column: number, lineNumber: number } = editor.getPosition();
      const ln = position.lineNumber - 1;
      let line = value[ln];
      let col = position.column - 1;
      line = line.substring(0, col) + variable + line.substring(col);
      value[ln] = line;
      position.column += variable.length;
      this.monacoEditor.value = value.join('\n');
      editor.setPosition(position);
      editor.focus();
      this.formulaText = editor.getValue();
      this.checkValidation();
    }
  }

  setVariable(variable: string): void {
    if (this.monacoEditor != null && this.monacoEditor.editor != null) {
      const editor = this.monacoEditor.editor;
      editor.setValue(variable);
    }
  }

  reset() {
    this.formulaText = '';
    this.aggregationType = AjfAggregationType.None;
  }

  close() {
    this.reset();
    this._dialogRef.close();
  }

  ngOnInit() {
    this.formulaText = this.formula;
    this.aggregationType = this.aggregation;
    this.label = this.labelText;

    if (this.formulaText == '' || this.formulaText == null) {
      this.isValid = false;
    } else {
      this.isValid = true;
    }

  }

  ngAfterViewChecked() {
    if (this._first && this.monacoEditor != null && this.monacoEditor.editor != null) {
      this.insertVariable(this.formulaText || '');
      this._first = false;
    }
  }

  ngOnDestroy(): void {
    this._formAnalyzerSub.unsubscribe();
    this._currentWidgetSub.unsubscribe();
  }
}
