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

import {AjfValidationFn} from '../interface/validation-function';

import * as vfuncs from './validation-functions';

export class AjfExpressionUtils {
  // TODO what is it for
  static UTIL_FUNCTIONS = '';
  /**
   * It is a key-value dictionary, that mapping all Ajf validation functions.
   */
  static utils: {[name: string]: AjfValidationFn} = {
    digitCount: {fn: vfuncs.digitCount},
    decimalCount: {fn: vfuncs.decimalCount},
    isInt: {fn: vfuncs.isInt},
    notEmpty: {fn: vfuncs.notEmpty},
    valueInChoice: {fn: vfuncs.valueInChoice},
    scanGroupField: {fn: vfuncs.scanGroupField},
    sum: {fn: vfuncs.sum},
    dateOperations: {fn: vfuncs.dateOperations},
    round: {fn: vfuncs.round},
    extractArray: {fn: vfuncs.extractArray},
    extractSum: {fn: vfuncs.extractSum},
    extractArraySum: {fn: vfuncs.extractArraySum},
    drawThreshold: {fn: vfuncs.drawThreshold},
    extractDates: {fn: vfuncs.extractDates},
    lastProperty: {fn: vfuncs.lastProperty},
    sumLastProperties: {fn: vfuncs.sumLastProperties},
    calculateTrendProperty: {fn: vfuncs.calculateTrendProperty},
    calculateTrendByProperties: {fn: vfuncs.calculateTrendByProperties},
    calculateAvgProperty: {fn: vfuncs.calculateAvgProperty},
    calculateAvgPropertyArray: {fn: vfuncs.calculateAvgPropertyArray},
    alert: {fn: vfuncs.alert},
    formatNumber: {fn: vfuncs.formatNumber},
    formatDate: {fn: vfuncs.formatDate},
    isoMonth: {fn: vfuncs.isoMonth},
    getCoordinate: {fn: vfuncs.getCoordinate},
    Math: {fn: Math},
    parseInt: {fn: parseInt},
    parseFloat: {fn: parseFloat},
    parseDate: {fn: vfuncs.dateUtils.parse},
    Date: {fn: Date}
  };
}
