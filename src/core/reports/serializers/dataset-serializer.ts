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

import {AjfFormulaSerializer} from '@ajf/core/models';

import {AjfDataset} from '../interface/dataset/dataset';
import {createDataset} from '../utils/dataset/create-dataset';

import {AjfAggregationSerializer} from './aggregation-serializer';

export class AjfDatasetSerializer {
  static fromJson(json: Partial<AjfDataset>): AjfDataset {
    if (json.formula == null || json.aggregation == null || json.label == null) {
      throw new Error('Malformed dataset');
    }
    json.formula = json.formula instanceof Array ?
        json.formula = json.formula.map(f => AjfFormulaSerializer.fromJson(f)) :
        AjfFormulaSerializer.fromJson(json.formula);
    json.aggregation = AjfAggregationSerializer.fromJson(json.aggregation);
    return createDataset(json);
  }
}
