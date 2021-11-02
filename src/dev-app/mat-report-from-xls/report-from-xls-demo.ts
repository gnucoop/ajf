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
  AjfReport,
  AjfReportInstance,
  AjfReportSerializer,
  createReportInstance,
} from '@ajf/core/reports';
import * as reportFromXls from '@ajf/core/reports/report-from-xls/report-from-xls';
import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TranslocoService} from '@ngneat/transloco';
import {BehaviorSubject} from 'rxjs';
import {buildformDatas} from '@ajf/core/forms';

@Component({
  selector: 'report-from-xls-demo',
  templateUrl: 'report-from-xls-demo.html',
  styleUrls: ['report-from-xls-demo.css'],
})
export class ReportFromXlsDemo {
  formSchemaObj: {[id: string]: any} = {};
  reportInstance$: BehaviorSubject<AjfReportInstance | null> =
    new BehaviorSubject<AjfReportInstance | null>(null);
  reportSchemaStringified$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null,
  );
  schemaForms = new FormGroup({
    schema: new FormControl(''),
    id: new FormControl(''),
  });

  constructor(private _ts: TranslocoService) {
    const localSchema: any = localStorage.getItem('xls-form-schemas');
    if (localSchema != null) {
      this.formSchemaObj = JSON.parse(localSchema);
    }
  }

  addFormSchema() {
    const id = this.schemaForms.controls.id.value;
    const schema = this.schemaForms.controls.schema.value;
    this.formSchemaObj[`${id}`] = JSON.parse(schema);
    const toLocalStorage = JSON.stringify(this.formSchemaObj);

    localStorage.setItem('xls-form-schemas', toLocalStorage);
    this.schemaForms.reset();
  }

  onFileChange(ev: any) {
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = () => {
      const data = reader.result as string;
      this.saveExcel(data);
    };
    reader.readAsBinaryString(file);
  }

  removeSchema(id: string) {
    delete this.formSchemaObj[id];
    localStorage.setItem('xls-form-schemas', JSON.stringify(this.formSchemaObj));
  }

  saveExcel(file: string): void {
    if (file != null) {
      const forms = buildformDatas(this.formSchemaObj);
      const reportSchema: AjfReport = AjfReportSerializer.fromJson(
        reportFromXls.reportFromXls(file),
      );
      this.reportSchemaStringified$.next(JSON.stringify(reportSchema));

      this.reportInstance$.next(createReportInstance(reportSchema, {forms}, this._ts));
    }
  }
}
