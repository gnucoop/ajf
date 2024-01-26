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
    alert: {fn: alert},
    buildAlignedDataset: {fn: buildAlignedDataset},
    buildAlignedFormDataset: {fn: buildAlignedFormDataset},
    buildDataset: {fn: buildDataset},
    buildFormDataset: {fn: buildFormDataset},
    buildWidgetDataset: {fn: buildWidgetDataset},
    buildWidgetDatasetWithDialog: {fn: buildWidgetDatasetWithDialog},
    calculateAvgProperty: {fn: calculateAvgProperty},
    calculateAvgPropertyArray: {fn: calculateAvgPropertyArray},
    calculateTrendByProperties: {fn: calculateTrendByProperties},
    calculateTrendProperty: {fn: calculateTrendProperty},
    dateOperations: {fn: dateOperations},
    decimalCount: {fn: decimalCount},
    digitCount: {fn: digitCount},
    drawThreshold: {fn: drawThreshold},
    extractArray: {fn: extractArray},
    extractArraySum: {fn: extractArraySum},
    extractDates: {fn: extractDates},
    extractSum: {fn: extractSum},
    formatDate: {fn: formatDate},
    formatNumber: {fn: formatNumber},
    getCoordinate: {fn: getCoordinate},
    isInt: {fn: isInt},
    isoMonth: {fn: isoMonth},
    lastProperty: {fn: lastProperty},
    notEmpty: {fn: notEmpty},
    parseDate: {fn: dateUtils.parse},
    plainArray: {fn: plainArray},
    buildPointData: {fn: buildPointData},
    round: {fn: round},
    scanGroupField: {fn: scanGroupField},
    sum: {fn: sum},
    sumLastProperties: {fn: sumLastProperties},
    valueInChoice: {fn: valueInChoice},
    ADD_DAYS: {fn: ADD_DAYS},
    ALL_VALUES_OF: {fn: ALL_VALUES_OF},
    APPLY_LABELS: {fn: APPLY_LABELS},
    APPLY: {fn: APPLY},
    BUILD_DATASET: {fn: BUILD_DATASET},
    COMPARE_DATE: {fn: COMPARE_DATE},
    CONCAT: {fn: CONCAT},
    CONSOLE_LOG: {fn: CONSOLE_LOG},
    COUNT_FORMS_UNIQUE: {fn: COUNT_FORMS_UNIQUE},
    COUNT_FORMS: {fn: COUNT_FORMS},
    COUNT_REPS: {fn: COUNT_REPS},
    DAYS_DIFF: {fn: DAYS_DIFF},
    EVALUATE: {fn: EVALUATE},
    FILTER_BY_VARS: {fn: FILTER_BY_VARS},
    FILTER_BY: {fn: FILTER_BY},
    FIRST: {fn: FIRST},
    FROM_REPS: {fn: FROM_REPS},
    GET_AGE: {fn: GET_AGE},
    GET_LABELS: {fn: GET_LABELS},
    INCLUDES: {fn: INCLUDES},
    IS_AFTER: {fn: IS_AFTER},
    IS_BEFORE: {fn: IS_BEFORE},
    IS_WITHIN_INTERVAL: {fn: IS_WITHIN_INTERVAL},
    ISIN: {fn: ISIN},
    JOIN_FORMS: {fn: JOIN_FORMS},
    JOIN_REPEATING_SLIDES: {fn: JOIN_REPEATING_SLIDES},
    LAST: {fn: LAST},
    LEN: {fn: LEN},
    MAP: {fn: MAP},
    MAX: {fn: MAX},
    MEAN: {fn: MEAN},
    MEDIAN: {fn: MEDIAN},
    MODE: {fn: MODE},
    OP: {fn: OP},
    PERCENT: {fn: PERCENT},
    PERCENTAGE_CHANGE: {fn: PERCENTAGE_CHANGE},
    REMOVE_DUPLICATES: {fn: REMOVE_DUPLICATES},
    REPEAT: {fn: REPEAT},
    ROUND: {fn: ROUND},
    SUM: {fn: SUM},
    TODAY: {fn: TODAY},
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

export function evaluateExpression(expression: string, context?: AjfContext): any {
  return createFunction(expression)(context);
}

const globals = [
  'this',
  'true',
  'false',
  'null',
  'undefined',
  'Infinity',
  'NaN',
  'isNaN',
  'isFinite',
  'Object',
  'String',
  'Array',
  'Set',
  'Map',
  'Number',
  'Date',
  'Math',
  'parseInt',
  'parseFloat',
];

type Func = (c?: AjfContext) => any;

export function createFunction(expression: string): Func {
  if (expression == null) {
    return _ => null;
  }
  expression = String(expression);
  if (expression === 'true') {
    return _ => true;
  }
  if (expression === 'false') {
    return _ => false;
  }
  if (/^[a-zA-Z_$][\w$]*$/.test(expression)) {
    // expression is an identifier
    return c => (c == null || c[expression] === undefined ? null : c[expression]);
  }
  if (/^"[^"]*"$/.test(expression) || /^'[^']*'$/.test(expression)) {
    let str = expression.slice(1, -1);
    return _ => str;
  }

  const identifiers = new Set(getCodeIdentifiers(expression, true)).add('execContext');
  for (const ide of globals) {
    identifiers.delete(ide);
  }
  const argNames = [...identifiers];
  let func: Function;
  try {
    func = new Function(...argNames, 'return ' + expression);
  } catch {
    return _ => false;
  }
  return context => {
    const argValues = argNames.map(name => {
      if (context != null && context[name] !== undefined) {
        return context[name];
      }
      if (AjfExpressionUtils.utils[name] !== undefined) {
        return AjfExpressionUtils.utils[name].fn;
      }
      if (name === 'execContext') {
        return execContext;
      }
      return null;
    });
    try {
      return func(...argValues);
    } catch {
      return false;
    }
  };
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
  return !(x == null || x === '');
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
  forms: MainForm[],
  field: string,
  filter: Func | string = 'true',
): string[] {
  forms = (forms || []).filter(f => f != null);
  if (typeof filter === 'string') {
    filter = createFunction(filter);
  }
  let values: string[] = [];
  for (const form of forms) {
    if (form[field] != null && filter(form)) {
      values.push(String(form[field]));
    }
    for (const rep of allReps(form)) {
      if (rep[field] != null && filter({...form, ...rep})) {
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

interface Point {
  x: number;
  y: number;
  r?: number;
}

export function buildPointData(xs: number[], ys: number[], rs?: number[]): Point[] {
  xs = xs || [];
  ys = ys || [];
  rs = rs || [];
  const points: Point[] = [];
  for (let i = 0; i < xs.length; i++) {
    points.push({x: xs[i], y: ys[i], r: rs[i]});
  }
  return points;
}

/**
 * Returns the number of forms for which filter evaluates to true,
 * for the form itself or for any of its repetitions.
 */
export function COUNT_FORMS(forms: MainForm[], filter: Func | string = 'true'): number {
  forms = (forms || []).filter(f => f != null);
  if (filter === 'true') {
    return forms.length;
  }
  if (typeof filter === 'string') {
    filter = createFunction(filter);
  }
  let count = 0;
  for (const form of forms) {
    if (filter(form)) {
      count++;
      continue;
    }
    for (const rep of allReps(form)) {
      if (filter({...form, ...rep})) {
        count++;
        break;
      }
    }
  }
  return count;
}

/**
 * Counts the forms and all of their repetitions for which filter evaluates to true.
 */
export function COUNT_REPS(forms: MainForm[], filter: Func | string = 'true'): number {
  forms = (forms || []).filter(f => f != null);
  if (typeof filter === 'string') {
    filter = createFunction(filter);
  }
  let count = 0;
  for (const form of forms) {
    if (filter(form)) {
      count++;
    }
    for (const rep of allReps(form)) {
      if (filter({...form, ...rep})) {
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
  forms: MainForm[],
  field: string,
  filter: Func | string = 'true',
): number {
  return ALL_VALUES_OF(forms, field, filter).length;
}

function getNumericValues(
  forms: (MainForm | Form)[],
  field: string,
  filter: Func | string = 'true',
): number[] {
  forms = (forms || []).filter(f => f != null);
  if (typeof filter === 'string') {
    filter = createFunction(filter);
  }
  let values: number[] = [];
  for (const form of forms) {
    const val = form[field];
    if (val != null && !isNaN(Number(val)) && filter(form)) {
      values.push(Number(val));
    }
    for (const rep of allReps(form)) {
      const val = rep[field];
      if (val != null && !isNaN(Number(val)) && filter({...form, ...rep})) {
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
export function SUM(
  forms: (MainForm | Form)[],
  field: string,
  filter: Func | string = 'true',
): number {
  const values = getNumericValues(forms, field, filter);
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
export function MEAN(
  forms: (Form | MainForm)[],
  field: string,
  filter: Func | string = 'true',
): number {
  const values = getNumericValues(forms, field, filter);
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
  return Number.isFinite(res) ? Math.round(res) + '%' : 'infinite';
}

/**
 * Calculates the percentage change between a value and his base reference value.
 */
export function PERCENTAGE_CHANGE(
  value: number | string,
  reference_value: number | string,
): number | string {
  let curr = Number(value);
  let ref = Number(reference_value);
  if (typeof value === 'string' && isNaN(curr)) {
    curr = Number(value.slice(0, -1));
  }
  if (typeof reference_value === 'string' && isNaN(ref)) {
    ref = Number(reference_value.slice(0, -1));
  }
  if (!isNaN(curr) && !isNaN(ref) && ref > 0) {
    const res = ((curr - ref) / ref) * 100;
    return Number.isFinite(res) ? Math.round(res) : 0;
  }
  return '-';
}

/**
 * Evaluates the expression in the first form by date.
 */
export function FIRST(
  forms: (Form | MainForm)[],
  expression: Func | string,
  date = 'created_at',
): any {
  if (typeof expression === 'string') {
    expression = createFunction(expression);
  }
  forms = (forms || []).filter(f => f != null && f[date] != null);
  if (forms.length === 0) {
    return undefined;
  }
  let form = forms[0];
  let minDate = form[date] as string;
  for (let i = 1; i < forms.length; i++) {
    if ((forms[i][date] as string) < minDate) {
      form = forms[i];
      minDate = form[date] as string;
    }
  }
  return expression(form);
}

/**
 * Evaluates the expression in the last form by date.
 */
export function LAST(
  forms: (Form | MainForm)[],
  expression: Func | string,
  date = 'created_at',
): any {
  if (typeof expression === 'string') {
    expression = createFunction(expression);
  }
  forms = (forms || []).filter(f => f != null && f[date] != null);
  if (forms.length === 0) {
    return undefined;
  }
  let form = forms[forms.length - 1];
  let maxDate = form[date] as string;
  for (let i = forms.length - 2; i >= 0; i--) {
    if ((forms[i][date] as string) > maxDate) {
      form = forms[i];
      maxDate = form[date] as string;
    }
  }
  return expression(form);
}

/**
 * Computes the max value of the field.
 */
export function MAX(
  forms: (Form | MainForm)[],
  field: string,
  filter: Func | string = 'true',
): number {
  const values = getNumericValues(forms, field, filter);
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
export function MEDIAN(
  forms: (Form | MainForm)[],
  field: string,
  filter: Func | string = 'true',
): number {
  const values = getNumericValues(forms, field, filter).sort();
  if (values.length === 0) {
    return NaN;
  }
  return values[Math.floor(values.length / 2)];
}

/**
 * Computes the mode value of the field.
 */
export function MODE(
  forms: (Form | MainForm)[],
  field: string,
  filter: Func | string = 'true',
): number {
  const values = getNumericValues(forms, field, filter);
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
  forms: MainForm[],
  array: string[],
  fn: any,
  arg1: string,
  arg2: string = 'true',
): any[] {
  return array.map(v => {
    const s = JSON.stringify(v);
    const current1 = (arg1 as any).replaceAll('current', s);
    const current2 = (arg2 as any).replaceAll('current', s);
    return fn(forms, current1, current2);
  });
}

/**
 * Maps func to the elements of array.
 */
export function MAP(array: any[], func: (a: any) => any): any[] {
  return array.map(func);
}

/**
 * For each form in forms, the specified field is set with the value given by expression.
 * The form's fields can be used inside expression.
 */
export function APPLY(forms: MainForm[], field: string, expression: Func | string): MainForm[] {
  forms = cloneMainForms(forms);
  if (typeof expression === 'string') {
    expression = createFunction(expression);
  }
  for (const form of forms) {
    if (form != null) {
      form[field] = expression(form);
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
 * Deprecated. Use IF
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
export function INCLUDES(arr: any[] | string, elem: any): boolean {
  if (!Array.isArray(arr) && typeof arr !== 'string') {
    return false;
  }
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
 * This function takes an ajf schema as input and extracts a
 * dict that matches each choice value with its label
 * @param schema the ajf schema
 * @returns A dict with:
 *  {[choiceValue: string]: [choiceLabel: string]}
 */
function extractLabelsFromChoices(schema: any): {[value: string]: string} {
  const labels: {[value: string]: string} = {};
  if (schema && schema.choicesOrigins != null) {
    for (const origin of schema.choicesOrigins) {
      if (origin != null && origin.choices != null) {
        for (const c of origin.choices) {
          labels[c.value] = c.label;
        }
      }
    }
  }
  return labels;
}

/**
 * Returns a clone of forms, where the specified fields are replaced by the corresponding labels,
 * as defined by the choice origins in schema.
 *
 * @param {MainForm[]} forms
 * @param {*} schema the ajf schema
 * @param {string[]} fields
 * @return {*} {MainForm[]}
 */
export function APPLY_LABELS(forms: MainForm[], schema: any, fields: string[]): MainForm[] {
  forms = cloneMainForms(forms);
  const labels: {[value: string]: string} = extractLabelsFromChoices(schema);

  for (const form of forms) {
    if (form == null) {
      continue;
    }
    const reps = allReps(form);
    reps.push(form as Form);
    for (const rep of reps) {
      for (const field of fields) {
        const val = rep[field];
        if (typeof(val) === 'string' && labels[val] != null) { // single choice
          rep[field] = labels[val];
        } else if (Array.isArray(val)) { // multiple choice
          rep[field] = val.map(v => labels[v] != null ? labels[v] : v) as any;
        }
      }
    }
  }
  return forms;
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
export function FILTER_BY(forms: MainForm[], expression: Func | string): MainForm[] {
  forms = forms || [];
  if (expression === 'true') {
    return cloneMainForms(forms);
  }
  if (typeof expression === 'string') {
    expression = createFunction(expression);
  }
  const res: MainForm[] = [];
  for (let form of forms.filter(f => f != null)) {
    form = {...form};
    const filteredReps: Instances = {};
    let someReps = false;
    if (form.reps != null) {
      for (const key in form.reps) {
        filteredReps[key] = form.reps[key].filter(rep => (expression as Func)({...form, ...rep}));
        form[`ajf_${key}_count`] = filteredReps[key].length;
        someReps ||= filteredReps[key].length > 0;
      }
    }
    if (someReps || expression(form)) {
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
 * @return {*}  {string}
 */
export function TODAY(): string {
  return new Date().toJSON().slice(0, 10);
}

/**
 * Logs val to the console.
 *
 * @export
 * @param {*} val
 */
export function CONSOLE_LOG(val: any): any {
  console.log(val);
  return val;
}

/**
 * Computes the current age in years, given the date of birth.
 *
 * @export
 * @param {(string | null)} dob
 * @param {(string | undefined)} when
 * @return {*}  {number}
 */
export function GET_AGE(dob: string | null, when?: string): number {
  if (dob == null) {
    return NaN;
  }
  if (when == null) {
    when = TODAY();
  }
  let yearsDiff = Number(when.slice(0, 4)) - Number(dob.slice(0, 4));
  if (when.slice(5) < dob.slice(5)) {
    // birthday not reached yet in current year
    yearsDiff--;
  }
  return yearsDiff;
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

// Returns the date obtained by adding days to date.
export function ADD_DAYS(date: string, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toJSON().slice(0, 10);
}

// Returns the difference in days (a - b) between the two dates.
export function DAYS_DIFF(a: string, b: string): number {
  const dateA = new Date(a);
  const dateB = new Date(b);
  // UTC avoids bugs with daylight saving time.
  const utcA = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
  const utcB = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());

  const millisPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((utcA - utcB) / millisPerDay);
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
  return date < dateToCompare;
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
  return date > dateToCompare;
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
  return date >= dateStart && date <= dateEnd;
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
  if (labels == null) {
    labels = ['-1', '0', '1'];
  }
  if (IS_BEFORE(date, dateStart)) {
    return labels[0];
  }
  if (IS_WITHIN_INTERVAL(date, dateStart, dateEnd)) {
    return labels[1];
  }
  if (IS_AFTER(date, dateEnd)) {
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
 * @param {MainForm | MainForm[]} forms
 * @param {string} expression
 * @return {*}  {any[]}
 */
export function FROM_REPS(forms: MainForm | MainForm[], expression: Func | string): any[] {
  if (typeof expression === 'string') {
    expression = createFunction(expression);
  }
  if (forms == null) {
    forms = [];
  }
  if (!Array.isArray(forms)) {
    forms = [forms];
  }
  const func = expression;
  return forms.map(
    form => allReps(form || {}).map(rep => func({...form, ...rep}))
  ).flat();
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
 * Applies the operator to every pair of elements (arrayA[i], arrayB[i]),
 * returning the array of results.
 */
export function OP(
  arrayA: any[],
  arrayB: any[],
  operator: ((a: any, b: any) => any) | string,
): any[] {
  if (typeof operator === 'string') {
    const func = createFunction(operator);
    operator = (elemA, elemB) => func({elemA, elemB});
  }
  const res: any[] = [];
  for (let i = 0; i < Math.min(arrayA.length, arrayB.length); i++) {
    const val = operator(arrayA[i], arrayB[i]);
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
  const choiceLabels = extractLabelsFromChoices(schema);
  return values.map(val => (choiceLabels[val] != null ? choiceLabels[val] : val));
}
