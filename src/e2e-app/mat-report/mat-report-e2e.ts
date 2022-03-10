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

import {AjfReportInstance, AjfReportSerializer, createReportInstance} from '@ajf/core/reports';
import {TranslocoService} from '@ajf/core/transloco';
import {Component} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {defaultReport, filterReport, globalFilterReport} from './reports';

@Component({
  selector: 'mat-report-e2e',
  templateUrl: 'mat-report-e2e.html',
})
export class MaterialReportE2E {
  readonly report$: Observable<AjfReportInstance>;
  readonly routeStream$: Observable<Params> = this._route.queryParams;

  constructor(ts: TranslocoService, private _route: ActivatedRoute) {
    this.report$ = this.routeStream$.pipe(
      map(param => {
        if (param != null && param.filter === 'filter') {
          return filterReport;
        }
        if (param != null && param.filter === 'global') {
          return globalFilterReport;
        }

        return defaultReport;
      }),
      map(report => AjfReportSerializer.fromJson(report)),
      map(r => createReportInstance(r, {}, ts)),
    );
  }
}
