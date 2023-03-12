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
export interface Instances {
  [instance: string]: Form[];
}
export interface MainForm {
  [key: string]: string | number | boolean | null | Instances | undefined | null;
  reps?: Instances;
}

function allReps(form: MainForm): Form[] {
  if (form.reps == null) {
    return [];
  }
  const reps: Form[] = [];
  for (const key in form.reps) {
    const r = form.reps[key];
    reps.push(...r);
  }
  return reps;
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
  return identifiers.sort((i1, i2) => i2.localeCompare(i1));
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
    COUNT_FORMS: {fn: COUNT_FORMS},
    COUNT_FORMS_UNIQUE: {fn: COUNT_FORMS_UNIQUE},
    COUNT_REPS: {fn: COUNT_REPS},
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
    INCLUDES: {fn: INCLUDES},
    buildDataset: {fn: buildDataset},
    buildAlignedDataset: {fn: buildAlignedDataset},
    buildFormDataset: {fn: buildFormDataset},
    buildAlignedFormDataset: {fn: buildAlignedFormDataset},
    buildWidgetDataset: {fn: buildWidgetDataset},
    buildWidgetDatasetWithDialog: {fn: buildWidgetDatasetWithDialog},
    FILTER_BY_VARS: {fn: FILTER_BY_VARS},
    FILTER_BY: {fn: FILTER_BY},
    IS_BEFORE: {fn: IS_BEFORE},
    IS_AFTER: {fn: IS_AFTER},
    IS_WITHIN_INTERVAL: {fn: IS_WITHIN_INTERVAL},
    COMPARE_DATE: {fn: COMPARE_DATE},
    APPLY: {fn: APPLY},
    TODAY: {fn: TODAY},
    GET_AGE: {fn: GET_AGE},
    BUILD_DATASET: {fn: BUILD_DATASET},
    JOIN_FORMS: {fn: JOIN_FORMS},
    LEN: {fn: LEN},
    CONCAT: {fn: CONCAT},
    REMOVE_DUPLICATES: {fn: REMOVE_DUPLICATES},
    JOIN_REPEATING_SLIDES: {fn: JOIN_REPEATING_SLIDES},
    FROM_REPS: {fn: FROM_REPS},
    ISIN: {fn: ISIN},
    OP: {fn: OP},
    GET_LABELS: {fn: GET_LABELS},
    APPLY_LABELS: {fn: APPLY_LABELS},
    ROUND: {fn: ROUND},
    CONSOLE_LOG: {fn: CONSOLE_LOG},
  };
}

/**
 * UTILITY FUNCION
 * This function provide a deep copy builder of array of main forms.
 * That's a custom function related to mainforms that can be able to increase copy performance.
 *
 * @param {MainForm[]} forms
 * @return {*}  {MainForm[]}
 */
function cloneMainForms(forms: MainForm[]): MainForm[] {
  let res: MainForm[] = [];
  for (const form of forms) {
    if (form == null) {
      res.push(form);
      continue;
    }
    let reps: Instances = {};
    if (form.reps != null) {
      for (const key in form.reps) {
        reps[key] = [...form.reps[key]];
      }
    }
    res.push({...form, reps});
  }
  return res;
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
 * Fixed decimals for floating number
 * Resolve float sum problems like this: 0.1 + 0.2 = 0.30000000000000004
 * @param num
 * @returns
 */
function truncate10(num: number) {
  return parseFloat(num.toFixed(10));
}

/**
 * It rounds the num with the value of digits
 */
export function round(num: number | string, digits?: number): number {
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
  source = (source || []).filter((f: any) => f != null);
  const res: any[] = [];
  for (const s of source) {
    if (s[property] != null && property2 != null && s[property2] != null) {
      res.push(Number(s[property]) + Number(s[property2]));
    } else if (s[property] != null) {
      res.push(s[property]);
    }
  }
  return res;
}
/**
 * It returns the sum of all defined properties of each element of source.
 */
export function extractSum(source: any[], properties: string[]): number {
  properties = [...(properties || [])];

  let sumVal = 0;
  for (const prop of properties) {
    const array = extractArray(source, prop);
    for (const a of array) {
      if (!isNaN(Number(a))) {
        sumVal += Number(a);
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
  properties = [...(properties || [])];

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
  source = (source || []).filter((f: any) => f != null);
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
  source = (source || []).filter((f: any) => f != null);
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
  source = (source || []).filter((f: any) => f != null);
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
  source = (source || []).filter((f: any) => f != null);
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
  source = (source || []).filter((f: any) => f != null);
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
  source = (source || []).filter((f: any) => f != null);

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
  source = (source || []).filter((f: any) => f != null);
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
  source = [...(source || [])];

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
 * Returns an array containing all the values that the specified field takes in the forms.
 * The values are converted to strings.
 */
export function ALL_VALUES_OF(
  this: AjfContext|void,
  forms: MainForm[],
  field: string,
  expression: string = 'true'
): string[] {
  const varsContext = this || {};
  forms = (forms || []).filter(f => f != null);
  let values: string[] = [];
  for (const form of forms) {
    if (form[field] != null && evaluateExpression(expression, {...varsContext, ...form})) {
      values.push(String(form[field]));
    }
    for (const rep of allReps(form)) {
      if (rep[field] != null && evaluateExpression(expression, {...varsContext, ...form, ...rep})) {
        values.push(String(rep[field]));
      }
    }
  }
  return [...new Set(values)];
}

export function plainArray(params: any[]): any[] {
  const res: any[] = [];
  for (const param of params) {
    if (Array.isArray(param)) {
      res.push(...param);
    } else {
      res.push(param);
    }
  }
  return res;
}
/**
 * Returns the number of forms for which filterExpression evaluates to true,
 * for the form itself or for any of its repetitions.
 */
export function COUNT_FORMS(this: AjfContext|void, forms: MainForm[], expression: string = 'true'): number {
  const varsContext = this || {};
  forms = (forms || []).filter(f => f != null);
  if (expression === 'true') {
    return forms.length;
  }
  let count = 0;
  for (const form of forms) {
    if (evaluateExpression(expression, {...varsContext, ...form})) {
      count++;
      continue;
    }
    for (const rep of allReps(form)) {
      if (evaluateExpression(expression, {...varsContext, ...form, ...rep})) {
        count++;
        break;
      }
    }
  }
  return count;
}
/**
 * Counts the forms and all of their repetitions for which the expression evaluates to true.
 */
export function COUNT_REPS(this: AjfContext|void, forms: MainForm[], expression: string = 'true'): number {
  const varsContext = this || {};
  forms = (forms || []).filter(f => f != null);
  let count = 0;
  for (const form of forms) {
    if (evaluateExpression(expression, {...varsContext, ...form})) {
      count++;
    }
    for (const rep of allReps(form)) {
      if (evaluateExpression(expression, {...varsContext, ...form, ...rep})) {
        count++;
      }
    }
  }
  return count;
}

/**
 * Deprecated. Use LEN(ALL_VALUES_OF)
 */
export function COUNT_FORMS_UNIQUE(
  this: AjfContext,
  forms: MainForm[],
  field: string,
  expression: string = 'true',
): number {
  return ALL_VALUES_OF.call(this, forms, field, expression).length;
}

function getNumericValues(
  varsContext: AjfContext|void,
  forms: (MainForm | Form)[],
  field: string, expression = 'true'
): number[] {
  varsContext = varsContext || {};
  forms = (forms || []).filter(f => f != null);
  let values: number[] = [];
  for (const form of forms) {
    const val = form[field];
    if (val != null && !isNaN(Number(val)) && evaluateExpression(expression, {...varsContext, ...form})) {
      values.push(Number(val));
    }
    for (const rep of allReps(form)) {
      const val = rep[field];
      if (val != null && !isNaN(Number(val)) && evaluateExpression(expression, {...varsContext, ...form, ...rep})) {
        values.push(Number(val));
      }
    }
  }
  return values;
}

/**
 * Aggregates and sums the values of the specified field.
 * An optional expression can be added to filter which forms to take for the sum.
 */
export function SUM(this: AjfContext|void, forms: (MainForm | Form)[], field: string, expression = 'true'): number {
  const values = getNumericValues(this, forms, field, expression);
  let sum = 0;
  for (const val of values) {
    sum += val;
  }
  return truncate10(sum);
}

/**
 * Computes the mean of the values of the specified field.
 * An optional expression can be added to filter which forms to take for the sum.
 */
export function MEAN(this: AjfContext|void, forms: (Form | MainForm)[], field: string, expression = 'true'): number {
  const values = getNumericValues(this, forms, field, expression);
  let sum = 0;
  for (const val of values) {
    sum += val;
  }
  return truncate10(sum / values.length);
}

/**
 * Calculates the % between two members.
 */
export function PERCENT(value1: number, value2: number): string {
  const res = (+value1 * 100) / +value2;
  return Number.isFinite(res) ? Math.round(res)+'%' : 'infinite';
}

/**
 * Evaluates the expression in the last form by date.
 */
export function LAST(this: AjfContext|void, forms: (Form | MainForm)[], expression: string, date = 'created_at'): any {
  const varsContext = this || {};
  forms = (forms || []).filter(f => f != null).sort((a, b) => {
    const dateA = new Date(b[date] as string).getTime();
    const dateB = new Date(a[date] as string).getTime();
    return dateA - dateB;
  });
  if (forms.length === 0 || expression == null) {
    return undefined;
  }
  return evaluateExpression(expression, {...varsContext, ...forms[forms.length - 1]});
}

/**
 * Computes the max value of the field.
 */
export function MAX(this: AjfContext|void, forms: (Form | MainForm)[], field: string, expression = 'true'): number {
  const values = getNumericValues(this, forms, field, expression);
  let max = -Infinity;
  for (const val of values) {
    if (val > max) {
      max = val;
    }
  }
  return max;
}

/**
 * Computes the median value of the field.
 */
export function MEDIAN(this: AjfContext|void, forms: (Form | MainForm)[], field: string, expression = 'true'): number {
  const values = getNumericValues(this, forms, field, expression).sort();
  if (values.length === 0) {
    return NaN;
  }
  return values[Math.floor(values.length / 2)];
}

/**
 * Computes the mode value of the field.
 */
export function MODE(this: AjfContext|void, forms: (Form | MainForm)[], field: string, expression = 'true'): number {
  const values = getNumericValues(this, forms, field, expression);
  const counters: {[val: number]: number} = {};
  for (const val of values) {
    if (counters[val] == null) {
      counters[val] = 1;
    } else {
      counters[val]++;
    }
  }
  let maxCount = 0;
  for (const val in counters) {
    if (counters[val] > maxCount) {
      maxCount = counters[val];
    }
  }
  for (const val in counters) {
    if (counters[val] === maxCount) {
      return Number(val);
    }
  }
  return NaN;
}

export function buildDataset(
  dataset: (string | number | string[] | number[])[],
  colspans: number[],
): AjfTableCell[][] {
  return buildAlignedDataset(dataset, colspans, []);
}

/**
 * Build a dataset for ajf dynamic table
 * @param dataset the dataset for the table
 * @param colspans colspan for each value in the dataset
 * @param textAlign alignment for each value in the dataset
 * @returns An AjfTableCell list
 */
export function buildAlignedDataset(
  dataset: (string | number | string[] | number[])[],
  colspans: number[],
  textAlign: string[],
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
          textAlign: textAlign[cellIndex] ? textAlign[cellIndex] : 'center',
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
 * Build a dataset based on a list of Forms, for ajf dynamic table
 * @param dataset the dataset for the table
 * @param fields the list of fields name for each row
 * @param rowLink the http link for the row, with the form field name with the link value and the column position for the link.
 * ie: {'link': 'home_link', 'position': 0}
 * @param backgroundColorA the first backgroud color
 * @param backgroundColorB the second backgroud color
 * @returns An AjfTableCell list
 */
export function buildFormDataset(
  dataset: MainForm[],
  fields: string[],
  rowLink: {link: string; position: number} | null,
  _backgroundColorA?: string,
  _backgroundColorB?: string,
): AjfTableCell[][] {
  return buildAlignedFormDataset(dataset, fields, [], [], rowLink, [], []);
}

/**
 * Build a dataset based on a list of Forms, for ajf dynamic table
 * @param dataset the dataset for the table
 * @param fields the list of fields name for each row
 * @param colspans colspan for each value in the dataset
 * @param textAlign alignment for each value in the dataset
 * @param rowLink the http link for the row, with the form field name with the link value and the column position for the link.
 * ie: {'link': 'home_link', 'position': 0}
 * @returns An AjfTableCell list
 */
export function buildAlignedFormDataset(
  dataset: MainForm[],
  fields: string[],
  colspans: number[],
  textAlign: string[],
  rowLink: {link: string; position: number} | null,
  dialogFields: string[],
  dialogLabelFields: string[],
): AjfTableCell[][] {
  const res: AjfTableCell[][] = [];

  const backgroundColorA = 'white';
  const backgroundColorB = '#ddd';
  if (dataset) {
    let index: number = 0;
    dataset.forEach((data: MainForm) => {
      if (data) {
        index++;
        const row: AjfTableCell[] = [];
        fields.forEach((field: string, cellIdx: number) => {
          let cellValue = data[field] || '';
          if (rowLink != null && cellIdx === rowLink['position']) {
            cellValue = `<a href='${data[rowLink['link']]}'> ${data[field]}</a>`;
          }
          row.push({
            value: cellValue,
            colspan: colspans[cellIdx] && colspans[cellIdx] > 0 ? colspans[cellIdx] : 1,
            rowspan: 1,
            style: {
              textAlign: textAlign[cellIdx] ? textAlign[cellIdx] : 'center',
              color: 'black',
              backgroundColor: index % 2 === 0 ? backgroundColorA : backgroundColorB,
            },
          });
        });

        if (dialogFields && dialogFields.length) {
          let dialogHtml: string[] = [];
          dialogFields.forEach((field: string, cellIdx: number) => {
            let fieldValue = '""';
            if (data[field] != null) {
              fieldValue =
                "<p class='dialog-item'><b>" +
                dialogLabelFields[cellIdx].replace(/['\"]+/g, '') +
                '</b> <span>' +
                data[field] +
                '</span></p>';
              dialogHtml.push(fieldValue);
            }
          });

          row.push({
            value:
              '<div class="read_more_cell"><p class="read_more_text">Read more</p><b class="material-icons">add_circle_outline</b></div>',
            dialogHtml: dialogHtml.join(' '),
            colspan: 1,
            rowspan: 1,
            style: {
              textAlign: 'center',
              color: 'black',
              backgroundColor: index % 2 === 0 ? backgroundColorA : backgroundColorB,
            },
          });
        }
        res.push(row);
      }
    });
  }
  return res;
}

/**
 * create a widget dataset into a content list, based on a list of Forms, for paginated widget
 *
 * @param dataset the dataset for the widgets
 * @param fields the list of fields name for each row
 * @param rowLink the http link for the row, with the form field name with the link value and the column position for the link.
 * ie: {'link': 'home_link', 'position': 0}
 * @param cellStyles css styles for cells
 * @param rowStyle css styles for rows
 * @param percWidth an array with the same length of fields param, with the width for the columns.
 * ie: ['10%', '30%', '10%', '25%', '15%', '10%']
 * @param backgroundColorA the first backgroud color
 * @param backgroundColorB the second backgroud color
 * @returns An AjfTableWidget list
 */
export function buildWidgetDataset(
  dataset: MainForm[],
  fields: string[],
  rowLink: {link: string; position: number} | null,
  cellStyles: {[key: string]: any} | null,
  rowStyle: {[key: string]: any} | null,
  percWidth: string[],
  backgroundColorA?: string,
  backgroundColorB?: string,
): any[] {
  const res: {[key: string]: any}[] = [];
  if (backgroundColorA == null) {
    backgroundColorA = 'white';
  }
  if (backgroundColorB == null) {
    backgroundColorB = '#ddd';
  }
  if (rowStyle == null) {
    rowStyle = {
      'text-align': 'right',
      'margin-bottom': 0,
      'border-collapse': 'collapse',
    };
  }
  if (cellStyles == null) {
    cellStyles = {
      textAlign: 'center',
      color: 'black',
    };
  }
  if (percWidth == null || percWidth.length !== fields.length) {
    const cellWidth = 100 / fields.length + '%';
    percWidth = [];
    fields.forEach(_ => percWidth.push(cellWidth));
  }

  if (dataset) {
    let index: number = 0;
    dataset.forEach((data: MainForm) => {
      if (data) {
        index++;
        // Row is an AjfTableWidget
        const row: {[key: string]: any} = {
          styles: {
            'text-align': 'right',
            'margin-bottom': 0,
            'border-collapse': 'collapse',
            ...rowStyle,
          },
          visibility: {condition: 'true'},
          widgetType: 5,
          dataset: [[]] as any[][],
          cellStyles: {'border-top': '1px solid grey'},
        };

        fields.forEach((field: string, cellIdx: number) => {
          let formulaCell = '""';
          if (data[field] != null) {
            formulaCell = '"' + data[field] + '"';
            if (rowLink != null && cellIdx === rowLink['position']) {
              formulaCell = `"<a href='${data[rowLink['link']]}'> ${data[field]}</a>"`;
            }
          }

          row['dataset'][0].push({
            label: '',
            style: {
              textAlign: 'center',
              color: 'black',
              backgroundColor: index % 2 === 0 ? backgroundColorA : backgroundColorB,
              ...cellStyles,
              width: percWidth[cellIdx],
            },
            formula: {
              formula: formulaCell,
            },
            colspan: 1,
            rowspan: 1,
            aggregation: {
              aggregation: 0,
            },
          });
        });
        res.push(row);
      }
    });
  }
  return res;
}

/**
 * create a widget dataset into a content list, based on a list of Forms, for paginated widget.
 * Each row is a AjfDialogWidget and, on click, open a dialog.
 *
 * @param dataset the dataset for the widgets
 * @param fields the list of fields name for each row
 * @param dialogFields the list of fields name to show in the dialog
 * @param dialogLabelFields the list of labels for each dialogFields
 * @param rowLink the http link for the row, with the form field name with the link value and the column position for the link.
 * ie: {'link': 'home_link', 'position': 0}
 * @param cellStyles css styles for cells
 * @param rowStyle css styles for rows
 * @param percWidth an array with the same length of fields param, with the width for the columns.
 * ie: ['10%', '30%', '10%', '25%', '15%', '10%']
 * @param backgroundColorA the first backgroud color
 * @param backgroundColorB the second backgroud color
 * @returns An AjfDialogWidget list
 */
export function buildWidgetDatasetWithDialog(
  dataset: MainForm[],
  fields: string[],
  dialogFields: string[],
  dialogLabelFields: string[],
  cellStyles: {[key: string]: any} | null,
  rowStyle: {[key: string]: any} | null,
  percWidth: string[],
  backgroundColorA?: string,
  backgroundColorB?: string,
): any[] {
  const res: {[key: string]: any}[] = [];
  if (backgroundColorA == null) {
    backgroundColorA = 'white';
  }
  if (backgroundColorB == null) {
    backgroundColorB = '#ddd';
  }
  if (rowStyle == null) {
    rowStyle = {
      'text-align': 'right',
      'margin-bottom': 0,
      'border-collapse': 'collapse',
    };
  }
  if (cellStyles == null) {
    cellStyles = {
      textAlign: 'center',
      color: 'black',
    };
  }
  if (percWidth == null || percWidth.length !== fields.length) {
    const cellWidth = 100 / fields.length + '%';
    percWidth = [];
    fields.forEach(_ => percWidth.push(cellWidth));
  }

  if (dataset) {
    let index: number = 0;
    dataset.forEach((data: MainForm) => {
      if (data) {
        index++;
        // Row is an AjfTableWidget
        const row: {[key: string]: any} = {
          styles: {
            'text-align': 'right',
            'margin-bottom': 0,
            'border-collapse': 'collapse',
            ...rowStyle,
          },
          visibility: {condition: 'true'},
          widgetType: 5,
          dataset: [[]] as any[][],
          cellStyles: {'border-top': '1px solid grey'},
        };

        fields.forEach((field: string, cellIdx: number) => {
          let formulaCell = '""';
          if (data[field] != null) {
            formulaCell = '"' + data[field] + '"';
          }

          row['dataset'][0].push({
            label: '',
            style: {
              textAlign: 'center',
              color: 'black',
              backgroundColor: index % 2 === 0 ? backgroundColorA : backgroundColorB,
              ...cellStyles,
              width: percWidth[cellIdx],
            },
            formula: {
              formula: formulaCell,
            },
            colspan: 1,
            rowspan: 1,
            aggregation: {
              aggregation: 0,
            },
          });
        });

        let htmlDialog: string[] = [];
        dialogFields.forEach((field: string, cellIdx: number) => {
          let fieldValue = '""';
          if (data[field] != null) {
            fieldValue =
              "<p class='dialog-item'><b>" +
              dialogLabelFields[cellIdx] +
              '</b> <span>' +
              data[field] +
              '</span></p>';
            htmlDialog.push(fieldValue);
          }
        });

        const dialogContent: {[key: string]: any} = {
          widgetType: 3,
          styles: {
            'margin': '0 1em',
            'padding': '5px 10px',
            'max-height': '360px',
          },
          visibility: {condition: 'true'},
          htmlText: htmlDialog.join(' '),
        };

        // This is a Dialog Widget, added as comtainer for each table widget
        const dialogRow: {[key: string]: any} = {
          widgetType: 13,
          styles: {
            'margin': '0',
          },
          visibility: {condition: 'true'},
          toggle: row,
          content: [dialogContent],
        };
        res.push(dialogRow);
      }
    });
  }
  return res;
}

/**
 * Deprecated. Use MAP
 */
export function REPEAT(
  this: AjfContext|void,
  forms: MainForm[],
  array: string[],
  fn: AjfValidationFn,
  field: string,
  expression: string = 'true',
): any[] {
  const varsContext = this || {};
  return array.map(current => {
    return (fn as any).call({...varsContext, current}, forms, field, expression);
  });
}

/**
 * Evaluates the expression for each element of the array and returns the array of results.
 * The current element can be accessed with the keyword elem.
 */
export function MAP(this: AjfContext|void, array: any[], expression: string): any[] {
  const varsContext = this || {};
  return array.map(elem =>
    evaluateExpression(expression, {...varsContext, elem})
  );
}

/**
 * For each form in forms, the specified field is set with the value given by the evaluation of expression.
 * The form's fields can be used inside expression.
 */
export function APPLY(this: AjfContext|void, forms: MainForm[], field: string, expression: string): MainForm[] {
  const varsContext = this || {};
  forms = cloneMainForms(forms);
  for (const form of forms) {
    if (form != null) {
      form[field] = evaluateExpression(expression, {...varsContext, ...form});
    }
  }
  return forms;
}

/**
 * Rounds num to the specified number of digits after the point (or zero).
 */
export function ROUND(num: number | string, digits?: number): number {
  return round(num, digits);
}

/**
 * Deprecated. Use IF_THEN_ELSE
 */
export function EVALUATE(condition: string, branch1: any, branch2: any): any {
  if (evaluateExpression(condition)) {
    return branch1;
  } else {
    return branch2;
  }
}

/**
 * Tells if arr includes elem
 */
export function INCLUDES(arr: any[], elem: any): boolean {
  return arr.includes(elem);
}

/**
 * This function builds a data structure that allows the use of the hindikit formulas
 * for every forms with repeating slides.
 * In particular, it builds a main data form with all the data relating to the slides and
 * a dictionary with the name reps thus made instance slideName forms.
 * Where a form is associated with each instance of the repeating slide.
 * example:
 * simple form:
 *  {
 *    $value: "AGO"
 *    cittadinanza__0: "AGO"
 *    codice_fiscale__0: "jdfljglòkòkò"
 *    country__0: "AGO"
 *    date_end: "2021-01-10"
 *    date_start: "2021-01-10"
 *    dob__0: "2021-03-11"
 *    first_name__0: "pippo"
 *    gender__0: "f"
 *    id_family: "3bef3a3f-d95d-4a09-8df4-e812c55c61c6"
 *    istruzione__0: null
 *    last_name__0: "pippo"
 *    permesso_soggiorno__0: "no"
 *    relazione__0: "genitore"
 *    solidando: "solidando1"
 *    stato_civile__0: null
 *  }
 * after BUILD_DATASET
 * MainForm:
 * {
 *    $value: "AGO"
 *    ajf_form_id: 0 ** added atribute that rappresent the index position insides input form list.
 *    ajf_family_component_count: 1** added atribute that rappresent the instance number of famili_component repeating slides.
 *    date_end: "2021-01-10"
 *    date_start: "2021-01-10"
 *    id_family: "3bef3a3f-d95d-4a09-8df4-e812c55c61c6"
 *    reps: {
 *      family_component: [
 *        {
 *          ajf_family_component_rep: 0 ** added atribute that rappresent the order instance of family_component repeating slide.
 *          cittadinanza: "AGO"
 *          codice_fiscale: "jdfljglòkòkò"
 *          country: "AGO"
 *          dob: "2021-03-11"
 *          first_name: "pippo"
 *          gender: "f"
 *          istruzione: null
 *          last_name: "pippo"
 *          permesso_soggiorno: "no"
 *          relazione: "genitore"
 *          stato_civile: null
 *        }
 *      ]
 *    }
 * }
 *
 * @param {Form[]} forms
 * @param {*} [schema] if schema is provided the instances inside the reps match with effective
 * slide name. Otherwise all repeating slides are associates to generic slide name "rep".
 * @return {*}  {MainForm[]}
 */
export function BUILD_DATASET(forms: Form[], schema?: any): MainForm[] {
  const res: MainForm[] = [];
  const generateMetadata = (slideName: string, slideInstance: number) => {
    const resg: {[sname: string]: any} = {};
    resg[`ajf_${slideName}_rep`] = slideInstance;
    return resg;
  };

  forms = [...(forms || [])];

  if (schema != null) {
    const repeatingSlides: any[] = schema.nodes.filter((node: any) => node.nodeType === 4);
    const obj: {[fieldName: string]: string} = {};
    repeatingSlides.forEach(slide => {
      let nodeFields = slide.nodes.map((n: any) => n.name);
      nodeFields.forEach((nodeField: string) => {
        obj[nodeField] = slide.name;
      });
    });

    forms.forEach((f, formIdx) => {
      const mainForm: MainForm = {reps: {}};
      const fKeys: string[] = Object.keys(f);
      const instances: {[slideName: string]: any} = {};

      fKeys.forEach(fkey => {
        const splittedKey: string[] = fkey.split('__');
        const splittedLength: number = splittedKey.length;
        const fieldName = splittedKey[0];
        const slideInstance =
          splittedKey[1] != null && Number.isInteger(+splittedKey[1]) ? +splittedKey[1] : null;
        const slideName = obj[fieldName];
        if (splittedLength === 2 && slideInstance != null && slideName != null) {
          instances[slideName] = instances[slideName] != null ? instances[slideName] : [];
          instances[slideName][slideInstance] =
            instances[slideName][slideInstance] != null
              ? instances[slideName][slideInstance]
              : generateMetadata(slideName, slideInstance);
          instances[slideName][slideInstance][fieldName] = f[fkey];
        } else {
          mainForm[fkey] = f[fkey];
        }
      });
      mainForm[`ajf_form_id`] = formIdx;
      const instanceKeys = Object.keys(instances);
      instanceKeys.forEach(instanceKey => {
        mainForm[`ajf_${instanceKey}_count`] = instances[instanceKey].length;
      });
      mainForm.reps = instances;
      res.push(mainForm);
    });
    return res;
  } else {
    forms.forEach(form => {
      const fKeys: string[] = Object.keys(form);
      const noRepeatingFields: string[] = fKeys.filter(fkey => {
        const splittedKey: string[] = fkey.split('__');
        if (splittedKey.length === 2) {
          return false;
        }
        return true;
      });
      const noRepForm: Form = {};

      noRepeatingFields.forEach(field => {
        noRepForm[field] = form[field];
      });

      const mainForm: MainForm = {...noRepForm, reps: {slide: []}};

      for (let i = 0; i <= MAX_REPS; i++) {
        const currentSlide: Form = {};
        const onlyCurrentInstanceKeys: string[] = fKeys.filter(fkey => {
          const splittedKey: string[] = fkey.split('__');
          if (splittedKey.length === 2) {
            return fkey.indexOf(`__${i}`) > -1;
          }
          return false;
        });
        // se il numero di attributi coincide il form data non ha repeatingslides
        if (onlyCurrentInstanceKeys.length === 0) {
          mainForm['ajf_rep_count'] = i;
          break;
        }
        onlyCurrentInstanceKeys.forEach(key => {
          const splittedKey = key.split('__');
          const fieldName = splittedKey[0];
          const slideInstance = splittedKey[1] != null ? +splittedKey[1] : null;
          currentSlide[fieldName] = form[key];
          currentSlide['ajf_rep'] = slideInstance != null ? slideInstance : currentSlide['ajf_rep'];
        });
        if (onlyCurrentInstanceKeys.length != 0) {
          mainForm.reps!['slide'].push(currentSlide);
        } else {
          mainForm.reps = undefined;
        }
      }
      res.push(mainForm);
    });

    return res;
  }
}

/**
 * UTILITY FUNCION
 * This function take an ajf schema as input and extract a
 * dict that match each choice value (also with choicesOrigin name prefix) with its label
 * @param schema the ajf schema
 * @returns A dict with:
 *  {[choicesOriginName_choiceValue: string]: [choiceLabel: string]}
 *  {[choiceValue: string]: [choiceLabel: string]}
 */
function extractLabelsBySchemaChoices(schema: any): {[choiceValue: string]: string} {
  const choiceLabels: {[choiceValue: string]: string} = {};
  if (schema && schema.choicesOrigins != null) {
    (schema.choicesOrigins as any[]).forEach(choicesOrigin => {
      if (choicesOrigin != null && choicesOrigin.choices != null) {
        (choicesOrigin.choices as any[]).forEach(choice => {
          choiceLabels[choicesOrigin.name + '_' + choice.value] = choice.label;
          choiceLabels[choice.value] = choice.label;
        });
      }
    });
  }
  return choiceLabels;
}

/**
 * UTILITY FUNCION
 * This function take an ajf schema as input and extract a one
 * dimensional array of AjfNode for each slide's field
 *
 * @param schema the ajf schema
 * @returns An object with all fields:
 *  {[fieldName: string]: ajf field}
 */
function extractFlattenNodes(schema: any): {[field: string]: any} {
  const fieldNodes: {[field: string]: any} = {};
  if (schema && schema.nodes) {
    const slides: any[] = schema.nodes.filter(
      (node: any) => node.nodeType === 3 || node.nodeType === 4,
    );
    slides.forEach(slide => {
      slide.nodes
        .filter((node: any) => node.nodeType === 0)
        .forEach((fieldNode: any) => {
          fieldNodes[fieldNode.name] = fieldNode;
        });
    });
  }
  return fieldNodes;
}

/**
 * Returns a clone of forms, where the specified fields are replaced by the corresponding labels,
 * as defined by the choice origins in schema.
 *
 * @param {MainForm[]} formList
 * @param {*} schema the ajf schema
 * @param {string[]} fieldNames
 * @return {*}  {MainForm[]}
 */
export function APPLY_LABELS(formList: MainForm[], schema: any, fieldNames: string[]): MainForm[] {
  formList = cloneMainForms(formList);
  const choiceLabels: {[fieldName: string]: string} = extractLabelsBySchemaChoices(schema);
  const flattenNodes = extractFlattenNodes(schema);

  for (let i = 0; i < formList.length; i++) {
    if (formList[i] == null) {
      continue;
    }
    if (formList[i].reps != null) {
      const f = formList[i];
      const fKeys: string[] = Object.keys(f);
      fKeys.forEach(fkey => {
        const fieldNode = flattenNodes[fkey];
        const choiceOriginNamePrefix =
          fieldNode && fieldNode.choicesOriginRef ? fieldNode.choicesOriginRef + '_' : '';

        if (fieldNames.includes(fkey) && f[fkey] !== null) {
          let choiceValue: string[] = [];
          if (Array.isArray(f[fkey])) {
            choiceValue = f[fkey] as unknown as string[];
          } else {
            const multipleVals = (f[fkey] as string).split(',').map(v => v.trim());
            if (multipleVals.length > 1) {
              choiceValue = multipleVals;
            } else {
              choiceValue = [f[fkey] as string];
            }
          }
          if (choiceValue != null) {
            const labels = choiceValue.map(val => {
              const valWithPrefix = choiceOriginNamePrefix + val;
              return choiceLabels[valWithPrefix] != null
                ? choiceLabels[valWithPrefix]
                : choiceLabels[val] != null
                ? choiceLabels[val]
                : val;
            });
            if (labels && labels.length) {
              const labelFieldName = fkey + '_choicesLabel';
              formList[i][labelFieldName] = labels.length > 1 ? labels.join(', ') : labels[0];
            }
          }
        }
      });
    }
  }
  return formList;
}

/**
 * Deprecated. Use FILTER_BY
 */
export function FILTER_BY_VARS(formList: MainForm[], expression: string): MainForm[] {
  return FILTER_BY(formList, expression);
}

/**
 * Returns a copy of forms and its repetitions, keeping only the ones for which expression evaluates to true.
 */
export function FILTER_BY(this: AjfContext|void, forms: MainForm[], expression: string): MainForm[] {
  const varsContext = this || {};
  forms = forms || [];
  if (expression === 'true') {
    return cloneMainForms(forms);
  }
  const res: MainForm[] = [];
  for (let form of forms.filter(f => f != null)) {
    form = {...form};
    const filteredReps: Instances = {};
    let someReps = false;
    if (form.reps != null) {
      for (const key in form.reps) {
        filteredReps[key] = form.reps[key].filter(rep =>
          evaluateExpression(expression, {...varsContext, ...form, ...rep})
        );
        form[`ajf_${key}_count`] = filteredReps[key].length;
        someReps ||= filteredReps[key].length > 0;
      }
    }
    if (someReps || evaluateExpression(expression, {...varsContext, ...form})) {
      form.reps = filteredReps;
      res.push(form);
    }
  }
  return res;
}

/**
 * Returns today's date.
 *
 * @export
 * @param {string} [format='yyyy-MM-dd']
 * @return {*}  {string}
 */
export function TODAY(format = 'yyyy-MM-dd'): string {
  return dateFns.format(new Date(), format);
}

/**
 * Logs val to the console.
 * 
 * @export
 * @param {*} val
 */
export function CONSOLE_LOG(val: any): void {
  console.log(val);
}

/**
 * Computes the current age in years, given the date of birth.
 *
 * @export
 * @param {(string | null)} dob
 * @return {*}  {number}
 */
export function GET_AGE(dob: string | null): number {
  if (dob == null) return +'<'; // need for generate false funcion in evaluateExpression
  const date = new Date(dob);
  const age: number = dateFns.differenceInYears(new Date(), date);
  return age;
}

/**
 * If data is a form with repetitions, returns the number of repetitions;
 * If data is an array, returns its length;
 * Otherwise returns 0.
 *
 * @export
 * @param {(MainForm | any[])} dataset
 * @return {*}  {number}
 */
export function LEN(dataset: MainForm | any[]): number {
  if (dataset == null) {
    return 0;
  }
  const form = dataset as MainForm;
  if (form.reps != null) {
    return allReps(form).length;
  }
  return (dataset as any[]).length || 0;
}

/**
 * Array concatenation.
 *
 * @export
 * @param {any[]} a
 * @param {any[]} b
 * @return {*}  {any[]}
 */
export function CONCAT(a: any[], b: any[]): any[] {
  return a.concat(b);
}

/**
 * Removes duplicate elements from an array.
 *
 * @export
 * @param {any[]} arr
 * @return {*}  {any[]}
 */
export function REMOVE_DUPLICATES(arr: any[]): any[] {
  return [...new Map(arr.map(v => [JSON.stringify(v), v])).values()];
}

/**
 * Returns true if date is before dateToCompare.
 *
 * @export
 * @param {string} date
 * @param {string} dateToCompare
 * @return {*}  {boolean}
 */
export function IS_BEFORE(date: string, dateToCompare: string): boolean {
  const dateA: Date = dateFns.parseISO(date);
  const dateB: Date = dateFns.parseISO(dateToCompare);
  return dateFns.isBefore(dateA, dateB);
}

/**
 * Returns true if date is after dateToCompare.
 *
 * @export
 * @param {string} date
 * @param {string} dateToCompare
 * @return {*}  {boolean}
 */
export function IS_AFTER(date: string, dateToCompare: string): boolean {
  const dateA: Date = dateFns.parseISO(date);
  const dateB: Date = dateFns.parseISO(dateToCompare);
  return dateFns.isAfter(dateA, dateB);
}

/**
 * Returns true if date is between dateStart and dateEnd.
 *
 * @export
 * @param {string} date
 * @param {string} dateStart
 * @param {string} dateEnd
 * @return {*}  {boolean}
 */
export function IS_WITHIN_INTERVAL(date: string, dateStart: string, dateEnd: string): boolean {
  const dateToCompare: Date = dateFns.parseISO(date);
  const interval: Interval = {
    start: dateFns.parseISO(dateStart),
    end: dateFns.parseISO(dateEnd),
  };
  return dateFns.isWithinInterval(dateToCompare, interval);
}

/**
 * Compares date with an interval.
 * Returns '-1' (or the first element of labels) if date is before dateStart,
 * '0' (or the second element) if date is between dateStart and dateEnd,
 * '1' (or the third element) if date is after dateEnd.
 *
 * @export
 * @param {string} date
 * @param {string} dateStart
 * @param {string} dateEnd
 * @param {string[]} labels an optional array of string for the output values
 * @return {*}  {string}
 */
export function COMPARE_DATE(
  date: string,
  dateStart: string,
  dateEnd: string,
  labels?: string[],
): string {
  const dateToCompare: Date = dateFns.parseISO(date);
  const dateA: Date = dateFns.parseISO(dateStart);
  const dateB: Date = dateFns.parseISO(dateEnd);
  const interval: Interval = {
    start: dateA,
    end: dateB,
  };
  if (labels == null) {
    labels = ['-1', '0', '1'];
  }
  if (dateFns.isBefore(dateToCompare, dateA)) {
    return labels[0];
  }
  if (dateFns.isWithinInterval(dateToCompare, interval)) {
    return labels[1];
  }
  if (dateFns.isAfter(dateToCompare, dateB)) {
    return labels[2];
  }
  return '';
}

/**
 * Performs a left join of formsA and formsB.
 */
export function JOIN_FORMS(
  formsA: (MainForm | Form)[],
  formsB: (MainForm | Form)[],
  keyA: string,
  keyB?: string,
): (MainForm | Form)[] {
  return JOIN_REPEATING_SLIDES(formsA, formsB, keyA, keyB as any, null as any);
}

/**
 * Performs a left join of formsA and formsB, like JOIN_FORMS.
 * In addition, for each matching pair of formA and formB, their repeating slides are also joined.
 */
export function JOIN_REPEATING_SLIDES(
  formsA: MainForm[],
  formsB: MainForm[],
  keyA: string,
  keyB: string,
  subkeyA: string,
  subkeyB?: string,
): MainForm[] {
  formsA = cloneMainForms(formsA || []);
  formsB = cloneMainForms(formsB || []);
  if (keyB == null) {
    keyB = keyA;
  }
  if (subkeyB == null) {
    subkeyB = subkeyA;
  }
  const indexB: {[val: string]: MainForm} = {};
  for (let i = formsB.length - 1; i >= 0; i--) {
    const val = formsB[i] && formsB[i][keyB];
    if (val != null) {
      indexB[String(val)] = formsB[i];
    }
  }
  const res: MainForm[] = [];
  for (const formA of formsA) {
    const val = formA && formA[keyA];
    const formB = indexB[String(val)];
    if (val == null || formB == null) {
      res.push(formA);
      continue;
    }
    const repsA = formA.reps || {};
    const repsB = formB.reps || {};
    if (subkeyA != null) {
      const allRepsB = allReps(formB);
      for (const k in repsA) {
        repsA[k] = JOIN_FORMS(repsA[k], allRepsB, subkeyA, subkeyB) as Form[];
        formA[`ajf_${k}_count`] = repsA[k].length;
      }
    }
    res.push({...formB, ...formA, reps: {...repsB, ...repsA}});
  }
  return res;
}

/**
 * Returns the array obtained by evaluating expression for every repetition of form.
 *
 * @export
 * @param {MainForm} form
 * @param {string} expression
 * @return {*}  {any[]}
 */
export function FROM_REPS(this: AjfContext|void, form: MainForm, expression: string): any[] {
  const varsContext = this || {};
  return allReps(form || {}).map(rep =>
    evaluateExpression(expression, {...varsContext, ...form, ...rep})
  );
}

/**
 * Deprecated. Use INCLUDES
 */
export function ISIN(dataset: any[], value: any): boolean {
  if (dataset == null || value == null) {
    return false;
  }
  return dataset.indexOf(value) >= 0;
}

/**
 * Applies the operation defined by expression for every pair of elements of arrayA and arrayB,
 * returning the array of results. The current elements are identified by elemA and elemB.
 * For example, `OP([1, 2, 3], [10, 20, 30], "elemA + elemB")` returns `[11, 22, 33]`
 */
export function OP(this: AjfContext|void, arrayA: any[], arrayB: any[], expression: string): any[] {
  const varsContext = this || {};
  const res: any[] = [];
  for (let i = 0; i < Math.min(arrayA.length, arrayB.length); i++) {
    const context = {...varsContext, elemA: arrayA[i], elemB: arrayB[i]};
    const val = evaluateExpression(expression, context);
    res.push(val);
  }
  return res;
}

/**
 * Given an array of values, returns the corresponding array of labels,
 * as specified by the choices origin in schema.
 *
 * @export
 * @param {*} schema
 * @param {string[]} values
 * @return {*}  {string[]}
 */
export function GET_LABELS(schema: any, values: string[]): string[] {
  const choiceLabels = extractLabelsBySchemaChoices(schema);
  return values.map(val => choiceLabels[val] != null ? choiceLabels[val] : val);
}
