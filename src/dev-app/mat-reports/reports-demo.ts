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
  AjfReportInstance,
  AjfReportSerializer,
  createReportInstance,
  openReportPdf,
} from '@ajf/core/reports';
import {AjfWidgetService} from '@ajf/material/reports';
import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {CustomWidget} from './custom-widget';
import {testReport} from './report';

@Component({
  selector: 'reports-demo',
  templateUrl: 'reports-demo.html',
  styleUrls: ['reports-demo.css'],
})
export class ReportsDemo {
  report: AjfReportInstance;
  reportStr: string = JSON.stringify(testReport);
  context: string = '{}';

  constructor(private _ts: TranslateService, widgetService: AjfWidgetService) {
    widgetService.registerCustomWidget({widgetType: 101, component: CustomWidget});
    const engDict = {
      'Salva': 'Save',
      'Esempio': 'Sample',
      'Testo': 'Text',
      'Colonna 1': 'Column 1',
      'Righa 1': 'Row 1',
      'Nome': 'Name',
      'Dessie Zuria': 'DessieT ZuriaT',
      'Totale': 'Total'
    };
    _ts.setTranslation('ENG', engDict);
    _ts.setDefaultLang('ENG');
    this._populateReport();
  }

  setReport(): void {
    this._populateReport();
  }

  printReport(orientation: 'portrait'|'landscape') {
    openReportPdf(this.report, orientation);
  }

  private _populateReport(): void {
    try {
      const schema = JSON.parse(this.reportStr);
      const report = AjfReportSerializer.fromJson(schema);
      const ctx = JSON.parse(this.context);
      this.report = createReportInstance(report, ctx, this._ts);
    } catch (e) {
    }
  }
}
