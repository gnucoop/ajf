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

import * as debug from 'debug';

import {tokenize} from 'esprima';

import {AjfJsonSerializable} from './json';


const debugConstructor: (value?: any) => debug.IDebugger =
    (<any>debug).default || debug;

const dbg = debugConstructor('ajf:models:validated-property');

export type AjfValidationFn = {fn: any};

import * as vfuncs from './validation-functions';


/**
 * This abstract class will define an ajf validated property
 */
export abstract class AjfValidatedProperty extends AjfJsonSerializable {
  static UTIL_FUNCTIONS = '';

  private static _execContext: any = {};

  private static _cachedContext: any = {};
  private static _cachedContextString: string = '';

  /**
   * this method will load an AjfNode from json
   * @param obj                : any - object node
   * @param choicesOrigins     : any[] - array of choicesOrigins
   * @param attachmentsOrigins : any[] - array of attachmentsOrigins
   * @return AjfNode
   */
  static validate(str: string, context?: any): boolean {
    if (context === this._cachedContext) {
      console.log('cache hit');
    } else {
      this._cachedContext = context;
      this._cachedContextString = AjfValidatedProperty.getContextString(context);
    }
    let ctx = this._cachedContextString;
    try {
      let f = new Function(`${ctx}${str}`);
      dbg(<any>`validating formula %s using context %j`, str, ctx);
      f();
      dbg(`formula %s validated`, str);
      f = <any>null;
      return true;
    } catch (e) {
      dbg(`formula %s not validated: error %j`, str, e);
      return false;
    }
  }
  /**
   * this public static method will get context string
   * @param context : any - context
   * @return string
   */
  static getContextString(context?: any): string {
    let fstr = AjfValidatedProperty.UTIL_FUNCTIONS;
    if (context instanceof Array) {
      for (let i = 0; i < context.length; i++) {
        fstr = `${fstr}var ${context[i]} = true;`;
      }
    } else if (context != null) {
      Object.keys(context).forEach(x => {
        let val: any = context[x];
        if (val == null || isNaN(Number(val)) || val === '' ||
            val instanceof Array) {
          if (val instanceof Array) {
            for (let i = 0; i < val.length; i++) {
              val[i] =
                  (val == null || isNaN(Number(val[i])) || val[i] === '') &&
                      val[i] ||
                  Number(val[i]);
            }
          }
          val = JSON.stringify(val);
        } else {
          val = Number(val);
        }
        fstr = `${fstr}var ${x} = ${val}; `;
      });
    }
    return fstr;
  }

  abstract getValidationFormula(): string;

  /**
   * this public method will evaluate context or forceFormula
   * @param context      : any - context
   * @param forceFormula : string - formula
   * @return string
   */
  evaluate(context?: any, forceFormula?: string): any {
    let formula = forceFormula || this.getValidationFormula() || '';
    if (formula === '') { return ''; }
    if (formula === 'true') { return true; }
    if (formula === 'false') { return false; }
    if (context != null && context[formula] !== undefined) { return context[formula]; }
    if (/^"[^"]*"$/.test(formula)) {
      return formula.replace(/^"+|"+$/g, '');
    }
    const identifiers = tokenize(formula)
      .filter(t => t.type === 'Identifier')
      .map(t => t.value);
    const ctx: any[] = [];
    identifiers.forEach(key => {
      let val: any = null;
      if (context != null && context[key] !== undefined) {
        val = context[key];
      } else if (AjfValidatedProperty.utils[key] !== undefined) {
        const util = AjfValidatedProperty.utils[key];
        val = util.fn;
      }
      ctx.push(val);
    });
    identifiers.push('execContext');
    ctx.push(AjfValidatedProperty._execContext);

    try {
      if (dbg.enabled) {
        dbg(`evaluating formula %s using context %j`, formula, ctx);
      }
      let f = new Function(...identifiers, `return ${formula}`);
      const res = f(...ctx);
      if (dbg.enabled) {
        dbg(`formula %s evaluated: result %s`, formula, res);
      }
      f = <any>null;
      return res;
    } catch (e) {
      console.log(e);
      if (dbg.enabled) {
        dbg(`formula %s not evaluated: error %j`, formula, e.message);
      }
      return false;
    }
  }

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

  static nextCounterValue(counterName: string, firstValue: number) {
    firstValue = firstValue != null ? firstValue : 0;
    if (this._execContext['$$' + counterName] == null) {
      this._execContext['$$' + counterName] = firstValue;
    } else {
      this._execContext['$$' + counterName]++;
    }
    return this._execContext['$$' + counterName];
  }
}
