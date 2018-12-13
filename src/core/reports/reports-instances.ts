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

import {TranslateService} from '@ngx-translate/core';

import {AjfTableDataset} from './dataset';
import {AjfReport, AjfReportContainer} from './reports';
import {AjfReportStyles} from './report-styles';
import {AjfReportWidgetInstance} from './widgets-instances';
import {
  AjfReportChartWidget, AjfReportTextWidget, AjfReportTableWidget, AjfReportWidget
} from './widgets';


export class AjfReportContainerInstance {
  private _container: AjfReportContainer;
  get container(): AjfReportContainer { return this._container; }

  private _content: AjfReportWidgetInstance[];
  get content(): AjfReportWidgetInstance[] { return this._content; }

  private _styles: AjfReportStyles = {};
  get styles(): AjfReportStyles { return this._styles; }

  private _context: any;

  constructor(container: AjfReportContainer, context: any, private _ts: TranslateService) {
    this._container = container;
    this._styles = this._container != null ? this._container.styles : {};
    this._context = context;

    this._populateContent();
  }

  private _populateContent(): void {
    const content: AjfReportWidgetInstance[] = [];
    this._container.content.forEach(c => {
      this._translate(c);
      content.push(AjfReportWidgetInstance.create(c, this._context, this._ts));
    });
    this._content = content;
  }

  private _translate(reportWidget: AjfReportWidget): void {
    if (reportWidget.hasContent) {
      reportWidget.content.forEach((subReportWidget: AjfReportWidget) => {
        this._translate(subReportWidget);
      });
    }

    if (reportWidget instanceof AjfReportTextWidget && reportWidget.htmlText) {
      reportWidget.htmlText = this._ts.instant(reportWidget.htmlText);
    }

    if (reportWidget instanceof AjfReportChartWidget && reportWidget.dataset) {
      reportWidget.dataset.forEach(element => {
        element.label = element.label ? this._ts.instant(element.label) : '';
      });
    }

    if (reportWidget instanceof AjfReportTableWidget && reportWidget.dataset) {
      reportWidget.dataset.forEach((row: AjfTableDataset[]) => {
        row.forEach((element: AjfTableDataset) => {
          if (element.formula && element.formula.formula) {
            try {
              let formulaToBeTranslate = element.formula.formula;
              if (formulaToBeTranslate[0] === '"') {
                formulaToBeTranslate = formulaToBeTranslate.slice(1, -1);
                element.formula.formula = formulaToBeTranslate.length > 0
                  ? `"${this._ts.instant(formulaToBeTranslate)}"` : element.formula.formula;
              } else {
                element.formula.formula = this._ts.instant(formulaToBeTranslate);
              }
            } catch (e) { }
          }
        });
      });

    }

  }
}


/**
 * A report instance. Report + data
 */
export class AjfReportInstance {
  /**
   * The report
   */
  private _report: AjfReport;
  get report(): AjfReport { return this._report; }

  private _header: AjfReportContainerInstance;
  get header(): AjfReportContainerInstance { return this._header; }

  private _content: AjfReportContainerInstance;
  get content(): AjfReportContainerInstance { return this._content; }

  private _footer: AjfReportContainerInstance;
  get footer(): AjfReportContainerInstance { return this._footer; }

  private _data: any;
  get data(): any { return this._data; }

  get styles(): AjfReportStyles {
    return this._report != null ? this._report.styles : {};
  }

  private _context: any;
  get context(): any { return this._context; }

  constructor(report: AjfReport, context: any, private _ts: TranslateService) {
    this._report = report;
    this._context = context;

    this._populateReport();
  }

  private _populateReport(): void {
    this._header = this._populateContainer(this._report.header);
    this._content = this._populateContainer(this._report.content);
    this._footer = this._populateContainer(this._report.footer);
  }

  private _populateContainer(container: AjfReportContainer): AjfReportContainerInstance {
    return new AjfReportContainerInstance(container, this._context, this._ts);
  }
}
