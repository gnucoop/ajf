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
  AfterContentInit, ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation
} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

import {AjfReport} from '@ajf/core/reports';
import {AjfReportBuilderService} from './report-builder-service';

@Component({
  moduleId: module.id,
  selector: 'ajf-report-builder',
  templateUrl: 'report-builder.html',
  styleUrls: ['report-builder.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * This class will define an ajf form builderx
 */
export class AjfReportBuilder implements AfterContentInit {
  @ViewChild(MatSidenav, {static: true}) startSidenav: MatSidenav;

  private _init: boolean = false;

  private _report: AjfReport;
  get report(): AjfReport { return this._report; }
  @Input() set report(report: AjfReport) {
    if (report != null) {
      this._report = report;
      if (this._init) {
        this._setCurrentReport();
      }
    }
  }

  constructor(private _service: AjfReportBuilderService) { }

  ngAfterContentInit(): void {
    this._setCurrentReport();
    this._init = true;
  }

  private _setCurrentReport(): void {
    this._service.setReportForms(this.report != null ? this.report.forms || [] : []);
    this._service.setReport(this.report);
  }
}
