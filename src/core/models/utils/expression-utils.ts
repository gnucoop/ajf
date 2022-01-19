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

import {AjfContext} from '@ajf/core/common';
import * as dateFns from 'date-fns';
import {parseScript} from 'meriyah';
import * as numbroMod from 'numbro';
import {AjfTableCell} from '@ajf/core/table';

import {AjfValidationFn} from '../interface/validation-function';

let execContext: any = {};

const numbro = numbroMod.default || numbroMod;
export interface Form {
  [key: string]: string | number | null;
}

const MAX_REPS = 30;

export const getCodeIdentifiers = (
  source: string,
  includeDollarValue: boolean = false,
): string[] => {
  const identifiers = [] as string[];
  try {
    parseScript(source.toString(), {
      onToken: (token, start, end) => {
        if (token == 'Identifier') {
          const identifier = source.toString().substring(start, end);
          if (includeDollarValue || identifier !== '$value') {
            identifiers.push(identifier);
          }
        }
      },
    });
  } catch (e) {
    console.log(source);
    console.log(e);
  }
  return identifiers;
};

export const dateUtils = {
  addDays: dateFns.addDays,
  addMonths: dateFns.addMonths,
  addYears: dateFns.addYears,
  endOfISOWeek: dateFns.endOfISOWeek,
  format: dateFns.format,
  getDay: dateFns.getDay,
  parse: dateFns.parseISO,
  startOfMonth: dateFns.startOfMonth,
  startOfISOWeek: dateFns.startOfISOWeek,
  isBefore: dateFns.isBefore,
};

export class AjfExpressionUtils {
  // TODO what is it for
  static UTIL_FUNCTIONS = '';
  /**
   * It is a key-value dictionary, that mapping all Ajf validation functions.
   */
  static utils: {[name: string]: AjfValidationFn} = {
    digitCount: {fn: digitCount},
    decimalCount: {fn: decimalCount},
    isInt: {fn: isInt},
    notEmpty: {fn: notEmpty},
    valueInChoice: {fn: valueInChoice},
    scanGroupField: {fn: scanGroupField},
    sum: {fn: sum},
    dateOperations: {fn: dateOperations},
    round: {fn: round},
    extractArray: {fn: extractArray},
    extractSum: {fn: extractSum},
    extractArraySum: {fn: extractArraySum},
    drawThreshold: {fn: drawThreshold},
    extractDates: {fn: extractDates},
    lastProperty: {fn: lastProperty},
    sumLastProperties: {fn: sumLastProperties},
    calculateTrendProperty: {fn: calculateTrendProperty},
    calculateTrendByProperties: {fn: calculateTrendByProperties},
    calculateAvgProperty: {fn: calculateAvgProperty},
    calculateAvgPropertyArray: {fn: calculateAvgPropertyArray},
    alert: {fn: alert},
    formatNumber: {fn: formatNumber},
    formatDate: {fn: formatDate},
    isoMonth: {fn: isoMonth},
    getCoordinate: {fn: getCoordinate},
    Math: {fn: Math},
    parseInt: {fn: parseInt},
    parseFloat: {fn: parseFloat},
    parseDate: {fn: dateUtils.parse},
    Date: {fn: Date},
    plainArray: {fn: plainArray},
    COUNTFORMS: {fn: COUNTFORMS},
    COUNTFORMS_UNIQUE: {fn: COUNTFORMS_UNIQUE},
    SUM: {fn: SUM},
    MEAN: {fn: MEAN},
    PERCENT: {fn: PERCENT},
    LAST: {fn: LAST},
    MAX: {fn: MAX},
    MEDIAN: {fn: MEDIAN},
    MODE: {fn: MODE},
    ALL_VALUES_OF: {fn: ALL_VALUES_OF},
    REPEAT: {fn: REPEAT},
    EVALUATE: {fn: EVALUATE},
    buildDataset: {fn: buildDataset},
    FILTERBY: {fn: FILTERBY},
    ISBEFORE: {fn: ISBEFORE},
    ISAFTER: {fn: ISAFTER},
    ISWITHININTERVAL: {fn: ISWITHININTERVAL},
    APPLY: {fn: APPLY},
    TODAY: {fn: TODAY},
    GETAGE: {fn: GETAGE},
    FLATINSTANCES: {fn: FLATINSTANCES},
  };
}

export function evaluateExpression(
  expression: string,
  context?: AjfContext,
  forceFormula?: string,
): any {
  let formula = forceFormula || expression || '';
  if (formula === '') {
    return '';
  }
  if (formula === 'true') {
    return true;
  }
  if (formula === 'false') {
    return false;
  }
  if (context != null && context[formula] !== undefined) {
    return context[formula];
  }
  if (/^"[^"]*"$/.test(formula)) {
    return formula.replace(/^"+|"+$/g, '');
  }
  const identifiers = getCodeIdentifiers(formula, true);
  const ctx: any[] = [];
  identifiers.forEach((key: string) => {
    let val: any = null;
    if (context != null && context[key] !== undefined) {
      val = context[key];
    } else if (AjfExpressionUtils.utils[key] !== undefined) {
      const util = AjfExpressionUtils.utils[key];
      val = util.fn;
    }
    ctx.push(val);
  });
  identifiers.push('execContext');
  ctx.push(execContext);

  try {
    let f = new Function(...identifiers, `return ${formula}`);
    const res = f(...ctx);
    f = <any>null;
    return res;
  } catch (e) {
    return false;
  }
}
/**
 * It returns the count of digit inside x.
 */
export function digitCount(x: number): number {
  if (isNaN(x) || typeof x !== 'number') {
    return 0;
  }
  if (!isFinite(x)) {
    return Infinity;
  }
  return x.toString().replace(/[^0-9]/g, '').length;
}
/**
 * It is count the count of decimal digit inside s.
 */
export function decimalCount(x: string | number): number {
  if (typeof x === 'string') {
    x = parseFloat(x);
  }
  if (typeof x !== 'number' || isNaN(x)) {
    return 0;
  }
  const parts = x.toString().split('.');
  return parts.length > 1 ? parts[1].length : 0;
}
/**
 * It is true if x is an integer.
 */
export function isInt(x: string | number): boolean {
  if (typeof x === 'string') {
    return /^-?\d+$/.test(x);
  }
  if (typeof x === 'number') {
    return Math.round(x) === x;
  }
  return false;
}
/**
 * It is true if x is not empty.
 */
export function notEmpty(x: any): boolean {
  return typeof x !== 'undefined' && x !== null ? x.toString().length > 0 : false;
}
/**
 * It is true if array contains x or array is equal to x.
 */
export function valueInChoice(array: any[], x: any): boolean {
  return (array || []).indexOf(x) > -1 || array === x;
}
/**
 * It applies callback for reps times and accumulate the result in acc.
 */
export function scanGroupField(reps: number, acc: any, callback: any): any {
  for (let i = 0; i < reps; i++) {
    acc = callback(acc, i);
  }
  return acc;
}
/**
 * It returns the sum of the array values.
 */
export function sum(array: any[]): any {
  return array.reduce((a, b) => a + b, 0);
}
/**
 * It applies add/remove(operation) v (day/month/year)period to dstring and return new format date.
 */
// TODO check if deprecated instead refacotoring parameter type
// TODO (dString: string|null, period:'day'|'month'|'year',
// TODO operation: 'add/remove' = 'add', v:number)
export function dateOperations(dString: string, period: string, operation: string, v: any): string {
  const fmt = 'mm/dd/yyyy';
  let d = typeof dString !== 'undefined' ? dateUtils.parse(dString) : new Date();
  if (operation == 'remove') {
    v = -v;
  }
  let dateOp;
  switch (period) {
    case 'day':
      dateOp = dateUtils.addDays;
      break;
    case 'month':
      dateOp = dateUtils.addMonths;
      break;
    case 'year':
      dateOp = dateUtils.addYears;
      break;
    default:
      return '';
  }
  return dateUtils.format(dateOp(d, v), fmt);
}
/**
 * It rounds the num with the value of digits
 */
export function round(num: number | string, digits: number): number {
  digits = digits || 0;
  let f;
  if (typeof num !== 'number') {
    try {
      f = parseFloat(num);
    } catch (e) {}
  } else {
    f = num;
  }
  if (f == null || isNaN(f)) {
    f = 0;
  }
  const m = Math.pow(10, digits);
  return Math.round(f * m) / m;
}
/**
 * It extracts property from source.
 * for every element of source if property and property2 are defined return the sum
 * else if only property is defined return him.
 */
export function extractArray(source: any[], property: string, property2?: string): any[] {
  source = (source || []).slice(0);
  const l = source.length;
  const res: any[] = [];
  for (let i = 0; i < l; i++) {
    if (source[i][property] != null && property2 != null && source[i][property2] != null) {
      res.push(Number(source[i][property]) + Number(source[i][property2]));
    } else if (source[i][property] != null) {
      res.push(source[i][property]);
    }
  }
  return res;
}
/**
 * It returns the sum of all defined properties of each element of source.
 */
export function extractSum(source: any[], properties: string[]): number {
  let sumVal = 0;
  properties = (properties || []).slice(0);
  const l = properties.length;

  for (let i = 0; i < l; i++) {
    const array = extractArray(source, properties[i]);
    const leng = array.length;
    for (let j = 0; j < leng; j++) {
      if (!isNaN(Number(array[j]))) {
        sumVal += Number(array[j]);
      }
    }
  }
  return sumVal;
}
/**
 * It returns a number array that contains the sum of properties value inside the source.
 * extractArraySum([{a: 5}, {b: 1}, {a: 5, b: 1}], ['a', 'b']); =&gt; [6,6]
 */
export function extractArraySum(source: any[], properties: string[]): any[] {
  const arrays: any[] = [];
  properties = (properties || []).slice(0);

  for (let i = 0; i < properties.length; i++) {
    const array = extractArray(source, properties[i]);
    arrays.push(array);
  }

  const res: any[] = [];
  if (arrays.length > 0) {
    for (let weekI = 0; weekI < arrays[0].length; weekI++) {
      let sumVal = 0;
      for (let propI = 0; propI < properties.length; propI++) {
        sumVal = sumVal + Number(arrays[propI][weekI]);
      }
      res.push(sumVal);
    }
  }
  return res;
}
/**
 * Draw a threshold line on chart related to the property.
 */
export function drawThreshold(source: any[], property: string, threshold: any[]): any[] {
  source = (source || []).slice(0);
  threshold = threshold || [0];
  if (!(threshold instanceof Array)) {
    threshold = [threshold];
  }
  const l = source.length;
  const res: any[] = [];
  let count = 0;
  for (let i = 0; i < l; i++) {
    if (source[i][property] != null) {
      if (threshold.length > count) {
        res.push(threshold[count]);
      } else {
        res.push(threshold[0]);
      }
      count++;
    }
  }
  return res;
}
/**
 * Extract the dates of the source object with property != null
 */
export function extractDates(source: any[], property: string, fmt: string): string[] {
  source = (source || []).slice(0);
  const l = source.length;
  const res: any = [];
  let prefix = '';
  for (let i = 0; i < l; i++) {
    if (source[i][property] != null) {
      switch (fmt) {
        case 'WW':
        case 'ww':
          prefix = 'W';
          res.push(prefix + formatDate(source[i]['date_start'], fmt));
          break;
        case 'MM':
        case 'mm':
          prefix = 'M';
          res.push(prefix + isoMonth(source[i]['date_start'], fmt));
          break;
        default:
          prefix = '';
          res.push(prefix + formatDate(source[i]['date_start'], fmt));
      }
    }
  }
  return res;
}
/**
 * Extract the last property contains in source != null
 */
export function lastProperty(source: any, property: string): any {
  source = (source || []).slice(0);
  let l = source.length - 1;

  while (l >= 0 && source[l][property] == null) {
    l--;
    if (l < 0) {
      return '';
    }
  }
  return l >= 0 ? source[l][property] : '';
}
/**
 * It sum the LAst properties of source.
 */
export function sumLastProperties(source: any[], properties: string[]): number {
  source = (source || []).slice(0);
  let sumVal = 0;
  let val = 0;
  for (let i = 0; i < properties.length; i++) {
    val = Number(lastProperty(source, properties[i]));
    if (!isNaN(val)) {
      sumVal += val;
    }
  }
  return sumVal;
}
/**
 * Compute the trend of the property contained on the source.
 */
export function calculateTrendProperty(source: any[], property: string): string {
  source = (source || []).slice(0);
  let last = source.length - 1;
  while (source[last][property] == null) {
    if (last == 0) {
      break;
    }
    last--;
  }
  let lastLast = last - 1;
  if (last == 0) {
    lastLast = last;
  } else {
    while (source[lastLast][property] == null) {
      if (lastLast == 0) {
        lastLast = last;
        break;
      }
      lastLast--;
    }
  }

  const lastProp = source[last] ? source[last][property] || 0 : 0;
  const lastLastProp = source[lastLast] ? source[lastLast][property] || 0 : 0;

  if (lastProp == lastLastProp) {
    return '<p><i class="material-icons" style="color:blue">trending_flat</i></p>';
  } else if (lastProp > lastLastProp) {
    return '<p><i class="material-icons" style="color:green">trending_up</i></p>';
  } else {
    return '<p><i class="material-icons" style="color:red">trending_down</i></p>';
  }
}
/**
 * Compute the average value of the property contained on the source.
 */
export function calculateTrendByProperties(source: any[], properties: string[]): string {
  const arraysum = extractArraySum(source, properties);

  const lastProp = arraysum.length > 0 ? arraysum[arraysum.length - 1] || 0 : 0;
  const lastLastProp = arraysum.length > 1 ? arraysum[arraysum.length - 2] || 0 : lastProp;

  if (lastProp == lastLastProp) {
    return '<p><i class="material-icons" style="color:blue">trending_flat</i></p>';
  } else if (lastProp > lastLastProp) {
    return '<p><i class="material-icons" style="color:green">trending_up</i></p>';
  } else {
    return '<p><i class="material-icons" style="color:red">trending_down</i></p>';
  }
}
/**
 *
 */
export function calculateAvgProperty(
  source: any[],
  property: string,
  range: number,
  coefficient: number,
): number {
  source = (source || []).slice(0);

  coefficient = coefficient || 1;
  range = range || 12;

  let l = source.length;
  let res = 0;
  let counter = 0;
  let noZero = 0;

  if (l < range) {
    range = l;
  }

  while (range != 0) {
    if (source[l - 1][property] != null) {
      counter++;
      res += Number(source[l - 1][property]);

      if (source[l - 1][property] > 0) {
        noZero++;
      }
    }
    l--;
    range--;
  }

  if (coefficient == 0) {
    return noZero;
  } else {
    return round((res / counter) * coefficient, 2) || 0;
  }
}

export function calculateAvgPropertyArray(
  source: any[],
  properties: string[],
  range: number,
  coefficient: number,
): number[] {
  source = (source || []).slice(0);
  const resArr: any[] = [];

  if (properties && properties.length > 0) {
    let avg = 0;

    coefficient = coefficient || 1;
    range = range || 12;

    const sourceArr =
      properties.length > 1
        ? extractArraySum(source, properties)
        : extractArray(source, properties[0]);

    let l = sourceArr.length;

    for (let len = l; len > 0; len--) {
      let res = 0;
      let counter = 0;
      let noZero = 0;

      if (len < range) {
        range = len;
      }

      for (let r = 1; r <= range; r++) {
        let val = sourceArr[len - r];
        if (val != null) {
          counter++;
          res += Number(val);
          if (val > 0) {
            noZero++;
          }
        }
      }

      if (counter > 0) {
        if (coefficient == 0) {
          avg = noZero;
        } else {
          avg = (res / counter) * coefficient || 0;
        }
        resArr.push(round(avg, 2));
      }
    }
  }
  return resArr.reverse();
}

export function alert(source: any[], property: string, threshold: number): string {
  source = (source || []).slice(0);

  if (lastProperty(source, property) > threshold) {
    return '<p><i class="material-icons" style="color:red">warning</i></p>';
  } else {
    return '<p></p>';
  }
}

export function formatNumber(num: number, fmt?: string): string {
  fmt = fmt || '0,0[.]0';
  return numbro(num).format(fmt);
}

export function formatDate(date: Date | string, fmt?: string): string {
  fmt = fmt || 'mm-DD-yyyy';
  return dateUtils.format(typeof date === 'string' ? dateUtils.parse(date) : date, fmt);
}

export function isoMonth(date: Date, fmt?: string): string {
  fmt = fmt || 'mm';
  const du = dateUtils;
  return du.format(du.addDays(du.startOfISOWeek(date), 3), fmt);
}

export function getCoordinate(source: any, zoom?: number): [number, number, number] {
  zoom = zoom || 6;
  if (source == null) {
    return [51.505, -0.09, zoom];
  } else {
    return [source[0], source[1], zoom];
  }
}

/**
 * Calculates all the possible results that a field has taken
 */
export function ALL_VALUES_OF(forms: Form[], fieldName: string): string[] {
  forms = (forms || []).slice(0);
  const isInRepeatingSlide = fieldName.includes(`__`);
  if (isInRepeatingSlide) {
    const repeation: any[] = [];

    forms.forEach(f => {
      for (let i = 0; i <= MAX_REPS; i++) {
        const fieldRepetion = `${fieldName}${i}`;
        if (f[fieldRepetion] == null) {
          break;
        }
        repeation.push(f[fieldRepetion]);
      }
    });
    return [...new Set(repeation)];
  } else {
    return [...new Set(forms.map(f => `${f[fieldName]}`))];
  }
}

export function plainArray(params: any[]): any[] {
  let res: any[] = [];
  params.forEach(param => {
    param = Array.isArray(param) ? param : [param];
    res = [...res, ...param];
  });

  return res;
}

/**
 * Counts the collected forms. The form name must be specified. An optional condition can be added
 * to discriminate which forms to count in.
 */
export function COUNTFORMS(forms: Form[], expression: string = 'true'): number {
  forms = (forms || []).slice(0);
  if (expression === 'true') {
    return forms.length;
  }
  if (forms.length === 0) {
    return 0;
  }
  const isInRepeatingSlide = expression.includes(`__`);
  if (isInRepeatingSlide) {
    let count = 0;

    forms.forEach(f => {
      for (let i = 0; i <= MAX_REPS; i++) {
        if (Object.keys(f).filter(key => key.includes(`__${i}`)).length === 0) {
          break;
        }
        if ((evaluateExpression(expression.replace('__', `__${i}`)), f)) {
          count++;
        }
      }
    });

    return count;
  } else {
    return forms.filter(f => evaluateExpression(expression, f)).length;
  }
}

/**
 * Counts the amount of unique form values for a specific field. The form name must be specified. An
 * optional condition can be added to discriminate which forms to count in
 */
export function COUNTFORMS_UNIQUE(forms: Form[], fieldName: string, expression?: string): number {
  forms = (forms || []).slice(0);
  const values: string | number[] = [];

  if (expression != null) {
    forms = forms.filter(f => evaluateExpression(expression as string, f));
  }

  forms.forEach(f => {
    values.push(evaluateExpression(fieldName, f));
  });

  return Array.from(new Set(values)).length;
}

/**
 * Aggregates and sums the values of one or more. An optional condition can be added to discriminate
 * which forms to take for the sum.
 */
export function SUM(forms: Form[], expression: string, condition?: string): number {
  let acc = 0;
  forms = (forms || []).slice(0);

  if (expression == null) {
    return 0;
  }
  const expressionConditions = generateExpressionConditions(forms, expression, condition);
  expressionConditions.forEach(exp => {
    acc += +exp;
  });

  return acc;
}

function generateExpressionConditions(
  forms: Form[],
  expression: string,
  condition = 'true',
): number[] {
  const res: number[] = [];
  const conditionIsReps = condition?.includes('__');
  const expressionIsReps = expression.includes('__');
  forms.forEach(f => {
    if (conditionIsReps) {
      const repeatedFieldCondition = `${condition.split('__')[0]}__`;
      const keys = Object.keys(f).filter(frm => frm.includes(repeatedFieldCondition));
      keys.forEach(key => {
        const index = +key.split('__')[1];
        const rCondition = condition.replace(/__/g, `__${index}`);
        if (evaluateExpression(rCondition, f)) {
          const rExpression = expression.replace(/__/g, `__${index}`);
          res.push(evaluateExpression(rExpression, f));
        }
      });
    } else {
      if (expressionIsReps) {
        const repeatedFieldExpression = `${expression.split('__')[0]}__`;
        const evaluatedCondition = evaluateExpression(condition, f);
        if (evaluatedCondition) {
          const keys = Object.keys(f).filter(frm => frm.includes(repeatedFieldExpression));
          keys.forEach(key => {
            const index = +key.split('__')[1];
            const rExpression = expression.replace(/__/g, `__${index}`);
            res.push(evaluateExpression(rExpression, f));
          });
        }
      } else {
        const evaluatedCondition = evaluateExpression(condition, f);
        if (evaluatedCondition) {
          res.push(evaluateExpression(expression, f));
        }
      }
    }
  });
  return res;
}
/**
 * Calculates the mean of a simple or derived value. An optional condition can be added to
 * discriminate which forms to take for the sum.
 */
export function MEAN(forms: Form[], expression: string): string {
  forms = (forms || []).slice(0);
  const isInRepeatingSlide = expression.includes(`__`);
  expression = expression || '';
  let length = 0;
  let acc = 0;
  forms.forEach(f => {
    if (isInRepeatingSlide) {
      Object.keys(f)
        .filter(key => key.includes(expression))
        .forEach(rsVal => {
          acc += evaluateExpression(rsVal, f);
          length++;
        });
    } else {
      acc += evaluateExpression(expression, f);
      length++;
    }
  });
  return ROUND(acc / length);
}

/**
 * Calculates the % between two members.
 */
export function PERCENT(value1: number, value2: number): string {
  const res = (+value1 * 100) / +value2;
  return Number.isFinite(res) ? `${ROUND(res)}%` : 'infinite';
}

/**
 * Calculates the expression in the last form by date.
 */
export function LAST(forms: Form[], expression: string, date = 'date_end'): string {
  const isInRepeatingSlide = expression.includes(`__`);
  forms = (forms || []).slice(0).sort((a, b) => {
    const dateA = new Date(b[date] as string).getTime();
    const dateB = new Date(a[date] as string).getTime();
    return dateA - dateB;
  });
  if (forms.length > 0 && expression != null) {
    const lastForm = forms[forms.length - 1] || [];
    if (isInRepeatingSlide) {
      const res: (string | number)[] = [];
      Object.keys(lastForm)
        .filter(key => key.includes(expression))
        .forEach(rsField => {
          res.push(evaluateExpression(rsField, lastForm));
        });
      return res.toString();
    } else {
      return evaluateExpression(expression, lastForm);
    }
  }
  return '0';
}

/**
 * Calculates the max value of the field.
 */
export function MAX(forms: Form[], fieldName: string): number {
  forms = (forms || []).slice(0);
  const isInRepeatingSlide = fieldName.includes(`__`);
  let max = 0;
  forms.forEach(form => {
    if (isInRepeatingSlide) {
      Object.keys(form)
        .filter(key => key.includes(fieldName))
        .forEach(rsField => {
          if (
            form[rsField] != null &&
            !isNaN(form[rsField] as number) &&
            (form[rsField] as number) > max
          ) {
            max = form[rsField] as number;
          }
        });
    } else {
      if (
        form[fieldName] != null &&
        !isNaN(form[fieldName] as number) &&
        (form[fieldName] as number) > max
      ) {
        max = form[fieldName] as number;
      }
    }
  });
  return max;
}

/**
 * Calculates the median value of the field.
 */
export function MEDIAN(forms: Form[], fieldName: string): string {
  forms = (forms || []).slice(0);
  let numbers: number[] = [];
  const isInRepeatingSlide = fieldName.includes(`__`);
  if (isInRepeatingSlide) {
    forms.forEach(form => {
      Object.keys(form)
        .filter(key => key.includes(fieldName))
        .forEach(rsField => {
          if (form[rsField] != null && !isNaN(form[rsField] as number)) {
            numbers.push(form[rsField] as number);
          }
        });
    });
    numbers = numbers.sort((a, b) => a - b).filter((item, pos, self) => self.indexOf(item) == pos);
  } else {
    numbers = forms
      .filter(f => f[fieldName] != null && !isNaN(f[fieldName] as number))
      .map(f => f[fieldName] as number)
      .sort((a, b) => a - b)
      .filter((item, pos, self) => self.indexOf(item) == pos);
  }

  const res = Number.isInteger(numbers.length / 2)
    ? numbers[numbers.length / 2]
    : (numbers[+parseInt(`${numbers.length - 1 / 2}`) / 2] +
        numbers[+parseInt(`${numbers.length - 1 / 2}`) / 2 + 1]) /
      2;

  return ROUND(res);
}

/**
 * Calculates the mode value of the field.
 */
export function MODE(forms: Form[], fieldName: string): number[] {
  forms = (forms || []).slice(0);
  let maxCount = 0;
  const map: {[key: number]: number} = {};
  const isInRepeatingSlide = fieldName.includes(`__`);
  forms.forEach(f => {
    if (isInRepeatingSlide) {
      Object.keys(f)
        .filter(key => key.includes(fieldName))
        .forEach(rsField => {
          const value = f[rsField] as number;
          if (value != null) {
            map[value] = map[value] != null ? map[value] + 1 : 1;
          }
          if (map[value] > maxCount) {
            maxCount = map[value];
          }
        });
    } else {
      const value = f[fieldName] as number;
      if (value != null) {
        map[value] = map[value] != null ? map[value] + 1 : 1;
      }
      if (map[value] > maxCount) {
        maxCount = map[value];
      }
    }
  });
  return Object.keys(map)
    .filter(v => map[+v] === maxCount)
    .map(v => +v);
}

export function buildDataset(
  dataset: (string | number | string[] | number[])[],
  colspans: number[],
): AjfTableCell[][] {
  const res: AjfTableCell[][] = [];
  const normalizeDataset: any[][] = [];
  dataset.forEach((row: any, indexRow: number) => {
    row = Array.isArray(row) ? row : [row];
    normalizeDataset[indexRow % colspans.length] =
      normalizeDataset[indexRow % colspans.length] != null
        ? [...normalizeDataset[indexRow % colspans.length], ...row]
        : [...row];
  });
  const transpose = normalizeDataset[0].map((_: any, colIndex: number) =>
    normalizeDataset.map((row: any) => row[colIndex]),
  );
  transpose.forEach((data: any[], index: number) => {
    const row: AjfTableCell[] = [];
    data.forEach((cellValue: string | number, cellIndex: number) => {
      row.push({
        value: cellValue,
        colspan: colspans[cellIndex],
        rowspan: 1,
        style: {
          textAlign: 'center',
          color: 'black',
          backgroundColor: index % 2 === 0 ? 'white' : '#ddd',
        },
      });
    });
    res.push(row);
  });
  return res;
}

/**
 *
 * @param forms the form data
 * @param values all values of iteration
 * @param fn the fuction of expression-utils to apply at iteration
 * @param param1 first param of fn
 * @param param2 second param of fn
 * @returns the result of fn applied to all values param conditions
 * &current is an anchor key, The params with &current will be modified with the iteration values.
 */
export function REPEAT(
  forms: Form[],
  values: string[],
  fn: AjfValidationFn,
  param1: string,
  param2: string = 'true',
): any[] {
  const res: any[] = [];
  const newExp1 =
    param1 != null && param1.includes('current')
      ? (v: any) => param1.replace('current', `"${v}"`)
      : () => param1;
  const newExp2 =
    param2 != null && param2.includes('current')
      ? (v: any) => param2.replace('current', `"${v}"`)
      : () => param2;
  values.forEach(v => {
    const vv = (fn as any)(forms, newExp1(v), newExp2(v));
    res.push(vv);
  });
  return res;
}

export function APPLY(
  forms: Form[],
  fn: AjfValidationFn,
  param1: string,
  param2: string = 'true',
  param3: string = 'true',
): any[] {
  const res: any[] = [];
  const newExp1 = (v: any) => (v[param1] != null ? v[param1] : param1);
  const newExp2 = (v: any) => (v[param2] != null ? v[param2] : param2);
  const newExp3 = (v: any) => (v[param3] != null ? v[param3] : param3);

  forms.forEach(v => {
    const vv = (fn as any)(forms, newExp1(v), newExp2(v), newExp3(v));
    res.push(vv);
  });
  return res;
}

export function ROUND(value: number): string {
  if (Number.isNaN(value)) {
    return `${value}`;
  }
  const fixed = value % 1 === 0 ? 0 : 2;
  return parseFloat(`${value}`).toFixed(fixed);
}

export function EVALUATE(condition: string, branch1: any, branch2: any): any {
  if (evaluateExpression(condition)) {
    return branch1;
  } else {
    return branch2;
  }
}
export function FLATINSTANCES(forms: Form[], schema?: any): Form[] {
  const generateMetadata = (slideName: string, slideInstance: number) => {
    const res: {[sname: string]: number} = {};
    res[`${slideName}_rep`] = slideInstance;
    return res;
  };
  function cartesian(args: any[]): any[] {
    let r: any[] = [];
    const max = args.length - 1;
    function helper(arr: any[], i: number) {
      for (let j = 0, l = args[i].length; j < l; j++) {
        const a = arr.slice(0);
        a.push(args[i][j]);
        if (i == max) r.push(a);
        else helper([...a], i + 1);
      }
    }
    helper([], 0);
    return r;
  }
  forms = (forms || []).slice(0);
  let flatted: Form[] = [];
  if (schema != null) {
    const repeatingSlides: any[] = schema.nodes.filter((node: any) => node.nodeType === 4);
    const obj: {[fieldName: string]: string} = {};
    const instances: {[slideName: string]: any} = {};
    repeatingSlides.forEach(slide => {
      let nodeFields = slide.nodes.map((n: any) => n.name);
      nodeFields.forEach((nodeField: string) => {
        obj[nodeField] = slide.name;
      });
    });
    forms.forEach((f, formIdx) => {
      const noSlideFields: Form = {};
      const fKeys: string[] = Object.keys(f);
      fKeys.forEach(fkey => {
        const splittedKey = fkey.split('__');
        const fieldName = splittedKey[0];
        const slideInstance = splittedKey[1] != null ? +splittedKey[1] : null;
        if (slideInstance != null) {
          const slideName = obj[fieldName];
          instances[slideName] = instances[slideName] != null ? instances[slideName] : [];
          instances[slideName][slideInstance] =
            instances[slideName][slideInstance] != null
              ? instances[slideName][slideInstance]
              : generateMetadata(slideName, slideInstance);
          instances[slideName][slideInstance][fieldName] = f[fkey];
        } else {
          noSlideFields[fieldName] = f[fieldName];
        }
      });
      noSlideFields[`ajf_form_id`] = formIdx;
      Object.keys(instances).forEach(slide => {
        const instanceKeys = Object.keys(instances[slide]);
        noSlideFields[`${slide}_max_reps`] = instanceKeys.length;
        for (let i = 0; i < instanceKeys.length; i++) {
          instances[slide][instanceKeys[i]] = {
            ...instances[slide][instanceKeys[i]],
            ...noSlideFields,
          };
        }
      });
      const cartesianRes = cartesian(Object.keys(instances).map(i => instances[i])).map(
        (listArr: any[]) => listArr.reduce((acc, val) => [...acc, ...val], {}),
      );
      flatted = [...flatted, ...cartesianRes];
    });

    return flatted;
  } else {
    forms.forEach(f => {
      for (let i = 0; i <= MAX_REPS; i++) {
        const fKeys: string[] = Object.keys(f);
        const noRepeatingFields: string[] = fKeys.filter(fkey => fkey.indexOf('__') === -1);
        const onlyCurrentInstanceKeys: string[] = fKeys.filter(fkey => fkey.indexOf(`__${i}`) > -1);
        // se il numero di attributi coincide il form data non ha repeatingslides
        if (i === 0 && onlyCurrentInstanceKeys.length === 0) {
          flatted.push(f);
          break;
        }
        if (onlyCurrentInstanceKeys.length === 0) {
          break;
        }
        let res: Form = {};
        [...onlyCurrentInstanceKeys, ...noRepeatingFields].forEach(key => {
          const splittedKey = key.split('__');
          const fieldName = splittedKey[0];
          const slideInstance = splittedKey[1] != null ? +splittedKey[1] : null;
          res[fieldName] = f[key];
          res['rep'] = slideInstance != null ? slideInstance : res['rep'];
        });

        flatted.push(res);
      }
    });
    return flatted;
  }
}
export function FILTERBY(forms: Form[], expression: string): Form[] {
  forms = (forms || []).slice(0);
  let res: Form[] = [];
  if (expression === 'true') {
    return forms;
  }
  if (forms.length === 0) {
    return [];
  }
  const isInRepeatingSlide = expression.includes(`__`);
  if (isInRepeatingSlide) {
    forms.forEach(f => {
      for (let i = 0; i <= MAX_REPS; i++) {
        const fKeys = Object.keys(f);
        if (fKeys.filter(key => key.includes(`__${i}`)).length === 0) {
          break;
        }
        if ((evaluateExpression(expression.replace('__', `__${i}`)), f)) {
          const onlyCurrentInstanceKeys = fKeys.filter(
            fkey => fkey.indexOf('__') === -1 || fkey.indexOf(`__${1}`) > -1,
          );
          const instanceForm: Form = {};
          onlyCurrentInstanceKeys.forEach(k => {
            instanceForm[k] = f[k];
          });
          res.push(instanceForm);
        }
      }
    });
    return res;
  } else {
    const asd = forms.filter(f => {
      const cexpression = expression
        .split("'")
        .map(s => (f[s] != null ? f[s] : s))
        .join("'");
      return evaluateExpression(cexpression, f);
    });
    return asd;
  }
}

export function TODAY(format = 'yyyy-MM-dd'): string {
  return dateFns.format(new Date(), format);
}

export function GETAGE(dob: string): number {
  const date = new Date(dob);
  const age: number = dateFns.differenceInYears(new Date(), date);
  return age;
}

export function ISBEFORE(date: string, dateToCompare: string): boolean {
  const dateA: Date = dateFns.parseISO(date);
  const dateB: Date = dateFns.parseISO(dateToCompare);
  return dateFns.isBefore(dateA, dateB);
}

export function ISAFTER(date: string, dateToCompare: string): boolean {
  const dateA: Date = dateFns.parseISO(date);
  const dateB: Date = dateFns.parseISO(dateToCompare);
  return dateFns.isAfter(dateA, dateB);
}

export function ISWITHININTERVAL(date: string, dateStart: string, dateEnd: string): boolean {
  const dateToCompare: Date = dateFns.parseISO(date);
  const interval: Interval = {start: dateFns.parseISO(dateStart), end: dateFns.parseISO(dateEnd)};
  return dateFns.isWithinInterval(dateToCompare, interval);
}
