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

import {deepCopy} from '@ajf/core/utils';
import {AjfFormula, AjfJsonSerializable} from '@ajf/core/models';
import {AjfAggregation, AjfAggregationType} from './aggregation';
import {AjfChartDatasetOptions, AjfChartType} from './charts';

/**
 * This class will define an ajf dataset
 */
export class AjfDataset extends AjfJsonSerializable {
  formula: AjfFormula | AjfFormula[];
  aggregation: AjfAggregation;
  label: string;

  /**
   * this static method will load an AjfDataset from json
   * @param obj : any - object formula
   * @return AjfFormula
   */

  static fromJson(obj: any): AjfDataset {
    return new AjfDataset(AjfDataset._parseJsonObject(obj));
  }

  protected static _parseJsonObject(obj: any): any {
    obj = deepCopy(obj);
    let keys: string[] = Object.keys(obj);

    if (keys.indexOf('formula') === -1) {
      throw new Error('dataset formula missing');
    }
    if (keys.indexOf('aggregation') === -1) {
      throw new Error('dataset aggregation missing');
    }
    if (keys.indexOf('label') === -1) {
      throw new Error('dataset label missing');
    }

    let formula: AjfFormula | AjfFormula[];
    if (obj.formula instanceof Array) {
      formula = (obj.formula as string[]).map(f => AjfFormula.fromJson(f));
    } else {
      formula =  AjfFormula.fromJson(obj.formula);
    }
    let aggregation: AjfAggregation = AjfAggregation.fromJson(obj.aggregation);

    obj.formula = formula;
    obj.aggregation = aggregation;

    return obj;
  }

  /**
   *
   * @param obj
   */
  constructor(obj?: any) {
    super();

    this.jsonExportedMembers =
      this.jsonExportedMembers.concat(['formula', 'aggregation', 'label']);

    this.formula     = obj && obj.formula     || null;
    this.aggregation = obj && obj.aggregation || AjfAggregationType.None;
    this.label       = obj && obj.label       || null;
  }

}

export class AjfTableDataset extends AjfDataset {
  formula: AjfFormula;
  colspan: number;
  rowspan: number;
  style: any;

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers =
      this.jsonExportedMembers.concat(['rowspan', 'colspan', 'style']);

    this.rowspan     = obj && obj.rowspan     || null;
    this.colspan     = obj && obj.colspan     || null;
    this.style       = obj && obj.style       || null;
  }

  static fromJson(obj: any): AjfTableDataset {
    return new AjfTableDataset(AjfDataset._parseJsonObject(obj));
  }
}


export class AjfChartDataset extends AjfDataset {
  formula: AjfFormula[];
  chartType?: AjfChartType;
  options?: AjfChartDatasetOptions;
  datalabels?: any;

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers =
      this.jsonExportedMembers.concat(['chartType', 'options']);

    if (obj.chartType != null) { this.chartType = obj.chartType; }
    if (obj.options != null) { this.options = obj.options; }
    if (obj.datalabels != null) { this.datalabels = obj.datalabels; }
  }

  static fromJson(obj: any): AjfChartDataset {
    return new AjfChartDataset(AjfDataset._parseJsonObject(obj));
  }
}
