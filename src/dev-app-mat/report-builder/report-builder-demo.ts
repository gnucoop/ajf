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

import {AjfReportSerializer} from '@ajf/core/reports';
import {AjfReportBuilderService} from '@ajf/material/report-builder';
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {delay, map, startWith} from 'rxjs/operators';

import {testReport} from './report';

@Component({
  moduleId: module.id,
  selector: 'report-builder-demo',
  templateUrl: 'report-builder-demo.html',
  styleUrls: ['report-builder-demo.css'],
})
export class ReportBuilderDemo {
  readonly reportSaved: Observable<string>;
  report: string = JSON.stringify(testReport);

  constructor(private _service: AjfReportBuilderService) {
    this.reportSaved = _service.reportSaved.pipe(
        map((r) => r != null ? JSON.stringify(r) : ''), delay(100), startWith(''));
  }

  setReport(): void {
    try {
      let myObj = JSON.parse(this.report);
      this._service.setReport(AjfReportSerializer.fromJson(myObj));
    } catch (e) { console.log('Invalid report definition'); }
  }

  saveReport(): void {
    this._service.saveReport();
  }
}
