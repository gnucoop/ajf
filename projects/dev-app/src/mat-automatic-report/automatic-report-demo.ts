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

import {AjfForm, AjfFormSerializer, generateRandomCtx} from '@ajf/core/forms';
import {AjfReport, AjfReportInstance, createReportInstance} from '@ajf/core/reports';
import {automaticReport} from '@ajf/core/reports';
import {Component, ViewEncapsulation} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';
import {BehaviorSubject} from 'rxjs';

import {formSchema as formSchemaObj} from './mockup';

@Component({
  selector: 'automatic-report-demo',
  templateUrl: 'automatic-report-demo.html',
  styleUrls: ['automatic-report-demo.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AutomaticReportDemo {
  form$: BehaviorSubject<AjfForm | null> = new BehaviorSubject<AjfForm | null>(null);
  formId: number | undefined = undefined;
  formSchema: string = JSON.stringify(formSchemaObj);
  reportInstance$: BehaviorSubject<AjfReportInstance | null> =
    new BehaviorSubject<AjfReportInstance | null>(null);
  reportSchema: AjfReport | null = null;
  reportSchemaStringified: string = '';

  constructor(private _ts: TranslocoService) {
    const form = AjfFormSerializer.fromJson(formSchemaObj);
    this.reportSchema = automaticReport(form);
    this.reportSchemaStringified = JSON.stringify(this.reportSchema);
    if (this.reportSchema != null) {
      this.reportInstance$.next(
        createReportInstance(this.reportSchema, {forms: generateRandomCtx(form)}, _ts),
      );
    }
  }

  setSchema(): void {
    if (this.formSchema == null) {
      return;
    }
    const schemaObj = JSON.parse(this.formSchema);
    const form = AjfFormSerializer.fromJson(schemaObj);
    this.reportSchema = automaticReport(form, this.formId);
    this.reportSchemaStringified = JSON.stringify(this.reportSchema);
    const forms = generateRandomCtx(form);
    if (this.formId != null) {
      forms[this.formId] = forms;
    }
    if (this.reportSchema != null) {
      this.reportInstance$.next(createReportInstance(this.reportSchema, {forms}, this._ts));
    }
  }
}
