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
import {ChartData, ChartDataSets} from 'chart.js';

import {Observable, Subject} from 'rxjs';

import {ExtendedChartType} from '@ajf/core/chart';
import {AjfFormula} from '@ajf/core/models';
import {AjfTableCell} from '@ajf/core/table';
import {deepCopy} from '@ajf/core/utils';
import {chartToChartJsType} from './chart-utils';
import {AjfDataset, AjfTableDataset} from './dataset';
import {AjfReportStyles} from './report-styles';
import {
  AjfReportChartWidget, AjfReportDataWidget, AjfReportFormulaWidget, AjfReportImageContainerWidget,
  AjfReportImageWidget, AjfReportLayoutWidget, AjfReportMapWidget, AjfReportTableWidget,
  AjfReportTextWidget, AjfReportWidget, AjfReportWidgetType
} from './widgets';

export class AjfReportWidgetInstance {
  protected _widget: AjfReportWidget;
  get widget(): AjfReportWidget { return this._widget; }

  private _visible = true;
  get visible(): boolean { return this._visible; }

  private _content: AjfReportWidgetInstance[];
  get content(): AjfReportWidgetInstance[] { return this._content; }

  private _styles: AjfReportStyles;
  get styles(): AjfReportStyles {
    return this._styles;
  }

  private _widgetType: AjfReportWidgetType;
  get widgetType(): AjfReportWidgetType | null {
    return this._widgetType;
  }

  protected _context: any;

  static create(
    widget: AjfReportWidget, context: any, ts: TranslateService): AjfReportWidgetInstance {
    if (widget instanceof AjfReportLayoutWidget) {
      return new AjfReportLayoutWidgetInstance(widget, context, ts);
    } else if (widget instanceof AjfReportImageWidget) {
      return new AjfReportImageWidgetInstance(widget, context, ts);
    } else if (widget instanceof AjfReportTextWidget) {
      return new AjfReportTextWidgetInstance(widget, context, ts);
    } else if (widget instanceof AjfReportTableWidget) {
      return new AjfReportTableWidgetInstance(widget, context, ts);
    } else if (widget instanceof AjfReportChartWidget) {
      return new AjfReportChartWidgetInstance(widget, context, ts);
    } else if (widget instanceof AjfReportMapWidget) {
      return new AjfReportMapWidgetInstance(widget, context, ts);
    } else if (widget instanceof AjfReportDataWidget) {
      return new AjfReportDataWidgetInstance(widget, context, ts);
    } else if (widget instanceof AjfReportFormulaWidget) {
      return new AjfReportFormulaWidgetInstance(widget, context, ts);
    } else if (widget instanceof AjfReportImageContainerWidget) {
      return new AjfReportImageContainerWidgetInstance(widget, context, ts);
    } else if (widget instanceof AjfReportWidget) {
      return new AjfReportWidgetInstance(widget, context, ts);
    }
    throw new Error('Invalid widget type');
  }

  constructor(widget: AjfReportWidget, context: any, public ts: TranslateService) {
    this._widget = widget;
    if (widget != null) {
      this._styles = widget.styles;
      this._widgetType = widget.widgetType;
    }
    this._context = context;

    this._initInstance();
    this.initContext(context);
  }

  initContext(context: any): void {
    this._evaluateVisibility(context);
  }

  protected _initInstance(): void {
    this._populateContent();
  }

  private _populateContent(): void {
    const content: AjfReportWidgetInstance[] = [];
    if (this._widget.hasContent) {
      this._widget.content.forEach(w => {
        content.push(AjfReportWidgetInstance.create(w, this._context, this.ts));
      });
    }
    this._content = content;
  }

  private _evaluateVisibility(context: any): void {
    if (this._widget.visibility != null) {
      this._visible = this._widget.visibility.evaluate(context);
    }
  }
}


export class AjfReportDataWidgetInstance extends AjfReportWidgetInstance {
  get widget(): AjfReportDataWidget {
    return <AjfReportDataWidget>this._widget;
  }

  private _dataset: any;
  get dataset(): any { return this._dataset; }

  constructor(widget: AjfReportDataWidget, context: any, ts: TranslateService) {
    super(widget, context, ts);
  }

  initContext(context: any): void {
    super.initContext(context);
    this._populateData(context);
  }

  protected _initInstance(): void {
    super._initInstance();
  }

  private _populateData(context: any): void {
    this._dataset = (<any[]>(this.widget.dataset || []))
      .map(row => {
        if (row instanceof Array) {
          return (<AjfDataset[]>row).map((cell) => {
            return cell.formula instanceof Array ?
              cell.formula.map((f) => f.evaluate(context)) :
              cell.formula.evaluate(context);
          });
        } else {
          const formula = (<AjfDataset>row).formula;
          return formula instanceof Array ?
            formula.map((f) => f.evaluate(context)) :
            formula.evaluate(context);
        }
      });
  }
}


export class AjfReportLayoutWidgetInstance extends AjfReportWidgetInstance {
  constructor(widget: AjfReportWidget, context: any, ts: TranslateService) {
    super(widget, context, ts);
  }

  getColumnContent(column: number): AjfReportWidgetInstance | null {
    return column >= 0 && column < this.content.length ? this.content[column] : null;
  }
}

export class AjfReportColumnWidgetInstance extends AjfReportWidgetInstance {
  constructor(widget: AjfReportWidget, context: any, ts: TranslateService) {
    super(widget, context, ts);
  }
}

export class AjfReportPageBreakWidgetInstance extends AjfReportWidgetInstance {
  constructor(widget: AjfReportWidget, context: any, ts: TranslateService) {
    super(widget, context, ts);
  }
}

export class AjfReportImageWidgetInstance extends AjfReportWidgetInstance {
  private _icon: string;
  get icon(): string { return this._icon; }

  private _flag: string;
  get flag(): string { return this._flag; }

  private _url: string;
  get url(): string { return this._url; }

  initContext(context: any): void {
    super.initContext(context);
    const widget = (<AjfReportImageWidget>this.widget);
    const icon = widget.icon;
    const flag = widget.flag;
    const url = widget.url;
    this._icon = icon ? icon.evaluate(context) : '';
    this._flag = flag ? flag.evaluate(context) : '';
    this._url = url ? url.evaluate(context) : '';
  }
}

export class AjfReportImageContainerWidgetInstance extends AjfReportWidgetInstance {
  private _icons: string[];
  get icons(): string[] { return this._icons; }

  private _flags: string[];
  get flags(): string[] { return this._flags; }

  private _urls: string[];
  get urls(): string[] { return this._urls; }

  initContext(context: any): void {
    super.initContext(context);
    const widget = (<AjfReportImageContainerWidget>this.widget);

    // TODO: check! perche' evaluate torna una lista di liste?
    // this._urls[0][0] contiene la lista di url..
    this._urls = widget.urls ?
      (widget.urls instanceof Array ? widget.urls :
        (widget.urls instanceof AjfFormula ? widget.urls.evaluate(context) : []))
      : [];

    this._flags = widget.flags ?
      (widget.flags instanceof Array ? widget.flags :
        (widget.flags instanceof AjfFormula ? widget.flags.evaluate(context) : []))
      : [];

    this._icons = widget.icons ?
      (widget.icons instanceof Array ? widget.icons.map((l) => l.evaluate(context)) :
        (widget.icons instanceof AjfFormula ? widget.icons.evaluate(context) : []))
      : [];
  }
}

export class AjfReportTextWidgetInstance extends AjfReportWidgetInstance {
  private _htmlText: string;
  get htmlText(): string { return this._htmlText; }

  initContext(context: any): void {
    super.initContext(context);
    const formulaRegEx: RegExp = /\[\[(.+?)\]\]/g;
    const widget = (<AjfReportTextWidget>this.widget);
    let htmlText = widget.htmlText;
    const matches: { idx: number, len: number, formula: AjfFormula }[] = [];
    let match;
    while (match = formulaRegEx.exec(htmlText)) {
      const idx = match['index'];
      const len = match[0].length;
      const formula = new AjfFormula({ formula: match[1] });
      matches.push({ idx, len, formula });
    }
    matches.reverse().forEach((m) => {
      let calcValue;
      try {
        calcValue = m.formula.evaluate(context);
      } catch (e) {
        calcValue = '';
      }
      htmlText = `${htmlText.substr(0, m.idx)}${calcValue}${htmlText.substr(m.idx + m.len)}`;
    });
    this._htmlText = htmlText;
  }
}

export class AjfReportTableWidgetInstance extends AjfReportWidgetInstance {
  private _data: AjfTableCell[][];
  get data(): AjfTableCell[][] { return this._data; }

  private _recalcEvt: Subject<boolean> = new Subject<boolean>();
  private _recalc: Observable<boolean>;
  get recalc(): Observable<boolean> { return this._recalc; }

  constructor(widget: AjfReportWidget, context: any, ts: TranslateService) {
    super(widget, context, ts);
    this._recalc = this._recalcEvt.asObservable();
  }

  initContext(context: any): void {
    super.initContext(context);
    const widget = <AjfReportTableWidget>this.widget;
    this._data = [];

    let rows = (widget.dataset || []);
    const rowsNum = rows.length;
    for (let i = 0; i < rowsNum; i++) {
      const row: AjfTableDataset[] = rows[i];
      const cellsNum = row.length;
      this._data.push([]);
      for (let j = 0; j < cellsNum; j++) {
        const cell = row[j];
        const value = cell.formula.evaluate(context);
        const style = Object.assign({}, widget.cellStyles, cell.style);
        this._data[i].push(<AjfTableCell>{
          value,
          style,
          rowspan: cell.rowspan,
          colspan: cell.colspan
        });
      }
    }
    // this._data = (widget.dataset || []).map((row: AjfDataset[]) => {
    //   return row.map((cell: AjfTableDataset) => {
    //     return <AjfTableCell>{
    //       value: cell.formula.evaluate(context),
    //       style: Object.assign({}, widget.cellStyles, cell.style),
    //       rowspan: cell.rowspan,
    //       colspan: cell.colspan
    //     };
    //   });
    // });
  }

  calcValues(context: any): void {
    if (context === undefined) { return; }
    const widget = <AjfReportTableWidget>this.widget;
    let rows = (widget.dataset || []);
    const rowsNum = rows.length;
    for (let i = 0; i < rowsNum; i++) {
      const row: AjfTableDataset[] = rows[i];
      const cellsNum = row.length;
      for (let j = 0; j < cellsNum; j++) {
        const cell = row[j];
        this._data[i][j].value = cell.formula.evaluate(context);
      }
    }
    this._data = this._data.slice(0);
    this._recalcEvt.next(true);
  }
}

export class AjfReportChartWidgetInstance extends AjfReportDataWidgetInstance {
  private _datasets: ChartDataSets[];
  private _labels: string[];

  private _data: ChartData;
  get data(): ChartData {
    return this._data;
  }

  private _chartType: ExtendedChartType;
  get chartType(): ExtendedChartType { return this._chartType; }

  constructor(widget: AjfReportDataWidget, context: any, ts: TranslateService) {
    super(widget, context, ts);
  }

  private _translate(formula: AjfFormula, context: any): string[] {
    const evaluatedfunction: any = formula.evaluate(context);
    try {
      if (Array.isArray(evaluatedfunction)) {
        evaluatedfunction.forEach((rowValue, index) => {
          if (Array.isArray(rowValue)) {
            rowValue.forEach((value, rowIndex) => {
              evaluatedfunction[index][rowIndex] = this.ts.instant(value);
            });
          } else {
            evaluatedfunction[index] = this.ts.instant(rowValue);
          }
        });
      }
      return evaluatedfunction;
    } catch (e) {
      return evaluatedfunction;
    }
  }

  initContext(context: any): void {
    super.initContext(context);
    const widget = <AjfReportChartWidget>this.widget;
    this._chartType = chartToChartJsType(widget.chartType);
    if (widget.labels instanceof Array) {
      widget.labels.map((l: AjfFormula) => {
        this._labels.concat(this._translate(l, context));
      });
    } else {
      this._labels = this._translate(widget.labels, context);
    }

    this._datasets = widget.dataset.map((d => {
      let ds = Object.assign({}, d.options || {}, {
        data: d.aggregation.evaluate(d.formula, context)
      });
      if (d.chartType != null) {
        const ct = chartToChartJsType(d.chartType);
        ds = Object.assign(ds, {
          chartType: ct,
          type: ct
        });
      }
      if (d.options != null) {
        ds = Object.assign(ds, {
          options: d.options
        });
      }
      if (d.label != null) {
        ds = Object.assign(ds, {
          label: d.label
        });
      }
      if (d.datalabels != null) {
        ds.datalabels = deepCopy(d.datalabels);
      }
      return ds;
    }));
    this._data = { labels: this._labels, datasets: this._datasets };
  }
}

export class AjfReportMapWidgetInstance extends AjfReportDataWidgetInstance {
  coordinate: number[];

  initContext(context: any): void {
    super.initContext(context);
    const widget = <AjfReportMapWidget>this.widget;
    this.coordinate = widget.coordinate.evaluate(context);
  }
}

export class AjfReportFormulaWidgetInstance extends AjfReportWidgetInstance {
  private _formula: string;
  get formula(): string { return this._formula; }

  initContext(context: any): void {
    super.initContext(context);
    const widget = <AjfReportFormulaWidget>this.widget;
    this._formula = widget.formula.evaluate(context);
  }
}
