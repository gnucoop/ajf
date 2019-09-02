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

import {AjfContext, AjfFormula, createFormula, evaluateExpression} from '@ajf/core/models';
import {deepCopy} from '@ajf/core/utils';
import {TranslateService} from '@ngx-translate/core';

import {chartToChartJsType} from '../../chart-utils';
import {AjfChartWidgetInstance} from '../../interface/widgets-instances/chart-widget-instance';
import {AjfFormulaWidgetInstance} from '../../interface/widgets-instances/formula-widget-instance';
import {
  AjfImageContainerWidgetInstance
} from '../../interface/widgets-instances/image-container-widget-instance';
import {AjfImageWidgetInstance} from '../../interface/widgets-instances/image-widget-instance';
import {AjfMapWidgetInstance} from '../../interface/widgets-instances/map-widget-instance';
import {AjfTableWidgetInstance} from '../../interface/widgets-instances/table-widget-instance';
import {AjfTextWidgetInstance} from '../../interface/widgets-instances/text-widget-instance';
import {AjfWidgetInstance} from '../../interface/widgets-instances/widget-instance';
import {
  AjfWidgetWithContentInstance
} from '../../interface/widgets-instances/widget-with-content-instance';
import {AjfChartWidget} from '../../interface/widgets/chart-widget';
import {AjfFormulaWidget} from '../../interface/widgets/formula-widget';
import {AjfImageContainerWidget} from '../../interface/widgets/image-container-widget';
import {AjfImageWidget} from '../../interface/widgets/image-widget';
import {AjfMapWidget} from '../../interface/widgets/map-widget';
import {AjfTableWidget} from '../../interface/widgets/table-widget';
import {AjfTextWidget} from '../../interface/widgets/text-widget';
import {AjfWidget} from '../../interface/widgets/widget';
import {AjfWidgetType} from '../../interface/widgets/widget-type';
import {AjfWidgetWithContent} from '../../interface/widgets/widget-with-content';
import {evaluateAggregation} from '../aggregation/evaluate-aggregation';

import {createWidgetInstance} from './create-widget-instance';

export function widgetToWidgetInstance(
    widget: AjfWidget, context: AjfContext, ts: TranslateService): AjfWidgetInstance {
  const wi = createWidgetInstance(widget, context, ts);
  if (widget.widgetType === AjfWidgetType.Column || widget.widgetType === AjfWidgetType.Layout) {
    const wwc = widget as AjfWidgetWithContent;
    const wwci = wi as AjfWidgetWithContentInstance;
    wwci.content = wwc.content.map(c => widgetToWidgetInstance(c, context, ts));
  } else if (widget.widgetType === AjfWidgetType.Chart) {
    const cw = widget as AjfChartWidget;
    const cwi = wi as AjfChartWidgetInstance;
    const labels = cw.labels instanceof Array ? cw.labels : [cw.labels];
    const evLabels = labels.map(l => {
      let evf = evaluateExpression(l.formula, context);
      try {
        if (evf instanceof Array) {
          evf = evf.map(v => ts.instant(v));
        } else {
          evf = ts.instant(evf);
        }
      } catch (_e) {
      }
      return evf;
    });
    cwi.labels = cw.labels instanceof Array ? evLabels : evLabels[0];
    cwi.datasets = cw.dataset.map(d => {
      let ds: any = {
        ...d.options || {},
        data: evaluateAggregation(d.aggregation, d.formula, context),
      };
      if (d.chartType != null) {
        const ct = chartToChartJsType(d.chartType);
        ds = {...ds, chartType: ct, type: ct };
      }
      if (d.options != null) {
        ds = {...ds, options: d.options};
      }
      if (d.label != null) {
        ds = {...ds, label: d.label};
      }
      if (d.datalabels != null) {
        ds.datalabels = deepCopy(d.datalabels);
      }
      return ds;
    });
    cwi.data = {labels: cwi.labels, datasets: cwi.datasets};
  } else if (widget.widgetType === AjfWidgetType.Table) {
    const tw = widget as AjfTableWidget;
    const twi = wi as AjfTableWidgetInstance;
    const trFormula = (f: AjfFormula) => {
      let formula = f.formula;
      if (formula.substr(0, 1) === '"') {
        const ft = formula.slice(1, -1);
        if (ft.length > 0) {
          formula = `"${ts.instant(ft)}"`;
        }
      } else {
        formula = ts.instant(formula);
      }
      return evaluateExpression(formula, context);
    };
    twi.dataset = tw.dataset.map(row => row.map(cell => {
      return cell.formula instanceof Array ? cell.formula.map(f => trFormula(f as AjfFormula)) :
                                             trFormula(cell.formula!);
    }));
    twi.data = (tw.dataset ||
                []).map(row => row.map(cell => ({
                                         value: evaluateExpression(cell.formula.formula, context),
                                         style: {...tw.cellStyles, ...cell.style},
                                         rowspan: cell.rowspan,
                                         colspan: cell.colspan,
                                       })));
  } else if (widget.widgetType === AjfWidgetType.Image) {
    const iw = widget as AjfImageWidget;
    const iwi = wi as AjfImageWidgetInstance;
    if (iw.flag) {
      iwi.flag = evaluateExpression(iw.flag.formula, context);
    }
    if (iw.icon) {
      iwi.icon = evaluateExpression(iw.icon.formula, context);
    }
    if (iw.url) {
      iwi.url = evaluateExpression(iw.url.formula, context);
    }
  } else if (widget.widgetType === AjfWidgetType.ImageContainer) {
    const icw = widget as AjfImageContainerWidget;
    const icwi = wi as AjfImageContainerWidgetInstance;
    if (icw.flags) {
      const flags = icw.flags instanceof Array ? icw.flags : [icw.flags];
      icwi.flags = flags.map(f => evaluateExpression(f.formula, context));
    }
    if (icw.icons) {
      const icons = icw.icons instanceof Array ? icw.icons : [icw.icons];
      icwi.icons = icons.map(f => evaluateExpression(f.formula, context));
    }
    if (icw.urls) {
      const urls = icw.urls instanceof Array ? icw.urls : [icw.urls];
      icwi.urls = urls.map(f => evaluateExpression(f.formula, context));
    }
  } else if (widget.widgetType === AjfWidgetType.Text) {
    const tew = widget as AjfTextWidget;
    const tewi = wi as AjfTextWidgetInstance;
    const formulaRegEx: RegExp = /\[\[(.+?)\]\]/g;
    const matches: {idx: number, len: number, formula: AjfFormula}[] = [];
    let match: RegExpExecArray|null;
    let htmlText = tew.htmlText;
    while (match = formulaRegEx.exec(htmlText)) {
      const idx = match.index;
      const len = match[0].length;
      const formula = createFormula({formula: match[1]});
      matches.push({idx, len, formula});
      matches.reverse().forEach((m) => {
        let calcValue;
        try {
          calcValue = evaluateExpression(m.formula.formula, context);
        } catch (e) {
          calcValue = '';
        }
        htmlText = `${htmlText.substr(0, m.idx)}${calcValue}${htmlText.substr(m.idx + m.len)}`;
      });
    }
    tewi.htmlText = htmlText != null && htmlText.length > 0 ? ts.instant(htmlText) : htmlText;
  } else if (widget.widgetType === AjfWidgetType.Formula) {
    const fw = widget as AjfFormulaWidget;
    const fwi = wi as AjfFormulaWidgetInstance;
    fwi.formula = evaluateExpression(fw.formula.formula, context);
  } else if (widget.widgetType === AjfWidgetType.Map) {
    const mw = widget as AjfMapWidget;
    const mwi = wi as AjfMapWidgetInstance;
    mwi.coordinate = evaluateExpression(mw.coordinate.formula, context);
  }
  return wi;
}
