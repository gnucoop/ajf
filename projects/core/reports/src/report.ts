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

import {AfterViewInit, ChangeDetectorRef, Directive, Input} from '@angular/core';

import {AjfReportInstance} from './interface/reports-instances/report-instance';
import {AjfReport} from './interface/reports/report';

@Directive()
export abstract class AjfReportRenderer implements AfterViewInit {
  private _instance: AjfReportInstance | undefined;
  get instance(): AjfReportInstance | undefined {
    return this._instance;
  }
  @Input()
  set instance(instance: AjfReportInstance | undefined) {
    this._instance = instance;
    this._report = instance != null ? instance.report : null;
    this._cdr.markForCheck();
  }

  @Input() enableExportAll: boolean = false;

  private _report: AjfReport | null = null;
  get report(): AjfReport | null {
    return this._report;
  }

  private _enableExport: boolean = true;
  get enableExport(): boolean {
    return this._enableExport;
  }

  constructor(private _cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this._enableExport =
      this.enableExportAll &&
      this._instance != null &&
      this._instance.content &&
      this._instance.content.content
        ? true
        : false;
    this._cdr.markForCheck();
  }
}
