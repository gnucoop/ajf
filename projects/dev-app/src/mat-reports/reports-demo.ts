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
  AjfWidgetExport,
  createReportInstance,
  downloadReportDoc,
  openReportPdf,
} from '@ajf/core/reports';
import {AjfContext} from '@ajf/core/common';
import {TranslocoService} from '@ajf/core/transloco';
import {AjfWidgetService} from '@ajf/material/reports';
import {Component} from '@angular/core';

import {CustomWidget} from './custom-widget';
import {testReport} from './report';

@Component({
  selector: 'reports-demo',
  templateUrl: 'reports-demo.html',
  styleUrls: ['reports-demo.scss'],
})
export class ReportsDemo {
  report: AjfReportInstance|undefined;
  printableReport: AjfReportInstance|undefined;
  reportStr: string = JSON.stringify(testReport);
  context: string = '{}';

  constructor(private _ts: TranslocoService, widgetService: AjfWidgetService) {
    widgetService.registerCustomWidget({widgetType: 101, component: CustomWidget});
    const engDict = {
      'Salva': 'Save',
      'Esempio': 'Sample',
      'Testo': 'Text',
      'Colonna 1': 'Column 1',
      'Righa 1': 'Row 1',
      'Nome': 'Name',
      'Dessie Zuria': 'DessieT ZuriaT',
      'Totale': 'Total',
    };
    _ts.setTranslation(engDict, 'ENG');
    _ts.setDefaultLang('ENG');
    this.report = this.recreateReportInstance();
    this.printableReport = this.report;

    AjfWidgetExport.addIcons({'3a': '3a export icon!'});
  }

  private recreateReportInstance(): AjfReportInstance {
    const schema = JSON.parse(this.reportStr);
    const report = AjfReportSerializer.fromJson(schema);
    const ctx = JSON.parse(this.context);
    return createReportInstance(report, ctx, this._ts);
  }

  setReport(): void {
    this.report = this.recreateReportInstance();
    this.printableReport = this.report;
  }

  filterWidgetChanged(changes: {context: AjfContext, report?: AjfReportInstance}) {
    let ctx = {};
    try {
      ctx = JSON.parse(this.context);
    } catch (_) {}
    ctx = {...ctx, ...changes.context};
    this.context = JSON.stringify(ctx);

    if (changes.report) {
      this.printableReport = changes.report;
    }
  }

  printReport(orientation: 'portrait' | 'landscape') {
    if (this.printableReport) {
      openReportPdf(this.printableReport, orientation);
    }
  }

  downloadReportDoc(orientation: 'portrait' | 'landscape') {
    if (this.printableReport) {
      downloadReportDoc(this.printableReport, undefined, orientation as any);
    }
  }
}
