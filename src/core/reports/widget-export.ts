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
import {saveAs} from 'file-saver';
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

  exportCsv(): void {
    const sheetName = this._buildTitle(this.widgetType);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this._buildXlsxData());
    const csv = XLSX.utils.sheet_to_csv(worksheet);

    saveAs(new Blob([csv], {type: 'text/csv;charset=utf-8'}), `${sheetName}${'.csv'}`);
  }

  exportXlsx(): void {
    const sheetName = this._buildTitle(this.widgetType);
    const sheets: {[sheet: string]: XLSX.WorkSheet} = {};
    sheets[sheetName] = XLSX.utils.json_to_sheet(this._buildXlsxData());
    const worksheet: XLSX.WorkBook = {Sheets: sheets, SheetNames: [sheetName]};
    const excelBuffer = XLSX.write(worksheet, {
      bookType: 'xlsx',
      type: 'array',
    });

    saveAs(new Blob([excelBuffer]), `${sheetName}.xlsx`);
  }

  private _buildXlsxData(): {[key: string]: string|number}[] {
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

  private _buildTitle(widgetType: AjfWidgetType): string {
    return `${AjfWidgetType[widgetType]} ${format(new Date(), `yyyy-MM-dd`)}`;
  }
}
