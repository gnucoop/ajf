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

import {AjfContext, AjfFormula, createFormula, evaluateExpression} from '@ajf/core/models';
import {AjfTableCell} from '@ajf/core/table';
import {deepCopy} from '@ajf/core/utils';
import {TranslateService} from '@ngx-translate/core';

import {chartToChartJsType} from '../../chart-utils';
import {AjfTableDataset} from '../../interface/dataset/table-dataset';
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
import {AjfDynamicTableWidget} from '../../interface/widgets/dynamic-table-widget';
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
import {componentsMap} from '../widgets/widgets-map';

import {createWidgetInstance} from './create-widget-instance';
import {trFormula} from './widget-instance-utils';

export function widgetToWidgetInstance(
    widget: AjfWidget, context: AjfContext, ts: TranslateService): AjfWidgetInstance {
  const wi = createWidgetInstance(widget, context, ts);

  if (widget.widgetType === AjfWidgetType.Column || widget.widgetType === AjfWidgetType.Layout) {
    const wwc = widget as AjfWidgetWithContent;
    const wwci = wi as AjfWidgetWithContentInstance;
    let content = [] as AjfWidgetInstance[];
    wwc.content.forEach(c => {
      if (wwc.repetitions != null) {
        wwci.repetitions = evaluateExpression(wwc.repetitions.formula, context);
        if (typeof wwci.repetitions === 'number' && wwci.repetitions > 0) {
          for (let i = 0; i < wwci.repetitions; i++) {
            content.push(widgetToWidgetInstance(c, {...context, '$repetition': i}, ts));
          }
        }
      } else {
        content.push(widgetToWidgetInstance(c, context, ts));
      }
      wwci.content = content;
    });
  } else if (widget.widgetType === AjfWidgetType.Chart) {
    const cw = widget as AjfChartWidget;
    const cwi = wi as AjfChartWidgetInstance;
    const labels = cw.labels instanceof Array ? cw.labels : [cw.labels];
    const evLabels = labels.map(l => {
      let evf = evaluateExpression(l.formula, context);
      try {
        if (evf instanceof Array) {
          evf = evf.map(
              v => v != null && typeof v === 'string' && v.trim().length > 0 ? ts.instant(v) : v);
        } else {
          evf = evf != null && typeof evf === 'string' && evf.trim().length > 0 ? ts.instant(evf) :
                                                                                  evf;
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
        ds = {...ds, chartType: ct, type: ct};
      }
      if (d.options != null) {
        ds = {...ds, options: d.options};
      }
      if (d.label != null) {
        ds = {...ds, label: d.label.trim().length > 0 ? ts.instant(d.label) : d.label};
      }
      if (d.datalabels != null) {
        ds.datalabels = deepCopy(d.datalabels);
      }
      return ds;
    });
    cwi.data = {labels: cwi.labels, datasets: cwi.datasets};
    cwi.chartType = chartToChartJsType(cw.type || cw.chartType);
    cwi.exportable =
        cw.exportable && (cw.exportable === true || cw.exportable === 'true') ? true : false;
    if (cw.options != null && cw.options.plugins != null) {
      const plugins = cw.options.plugins;
      const pluginNames = Object.keys(plugins);
      pluginNames.forEach((pluginName) => {
        const plugin = plugins[pluginName];
        const pluginOptions = Object.keys(plugin);
        pluginOptions.forEach((pluginOptionName: string) => {
          const pluginOption = plugin[pluginOptionName];
          if (typeof pluginOption !== 'string' && pluginOption != null &&
              pluginOption.formula != null) {
            plugin[pluginOptionName] = evaluateExpression(pluginOption.formula, context);
          }
        });
      });
    }
  } else if (widget.widgetType === AjfWidgetType.Table) {
    const tw = widget as AjfTableWidget;
    const twi = wi as AjfTableWidgetInstance;

    twi.dataset = tw.dataset.map(row => row.map(cell => {
      return cell.formula instanceof Array ?
          cell.formula.map(f => trFormula(f as AjfFormula, context as AjfContext, ts)) :
          trFormula(cell.formula!, context as AjfContext, ts);
    }));

    twi.data = (tw.dataset || []).map(row => row.map(cell => {
      let evf = '';
      try {
        evf = cell.formula instanceof Array ?
            cell.formula.map(f => trFormula(f as AjfFormula, context as AjfContext, ts)) :
            trFormula(cell.formula!, context as AjfContext, ts);
      } catch (_e) {
      }
      return ({
        value: evf,
        style: {...tw.cellStyles, ...cell.style},
        rowspan: cell.rowspan,
        colspan: cell.colspan,
      });
    }));
  } else if (widget.widgetType === AjfWidgetType.DynamicTable) {
    const tdw = widget as AjfDynamicTableWidget;
    const tdwi = wi as AjfTableWidgetInstance;

    tdwi.dataset = tdw.dataset.map((cell: AjfTableDataset) => {
      return cell.formula instanceof Array ?
          cell.formula.map(f => trFormula(f as AjfFormula, context, ts)) :
          trFormula(cell.formula!, context, ts);
    });
    tdwi.exportable =
        tdw.exportable && (tdw.exportable === true || tdw.exportable === 'true') ? true : false;

    let dataset: AjfTableCell[][] = evaluateExpression(tdw.rowDefinition.formula, context) || [];
    dataset = (dataset || []).map((row: AjfTableCell[]) => row.map(cell => {
      let trf = cell.value;
      try {
        if (trf instanceof Array) {
          trf = trf.map(
              v => v != null && typeof v === 'string' && v.trim().length > 0 ? ts.instant(v) : v);
        } else {
          trf = trf != null && typeof trf === 'string' && trf.trim().length > 0 ? ts.instant(trf) :
                                                                                  trf;
        }
      } catch (_e) {
      }
      return ({...cell, value: trf});
    }));

    const header = (tdw.dataset || []).map(cell => {
      let evf = '';
      try {
        evf = cell.formula instanceof Array ?
            cell.formula.map(f => trFormula(f as AjfFormula, context as AjfContext, ts)) :
            trFormula(cell.formula!, context as AjfContext, ts);
      } catch (_e) {
      }
      return ({
        value: evf,
        style: {...tdw.cellStyles, ...cell.style},
        rowspan: cell.rowspan,
        colspan: cell.colspan,
      });
    });
    tdwi.data = [[...header], ...dataset];
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
      icwi.flags = icw.flags instanceof Array ?
          icw.flags.map(f => evaluateExpression(f.formula, context)) :
          evaluateExpression(icw.flags.formula, context);
    }
    if (icw.icons) {
      icwi.icons = icw.icons instanceof Array ?
          icw.icons.map(f => evaluateExpression(f.formula, context)) :
          evaluateExpression(icw.icons.formula, context);
    }
    if (icw.urls) {
      icwi.urls = icw.urls instanceof Array ?
          icw.urls.map(f => evaluateExpression(f.formula, context)) :
          evaluateExpression(icw.urls.formula, context);
    }
  } else if (widget.widgetType === AjfWidgetType.Text) {
    const tew = widget as AjfTextWidget;
    const tewi = wi as AjfTextWidgetInstance;
    const formulaRegEx: RegExp = /\[{2}(.+?)\]{2}/g;
    const matches: {idx: number, len: number, formula: AjfFormula}[] = [];
    let match: RegExpExecArray|null;
    let htmlText = tew.htmlText;
    while (match = formulaRegEx.exec(htmlText)) {
      const idx = match.index;
      const len = match[0].length;
      const formula = createFormula({formula: match[1]});
      matches.push({idx, len, formula});
    }
    matches.reverse().forEach((m) => {
      let calcValue;
      try {
        calcValue = evaluateExpression(m.formula.formula, context);
      } catch (e) {
        calcValue = '';
      }
      htmlText = `${htmlText.substr(0, m.idx)}${calcValue}${htmlText.substr(m.idx + m.len)}`;
    });
    tewi.htmlText = htmlText != null && htmlText.length > 0 ? ts.instant(htmlText) : htmlText;
  } else if (widget.widgetType === AjfWidgetType.Formula) {
    const fw = widget as AjfFormulaWidget;
    const fwi = wi as AjfFormulaWidgetInstance;
    fwi.formula = evaluateExpression(fw.formula.formula, context);
  } else if (widget.widgetType === AjfWidgetType.Map) {
    const mw = widget as AjfMapWidget;
    const mwi = wi as AjfMapWidgetInstance;
    mwi.coordinate = evaluateExpression(mw.coordinate.formula, context);
  } else if (widget.widgetType > 100) {
    const iiFn = componentsMap[widget.widgetType] != null ?
        componentsMap[widget.widgetType].initInstance :
        null;
    if (iiFn != null) {
      return iiFn(wi, context, ts);
    }
  }
  return wi;
}
