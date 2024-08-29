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

import {AjfContext, evaluateExpression} from '@ajf/core/models';
import {AjfTableCell} from '@ajf/core/table';
import {TranslocoService} from '@ajf/core/transloco';
import {deepCopy} from '@ajf/core/utils';

import {chartToChartJsType} from '../../chart-utils';
import {AjfTableDataset} from '../../interface/dataset/table-dataset';
import {AjfReportVariable} from '../../interface/reports/report-variable';
import {AjfWidgetInstance} from '../../interface/widgets-instances/widget-instance';
import {AjfWidget} from '../../interface/widgets/widget';
import {evaluateAggregation} from '../aggregation/evaluate-aggregation';
import {isChartWidget} from '../widgets/is-chart-widget';
import {isDialogWidget} from '../widgets/is-dialog-widget';
import {isDynamicTableWidget} from '../widgets/is-dynamic-table-widget';
import {isFormulaWidget} from '../widgets/is-formula-widget';
import {isGraphWidget} from '../widgets/is-graph-widget';
import {isHeatMapWidget} from '../widgets/is-heat-map-widget';
import {isImageContainerWidget} from '../widgets/is-image-container-widget';
import {isImageWidget} from '../widgets/is-image-widget';
import {isMapWidget} from '../widgets/is-map-widget';
import {isPaginatedListWidget} from '../widgets/is-paginated-list-widget';
import {isPaginatedTableWidget} from '../widgets/is-paginated-table-widget';
import {isWidgetWithContent} from '../widgets/is-widget-with-content';
import {isTableWidget} from '../widgets/is-table-widget';
import {isTextWidget} from '../widgets/is-text-widget';
import {componentsMap} from '../widgets/widgets-map';
import {isChartWidgetInstance} from '../widgets-instances/is-chart-widget-instance';
import {isDialogWidgetInstance} from '../widgets-instances/is-dialog-widget-instance';
import {isDynamicTableWidgetInstance} from '../widgets-instances/is-dynamic-table-widget-instance';
import {isFormulaWidgetInstance} from '../widgets-instances/is-formula-widget-instance';
import {isGraphWidgetInstance} from '../widgets-instances/is-graph-widget-instance';
import {isHeatMapWidgetInstance} from '../widgets-instances/is-heat-map-widget-instance';
import {isImageContainerWidgetInstance} from '../widgets-instances/is-image-container-widget-instance';
import {isImageWidgetInstance} from '../widgets-instances/is-image-widget-instance';
import {isMapWidgetInstance} from '../widgets-instances/is-map-widget-instance';
import {isPaginatedListWidgetInstance} from '../widgets-instances/is-paginated-list-widget-instance';
import {isPaginatedTableWidgetInstance} from './is-paginated-table-widget-instance';
import {isTableWidgetInstance} from '../widgets-instances/is-table-widget-instance';
import {isTextWidgetInstance} from '../widgets-instances/is-text-widget-instance';
import {isWidgetWithContentInstance} from '../widgets-instances/is-widget-with-content-instance';

import {createWidgetInstance} from './create-widget-instance';
import {evaluateProperty, trFormula} from './widget-instance-utils';
import {AjfGraphNode} from '@ajf/core/graph';

export function widgetToWidgetInstance(
  widget: AjfWidget,
  context: AjfContext,
  ts: TranslocoService,
  variables: AjfReportVariable[] = [],
): AjfWidgetInstance {
  const wi = createWidgetInstance(widget, context, ts, variables);

  if (isWidgetWithContent(widget) && isWidgetWithContentInstance(wi)) {
    let content: AjfWidgetInstance[] = [];
    widget.content.forEach(c => {
      if (widget.repetitions != null) {
        wi.repetitions = evaluateExpression(widget.repetitions.formula, context);
        if (typeof wi.repetitions === 'number' && wi.repetitions > 0) {
          for (let i = 0; i < wi.repetitions; i++) {
            content.push(widgetToWidgetInstance(c, {...context, '$repetition': i}, ts, variables));
          }
        }
      } else {
        content.push(widgetToWidgetInstance(c, context, ts, variables));
      }
      wi.content = content;
    });
    if (isDialogWidget(widget) && isDialogWidgetInstance(wi)) {
      wi.toggle = widgetToWidgetInstance(widget.toggle, context, ts, variables);
    }
  } else if (isChartWidget(widget) && isChartWidgetInstance(wi)) {
    if (widget.options == null) {
      widget.options = {};
    }
    const labels = widget.labels instanceof Array ? widget.labels : [widget.labels];
    const evLabels = labels.map(l => {
      let evf = evaluateExpression(l.formula, context);
      try {
        if (evf instanceof Array) {
          evf = evf.map(v =>
            v != null && typeof v === 'string' && v.trim().length > 0 ? ts.translate(v) : v,
          );
        } else {
          evf =
            evf != null && typeof evf === 'string' && evf.trim().length > 0
              ? ts.translate(evf)
              : evf;
        }
      } catch (_e) {}
      return evf;
    });
    wi.labels = widget.labels instanceof Array ? evLabels : evLabels[0];
    wi.datasets = widget.dataset.map(d => {
      let ds: any = {
        ...(d.options || {}),
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
        ds = {...ds, label: d.label.trim().length > 0 ? ts.translate(d.label) : d.label};
      }
      if (d.datalabels != null) {
        ds.datalabels = deepCopy(d.datalabels);
      }
      return ds;
    });
    wi.data = {labels: wi.labels, datasets: wi.datasets};
    wi.chartType = chartToChartJsType(widget.type || widget.chartType);
    wi.exportable =
      widget.exportable && (widget.exportable === true || widget.exportable === 'true')
        ? true
        : false;
    wi.mainDataNumberThreshold = widget.mainDataNumberThreshold;
    wi.removeZeroValues = widget.removeZeroValues;

    if (widget.options != null && widget.options.plugins != null) {
      const plugins = widget.options.plugins;
      const pluginNames = Object.keys(plugins);
      pluginNames.forEach(pluginName => {
        const plugin = plugins[pluginName];
        const pluginOptions = Object.keys(plugin);
        pluginOptions.forEach((pluginOptionName: string) => {
          const pluginOption = plugin[pluginOptionName];
          if (
            typeof pluginOption !== 'string' &&
            pluginOption != null &&
            pluginOption.formula != null
          ) {
            plugin[pluginOptionName] = evaluateExpression(pluginOption.formula, context);
          }
        });
      });
    }
  } else if (isTableWidget(widget) && isTableWidgetInstance(wi)) {
    wi.dataset = widget.dataset.map(row =>
      row.map(cell => {
        return cell.formula instanceof Array
          ? cell.formula.map(f => trFormula(f, context, ts))
          : trFormula(cell.formula!, context, ts);
      }),
    );
    wi.exportable =
      widget.exportable && (widget.exportable === true || widget.exportable === 'true')
        ? true
        : false;
    wi.data = (widget.dataset || []).map(row =>
      row.map(cell => {
        let evf = '';
        try {
          evf =
            cell.formula instanceof Array
              ? cell.formula.map(f => trFormula(f, context, ts))
              : trFormula(cell.formula!, context, ts);
        } catch (_e) {}
        return {
          value: evf,
          style: {...widget.cellStyles, ...cell.style},
          rowspan: cell.rowspan,
          colspan: cell.colspan,
          sorted: cell.sorted ?? false,
        };
      }),
    );
  } else if (
    (isDynamicTableWidget(widget) && isDynamicTableWidgetInstance(wi)) ||
    (isPaginatedTableWidget(widget) && isPaginatedTableWidgetInstance(wi))
  ) {
    wi.dataset = widget.dataset.map((cell: AjfTableDataset) => {
      return cell.formula instanceof Array
        ? cell.formula.map(f => trFormula(f, context, ts))
        : trFormula(cell.formula!, context, ts);
    });
    wi.exportable =
      widget.exportable && (widget.exportable === true || widget.exportable === 'true')
        ? true
        : false;

    let dataset: AjfTableCell[][] = evaluateExpression(widget.rowDefinition.formula, context) || [];
    dataset = (dataset || []).map((row: AjfTableCell[]) =>
      row.map(cell => {
        let trf = cell.value;
        try {
          if (trf instanceof Array) {
            trf = trf.map(v =>
              v != null && typeof v === 'string' && v.trim().length > 0 ? ts.translate(v) : v,
            );
          } else {
            trf =
              trf != null && typeof trf === 'string' && trf.trim().length > 0
                ? ts.translate(trf)
                : trf;
          }
        } catch (_e) {}
        return {...cell, value: trf};
      }),
    );

    const header = (widget.dataset || []).map(cell => {
      let evf = '';
      try {
        evf =
          cell.formula instanceof Array
            ? cell.formula.map(f => trFormula(f, context, ts))
            : trFormula(cell.formula, context, ts);
      } catch (_e) {}
      return {
        value: evf,
        style: {...widget.cellStyles, ...cell.style},
        rowspan: cell.rowspan,
        colspan: cell.colspan,
        sorted: cell.sorted ?? false,
      };
    });
    wi.data = header.length === 0 ? [...dataset] : [[...header], ...dataset];
    wi.styles = {...wi.styles, alignItems: 'flex-start'};
  } else if (isPaginatedListWidget(widget) && isPaginatedListWidgetInstance(wi)) {
    let content: AjfWidgetInstance[] = [];
    if (widget.contentDefinition) {
      let contentDefinition: AjfWidget[] =
        evaluateExpression(widget.contentDefinition.formula, context) || [];
      contentDefinition.forEach(c => {
        content.push(widgetToWidgetInstance(c, context, ts, variables));
      });
    } else if (widget.content) {
      widget.content.forEach(c => {
        content.push(widgetToWidgetInstance(c, context, ts, variables));
      });
    }
    wi.content = content;
  } else if (isImageWidget(widget) && isImageWidgetInstance(wi)) {
    if (widget.flag) {
      wi.flag = evaluateExpression(widget.flag.formula, context);
    }
    if (widget.icon) {
      wi.icon = evaluateExpression(widget.icon.formula, context);
    }
    if (widget.url) {
      wi.url = evaluateExpression(widget.url.formula, context);
    }
  } else if (isImageContainerWidget(widget) && isImageContainerWidgetInstance(wi)) {
    if (widget.flags) {
      wi.flags =
        widget.flags instanceof Array
          ? widget.flags.map(f => evaluateExpression(f.formula, context))
          : evaluateExpression(widget.flags.formula, context);
    }
    if (widget.icons) {
      wi.icons =
        widget.icons instanceof Array
          ? widget.icons.map(f => evaluateExpression(f.formula, context))
          : evaluateExpression(widget.icons.formula, context);
    }
    if (widget.urls) {
      wi.urls =
        widget.urls instanceof Array
          ? widget.urls.map(f => evaluateExpression(f.formula, context))
          : evaluateExpression(widget.urls.formula, context);
    }
  } else if (isTextWidget(widget) && isTextWidgetInstance(wi)) {
    wi.htmlText = evaluateProperty(widget.htmlText, context, ts);
  } else if (isFormulaWidget(widget) && isFormulaWidgetInstance(wi)) {
    wi.formula = evaluateExpression(widget.formula.formula, context);
  } else if (isMapWidget(widget) && isMapWidgetInstance(wi)) {
    wi.coordinate = evaluateExpression(widget.coordinate.formula, context);
  } else if (isGraphWidget(widget) && isGraphWidgetInstance(wi)) {
    if (widget.nodes != null) {
      wi.nodes = widget.nodes.map(ds => {
        let node: any = {
          ...ds,
        };
        node.label = ds.label != null ? evaluateProperty(ds.label, context, ts) : ds.id;
        node.red = evaluateExpression(ds.red, context);
        node.yellow = evaluateExpression(ds.yellow, context);
        node.green = evaluateExpression(ds.green, context);
        node.color = ds.color ? evaluateExpression(ds.color, context) : undefined;
        return node as AjfGraphNode;
      });
    }
  } else if (isHeatMapWidget(widget) && isHeatMapWidgetInstance(wi)) {
    wi.idProp = widget.idProp || 'id';
    wi.features = (typeof widget.features === 'string'
      ? JSON.parse(widget.features)
      : widget.features) || {type: 'FeatureCollection', features: []};
    wi.values = evaluateExpression(widget.values.formula, context);
    wi.startColor = widget.startColor || '#ffeb3b';
    wi.endColor = widget.endColor || '#f44336';
    wi.highlightColor = widget.highlightColor || '#009688';
    wi.showVisualMap = widget.showVisualMap === true;
    if (widget.action) {
      wi.action = widget.action;
    }
  } else if (widget.widgetType > 100) {
    const iiFn =
      componentsMap[widget.widgetType] != null
        ? componentsMap[widget.widgetType].initInstance
        : null;
    if (iiFn != null) {
      return iiFn(wi, context, ts);
    }
  }
  return wi;
}
