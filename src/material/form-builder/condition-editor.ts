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

import {AjfField, AjfFieldType, AjfValidationService} from '@ajf/core/forms';
import {AjfExpressionUtils} from '@ajf/core/models';
import {AjfMonacoEditor} from '@ajf/material/monaco-editor';
import {
  ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation
} from '@angular/core';

declare var monaco: any;

@Component({
  selector: 'ajf-condition-editor',
  templateUrl: 'fb-condition-editor.html',
  styleUrls: ['fb-condition-editor.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AjfFbConditionEditor {
  @ViewChild(AjfMonacoEditor, {static: true}) monacoEditor: AjfMonacoEditor;

  private _fields: AjfField[];
  get fields(): AjfField[] { return this._fields; }
  @Input() set fields(fields: AjfField[]) {
    this._fields = fields;
    this._updateVariables();
  }
  @Input() condition: string;

  editedValue: string;

  constructor(_: AjfValidationService) { }

  insertVariable(variable: string): void {
    if (this.monacoEditor != null && this.monacoEditor.editor != null) {
      const editor = this.monacoEditor.editor;
      let value: string[] = editor.getValue().split('\n');
      let position: {column: number, lineNumber: number} = editor.getPosition();
      const ln = position.lineNumber - 1;
      let line = value[ln];
      let col = position.column - 1;
      line = line.substring(0, col) + variable + line.substring(col);
      value[ln] = line;
      position.column += variable.length;
      this.monacoEditor.value = value.join('\n');
      editor.setPosition(position);
      editor.focus();
      this.editedValue = editor.getValue();
    }
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

    this._updateVariables();
    this._updateFunctions();
  }

  private _updateVariables(): void {
    if (this._fields == null) { return; }
    try {
      monaco.languages.typescript.javascriptDefaults
        ._extraLibs['condition-editor-variables.d.ts'] =
          this._fields
            .map((field: AjfField) => {
              return `declare const ${field.name}: ${this._fieldVarType(field.fieldType)};`;
            })
            .join('\n');
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
}
