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

import {AjfConditionSerializer, AjfFormulaSerializer, alwaysCondition} from '@ajf/core/models';

import {AjfChartDataset} from '../interface/dataset/chart-dataset';
import {AjfTableDataset} from '../interface/dataset/table-dataset';
import {AjfChartWidget} from '../interface/widgets/chart-widget';
import {AjfDataWidget} from '../interface/widgets/data-widget';
import {AjfMapWidget} from '../interface/widgets/map-widget';
import {AjfWidget} from '../interface/widgets/widget';
import {AjfWidgetType} from '../interface/widgets/widget-type';
import {AjfWidgetWithContent} from '../interface/widgets/widget-with-content';
import {createWidget} from '../utils/widgets/create-widget';

import {AjfDatasetSerializer} from './dataset-serializer';

export class AjfWidgetSerializer {
  static fromJson(json: Partial<AjfWidget>): AjfWidget {
    if (json.widgetType == null) {
      throw new Error('Malformed widget');
    }
    json.visibility =
        json.visibility ? AjfConditionSerializer.fromJson(json.visibility) : alwaysCondition();
    json.styles = json.styles || {};
    const obj = json as AjfWidget;
    if (obj.widgetType === AjfWidgetType.Layout || obj.widgetType === AjfWidgetType.Column) {
      return AjfWidgetSerializer._widgetWithContentFromJson(obj);
    }
    if (obj.widgetType === AjfWidgetType.Chart || obj.widgetType === AjfWidgetType.Table) {
      const w = AjfWidgetSerializer._dataWidgetFromJson(obj);
      if (obj.widgetType === AjfWidgetType.Chart) {
        const cw = w as AjfChartWidget;
        if (cw.labels instanceof Array) {
          cw.labels.map(l => AjfFormulaSerializer.fromJson(l));
        } else if (cw.labels != null) {
          cw.labels = AjfFormulaSerializer.fromJson(cw.labels);
        }
      }
      return w;
    }
    if (obj.widgetType === AjfWidgetType.Map) {
      const mw = obj as AjfMapWidget;
      mw.coordinate = AjfFormulaSerializer.fromJson(mw.coordinate);
    }
    return obj;
  }

  private static _dataWidgetFromJson(json: AjfWidget&Partial<AjfDataWidget>): AjfDataWidget {
    const dataset = json.dataset ?
        (json.widgetType === AjfWidgetType.Table ?
             (json.dataset as AjfTableDataset[][])
                 .map(row => row.map(cell => AjfDatasetSerializer.fromJson(cell))) :
             (json.dataset as AjfChartDataset[]).map(d => AjfDatasetSerializer.fromJson(d))) :
        [];
    return {...createWidget(json), dataset};
  }

  private static _widgetWithContentFromJson(json: AjfWidget&
                                           Partial<AjfWidgetWithContent>): AjfWidgetWithContent {
    const content = (json.content || []).map(c => AjfWidgetSerializer.fromJson(c));
    return {...createWidget(json), content};
  }
}
