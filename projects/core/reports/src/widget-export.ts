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
import {utils, WorkBook, WorkSheet, writeFile} from 'xlsx';

import {AjfWidgetType} from './interface/widgets/widget-type';

@Component({
  selector: 'ajf-widget-export',
  templateUrl: 'widget-export.html',
  styleUrls: ['widget-export.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AjfWidgetExport {
  @Input() widgetType: AjfWidgetType | undefined;
  @Input() data: ChartData | AjfTableCell[][] | undefined;
  @Input() overlay = true;
  @Input() enable = false;

  showOverlay = false;

  private static _iconsMap: {[html: string]: string} = {};

  /**
   * Allows rendering html icons as text.
   */
  static addIcons(icons: {[html: string]: string}) {
    AjfWidgetExport._iconsMap = {...AjfWidgetExport._iconsMap, ...icons};
  }

  constructor() {}

  /**
   * Export widget data in CSV format
   * @deprecated Use `AjfWidgetExport.export` with 'csv' parameter.
   * @breaking-change 13.0.0
   */
  exportCsv(): void {
    this.export('csv');
  }

  /**
   * Export widget data in Xlsx format
   * @deprecated Use `AjfWidgetExport.export` with 'xlsx' parameter.
   * @breaking-change 13.0.0
   */
  exportXlsx(): void {
    this.export('xlsx');
  }

  /**
   * Export widget data in CSV or Xlsx format
   */
  export(bookType: 'csv' | 'xlsx'): void {
    if (this.widgetType == null) {
      return;
    }
    const sheetName = this._buildTitle(this.widgetType);
    const sheets: {[sheet: string]: WorkSheet} = {};
    sheets[sheetName] = utils.aoa_to_sheet(this._buildXlsxData());
    const workBook: WorkBook = {Sheets: sheets, SheetNames: [sheetName]};
    writeFile(workBook, `${sheetName}.${bookType}`, {
      bookType,
      type: 'array',
    });
  }

  private _buildXlsxData(): unknown[][] {
    const iconsMap = AjfWidgetExport._iconsMap;
    let xlsxData: unknown[][] = [];
    let labels: string[] = [];
    switch (this.widgetType) {
      default:
      case AjfWidgetType.Chart:
        this.data = this.data as ChartData;
        const datasets = this.data.datasets || [];
        labels = ['name'].concat(this.data.labels as string[]);
        xlsxData.push(labels);
        for (let i = 0; i < datasets.length; i++) {
          const row: unknown[] = [];
          const data = datasets[i].data || [];
          row.push(datasets[i].label);
          for (let j = 0; j < data.length; j++) {
            row.push(data[j]);
          }
          xlsxData.push(row);
        }
        break;
      case AjfWidgetType.DynamicTable:
      case AjfWidgetType.Table:
        const tableData = this.data as AjfTableCell[][];
        if (tableData.length > 1) {
          xlsxData = [];
          const nextRows: unknown[][] = [];
          let nextRow: unknown[] = [];
          let totRowSpan = 0;
          let nextRowspanNum = 0;

          for (let i = 0; i < tableData.length; i++) {
            let isNewRowAfterRowspan = false;
            let res: unknown[] = [];

            nextRow = [];
            if (totRowSpan > 0) {
              res = [...nextRows[nextRowspanNum - 1]];
              isNewRowAfterRowspan = true;
            }
            tableData[i].forEach((elem: AjfTableCell, idxElem: number) => {
              let val = elem.value.changingThisBreaksApplicationSecurity;
              if (iconsMap[val]) {
                val = iconsMap[val];
              }
              res.push(val);

              if (elem.colspan && elem.colspan > 1) {
                for (let j = 1; j < elem.colspan; j++) {
                  res.push(' ');
                }
              }
              if (isNewRowAfterRowspan) {
                if (elem.rowspan && elem.rowspan > 1) {
                  for (let idx = 1; idx < elem.rowspan; idx++) {
                    nextRow.push(' ');
                    nextRows[nextRowspanNum] = nextRows[nextRowspanNum].concat(nextRow);
                  }
                }
                if (idxElem === tableData[i].length - 1 && nextRowspanNum > 0) {
                  nextRowspanNum++;
                  if (nextRowspanNum === totRowSpan) {
                    totRowSpan = 0;
                    nextRowspanNum = 0;
                  }
                }
              } else {
                if (elem.rowspan && elem.rowspan > 1) {
                  totRowSpan = elem.rowspan;
                  nextRowspanNum = 1;
                  for (let idx = 1; idx < elem.rowspan; idx++) {
                    nextRow.push(' ');
                    nextRows[idx - 1] = nextRow;
                  }
                }
              }
            });
            xlsxData.push(res);
          }
        }
        break;
    }

    return xlsxData;
  }

  private _buildTitle(widgetType: AjfWidgetType): string {
    return `${AjfWidgetType[widgetType]} ${format(new Date(), `yyyy-MM-dd`)}`;
  }
}
