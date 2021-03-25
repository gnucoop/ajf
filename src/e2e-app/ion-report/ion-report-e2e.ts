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
import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {testReport} from './report';

@Component({
  selector: 'ion-report-e2e',
  templateUrl: 'ion-report-e2e.html',
})
export class IonicReportE2E {
  readonly report: AjfReportInstance;

  constructor(ts: TranslateService) {
    const report = AjfReportSerializer.fromJson(testReport);
    this.report = createReportInstance(report, {}, ts);
  }
}
