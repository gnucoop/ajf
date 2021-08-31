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

import {AjfContext} from '@ajf/core/common';
import {
  AjfField,
  AjfFieldType,
  AjfFieldWithChoices,
  AjfForm,
  AjfFormSerializer,
  flattenNodes,
  isField
} from '@ajf/core/forms';
import {AjfReport, AjfReportInstance, createReportInstance} from '@ajf/core/reports';
import * as reportFromForm from '@ajf/core/reports/report-from-form/report-from-form';
import {Component} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';
import {BehaviorSubject} from 'rxjs';

import {formSchema as formSchemaObj} from './mockup';

@Component({
  selector: 'report-from-form-demo',
  templateUrl: 'report-from-form-demo.html',
  styleUrls: ['report-from-form-demo.css'],
})
export class ReportFromFormDemo {
  form$: BehaviorSubject<AjfForm|null> = new BehaviorSubject<AjfForm|null>(null);
  formId: number;
  formSchema: string = JSON.stringify(formSchemaObj);
  reportInstance$: BehaviorSubject<AjfReportInstance|null> =
      new BehaviorSubject<AjfReportInstance|null>(null);
  reportSchema: AjfReport|null = null;
  reportSchemaStringified: string = '';

  constructor(
      private _ts: TranslocoService,
  ) {
    AjfFormSerializer.fromJson(formSchemaObj);
    this.reportSchema = reportFromForm.reportFromForm(formSchemaObj);
    this.reportSchemaStringified = JSON.stringify(this.reportSchema);
    this.reportInstance$.next(createReportInstance(
        this.reportSchema, {forms: this._generateRandomCtx(formSchemaObj)}, _ts));
  }

  setSchema(): void {
    if (this.formSchema == null) {
      return;
    }
    let forms;
    const schemaObj = JSON.parse(this.formSchema);
    AjfFormSerializer.fromJson(schemaObj);
    this.reportSchema = reportFromForm.reportFromForm(schemaObj, this.formId);
    this.reportSchemaStringified = JSON.stringify(this.reportSchema);
    forms = this._generateRandomCtx(schemaObj);
    if (this.formId != null) {
      forms[this.formId] = forms;
    }
    this.reportInstance$.next(createReportInstance(this.reportSchema, {forms}, this._ts));
  }

  private _generateRandomCtx(formSchema: any): AjfContext[] {
    const ctxMap: AjfContext[] = [];
    const allFields: AjfField[] =
        flattenNodes(formSchema.nodes).filter(f => isField(f)) as AjfField[];
    const generateRandomNumberOfContext = Math.floor(Math.random() * 100) + 1;
    for (let i = 0; i < generateRandomNumberOfContext; i++) {
      const ctx: AjfContext = {};
      allFields.forEach(field => {
        switch (field.fieldType) {
          default:
            ctx[field.name] = 0;
            break;
          case AjfFieldType.Number:
            ctx[field.name] = Math.floor(Math.random() * 1000) + 1;
            break;
          case AjfFieldType.Boolean:
            ctx[field.name] = Math.random() < 0.5;
            break;
          case AjfFieldType.SingleChoice:
            const singleChoices =
                (field as AjfFieldWithChoices<any>).choicesOrigin.choices.map(c => c.value);
            ctx[field.name] = singleChoices[Math.floor(Math.random() * singleChoices.length)];
            break;
          case AjfFieldType.MultipleChoice:
            const multipleChoices =
                (field as AjfFieldWithChoices<any>).choicesOrigin.choices.map(c => c.value);
            ctx[field.name] = [
              multipleChoices[Math.floor(Math.random() * multipleChoices.length)],
              multipleChoices[Math.floor(Math.random() * multipleChoices.length)]
            ];
        }
      });
      ctxMap.push(ctx);
    }
    return ctxMap;
  }
}
