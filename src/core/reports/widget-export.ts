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

import {AjfTableCell} from '@ajf/core/table';
import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {ChartData} from 'chart.js';
import {format} from 'date-fns';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import {AjfWidgetType} from '../reports/interface/widgets/widget-type';


@Component({
  selector: 'ajf-widget-export',
  template: `
    <div class="ajf-widget-wrapper">
        <ng-content></ng-content>
        <div  *ngIf="enable" class="ajf-export-menu" [style.display]="!overlay?'block':'none'">
            <button (click)="exportCsv()">
                CSV
            </button>
            <button (click)="exportXlsx()" mat-menu-item>
                XLSX
            </button>
        </div>
    </div>
    `,
  styleUrls: ['widget-export.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AjfWidgetExport {
  @Input() widgetType: AjfWidgetType;
  @Input() data: ChartData|AjfTableCell[][];
  @Input() overlay = true;
  @Input() enable = false;
  constructor() {}
  buildCsv(): string {
    let csvString = '';
    const DELIMITER = ',';
    const STOP = '\n';
    switch (this.widgetType) {
      default:
      case AjfWidgetType.Chart:
        this.data = this.data as ChartData;
        if (this.data.datasets == null || this.data.labels == null) {
          return csvString;
        }
        csvString = DELIMITER + (this.data.labels as string[]).toString() + STOP;
        this.data.datasets.forEach((dataset: Chart.ChartDataSets) => {
          const data = dataset.data || [];
          csvString += dataset.label + DELIMITER + data.toString() + STOP;
        });
        break;
      case AjfWidgetType.Table:
        let prefix = '';
        let rowSpan = 0;
        this.data = this.data as AjfTableCell[][];
        for (let row of this.data) {
          csvString += prefix;
          for (let elem of row) {
            if (elem.rowspan == null) {
              if (parseInt(elem.value, 10) || elem.value === false) {
                csvString += elem.value + ',';
              } else {
                csvString += elem.value + ',';
              }
            } else {
              rowSpan = elem.rowspan as number;
              csvString += elem.value + ',';
              prefix = ',';
            }
          }
          if (csvString[csvString.length - 1] === ',') {
            csvString = csvString.substring(0, csvString.length - 1);
          }
          csvString += '\n';
          rowSpan--;
          if (rowSpan > 0) {
            csvString += ',';
          }
          prefix = '';
        }

        break;
    }

    return csvString;
  }
  exportCsv(): void {
    if (this.widgetType == null || this.data == null) {
      return;
    }
    (fileSaver as any)
        .default(
            new Blob([this.buildCsv()], {type: 'text/csv;charset=utf-8'}),
            `${this._buildTitle(this.widgetType)}${'.csv'}`);
  }

  buildXlsx(): {[key: string]: string|number}[] {
    let xlsxData: {[key: string]: string|number}[] = [];
    let labels: string[] = [];
    switch (this.widgetType) {
      default:
      case AjfWidgetType.Chart:
        this.data = this.data as ChartData;
        const datasets = this.data.datasets || [];
        labels = this.data.labels as string[];
        for (let i = 0; i < datasets.length; i++) {
          const row: {[id: string]: any} = {};
          const data = datasets[i].data || [];
          row['name'] = datasets[i].label;
          for (let j = 0; j < data.length; j++) {
            row[labels[j]] = data[j];
          }
          xlsxData.push(row);
        }
        break;
      case AjfWidgetType.Table:
        this.data = this.data as AjfTableCell[][];
        this.data.forEach((row: AjfTableCell[], idxRow: number) => {
          const res: {[id: string]: any} = {};
          if (idxRow === 0) {
            labels = row.map(r => r.value.changingThisBreaksApplicationSecurity);
          } else {
            row.forEach((elem: AjfTableCell, idxElem: number) => {
              res[labels[idxElem]] = elem.value.changingThisBreaksApplicationSecurity;
            });
            xlsxData.push(res);
          }
        });
        break;
    }

    return xlsxData;
  }

  exportXlsx(): void {
    const ws: XLSX.WorkSheet = (XLSX as any).default.utils.json_to_sheet(this.buildXlsx());
    const wb: XLSX.WorkBook = (XLSX as any).default.utils.book_new();
    const title = this._buildTitle(this.widgetType);

    (XLSX as any).default.utils.book_append_sheet(wb, ws, title);
    (XLSX as any).default.writeFile(wb, `${title}.xlsx`);
  }

  private _buildTitle(widgetType: AjfWidgetType): string {
    return `${AjfWidgetType[widgetType]} ${format(new Date(), `yyyy-MM-dd`)}`;
  }
}
