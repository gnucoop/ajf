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

import {AjfFormula, AjfJsonSerializable} from '@ajf/core/models';
import {deepCopy} from '@ajf/core/utils';


export enum AjfAggregationType {
  None,
  Sum,
  Average,
  WeightedAverage,
  LENGTH
}

/**
 * This class will define an ajf aggregator
 */
export class AjfAggregation extends AjfJsonSerializable {
  aggregation: AjfAggregationType;
  /**
   * this static method will load an AjfAggregator from json
   * @param obj : any - object aggregator
   * @return AjfFormula
   */
  static fromJson(obj: any): AjfAggregation {
    obj = deepCopy(obj);
    return new AjfAggregation(obj);
  }

  /**
   *
   * @param obj
   */
  constructor(obj?: any) {
    super();

    this.jsonExportedMembers = [ 'aggregation' ];

    this.aggregation = obj && obj.aggregation || AjfAggregationType.None;
  }

  evaluate(formulas: AjfFormula[], context: any): number[] {
    const data: any[] = formulas.map(f => f.evaluate(context));
    switch (this.aggregation) {
      case AjfAggregationType.None:
      if (data.length !== 1) {
        throw new Error('Invalid aggregation');
      }
      return data[0];
      case AjfAggregationType.Sum:
      return data.map((r: any) => r.reduce((s: any, d: any) => s + d, 0));
      case AjfAggregationType.Average:
      case AjfAggregationType.WeightedAverage:
      return data.map((r: any) => {
        const sum = r.reduce((s: any, d: any) => s + d, 0);
        return sum / data.length;
      });
      default:
      return [];
    }
  }
}
