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

import {AjfCondition, AjfJsonSerializable} from '@ajf/core/models';
import {deepCopy} from '@ajf/core/utils';


export class AjfValidationResult {

  result: boolean;
  error: string;
  clientValidation: boolean;

  /**
   * this constructor will assign the parameters value to a class variables
   * @param res : boolean
   * @param err : string
   * @cVal : boolean
   */
  constructor(res: boolean, err: string, cVal: boolean) {
    this.result = res;
    this.error = err;
    this.clientValidation = cVal;
  }
}

/**
 * This class will define an ajf validation
 */
export class AjfValidation extends AjfCondition {
  clientValidation: boolean;
  errorMessage: string;

  /**
   * this static method will load an AjfValidation from json
   * @param obj  : any - object validation
   * @return AjfValidation
   */
  static fromJson(obj: any): AjfValidation {
    obj = deepCopy(obj);
    return new AjfValidation(obj);
  }

  /**
   * this static method will get an ajfValidation with maxValue setted
   * @param maxValue : number - max value
   * @return AjfValidation
   */
  static getMaxCondition(maxValue: number): AjfValidation {
    return new AjfValidation({
      condition : '$value <= ' + maxValue.toString(),
      errorMessage : 'Value must be <= ' + maxValue.toString()
    });
  }

  /**
   * this static method will get an ajfValidation with minValue setted
   * @param minValue : number - min value
   * @return AjfValidation
   */
  static getMinCondition(minValue: number): AjfValidation {
    return new AjfValidation({
      condition : '$value >= ' + minValue.toString(),
      errorMessage : 'Value must be >= ' + minValue.toString()
    });
  }

  /**
   * this static method will get an ajfValidation with notEmpty setted
   * @return AjfValidation
   */
  static getNotEmptyCondition(): AjfValidation {
    return new AjfValidation({
      condition : `notEmpty($value)`,
      errorMessage : `Value must not be empty`
    });
  }

  /**
   * this static method will get an ajfValidation with maxDigit setted
   * @return AjfValidation
   */
  static getMaxDigitsCondition(maxValue: number): AjfValidation {
    return new AjfValidation({
      condition : `$value ? $value.toString().length <= ${maxValue.toString()} : false`,
      errorMessage : 'Digits count must be <= ' + maxValue.toString()
    });
  }

  /**
   * this static method will get an ajfValidation with minDigit setted
   * @return AjfValidation
   */
  static getMinDigitsCondition(minValue: number): AjfValidation {
    return new AjfValidation({
      condition : `$value ? $value.toString().length >= ${minValue.toString()} : false`,
      errorMessage : 'Digits count must be >= ' + minValue.toString()
    });
  }

  /**
   * this constructor will assign the obj value to a class variables and call
   * super()
   */
  constructor(obj?: any) {
    super(obj);
    this.clientValidation = obj && obj.clientValidation || false;
    this.errorMessage = obj && obj.errorMessage || 'Undefined Error';

    this.jsonExportedMembers = this.jsonExportedMembers
      .concat(['clientValidation', 'errorMessage']);
  }

  /**
   * this public method will evaluate context or forceFormula
   * @param context      : any - context
   * @param forceFormula : string - formula
   * @return AjfValidationResult
   */
  evaluate(context?: any, forceFormula?: string): AjfValidationResult {
    return new AjfValidationResult(super.evaluate(context, forceFormula),
                                   this.errorMessage, this.clientValidation);
  }
}

/**
 * This class will define an ajf validation group
 */
export class AjfValidationGroup extends AjfJsonSerializable {
  forceValue: AjfCondition;
  maxValue: AjfValidation | null;
  minValue: AjfValidation | null;
  notEmpty: AjfValidation | null;
  maxDigits: AjfValidation | null;
  minDigits: AjfValidation | null;
  conditions: AjfValidation[];

  /**
   * this static method will load an AjfValidationGroup from json
   * @param obj  : any - object validationGroup
   * @return AjfValidationGroup
   */
  static fromJson(obj: any): AjfValidationGroup {
    let keys: string[] = Object.keys(obj);

    if (keys.indexOf('maxValue') > -1 && typeof obj.maxValue === 'number') {
      obj.maxValue = AjfValidation.getMaxCondition(obj.maxValue);
    }

    if (keys.indexOf('minValue') > -1 && typeof obj.minValue === 'number') {
      obj.minValue = AjfValidation.getMinCondition(obj.minValue);
    }

    if (keys.indexOf('notEmpty') > -1) {
      obj.notEmpty = AjfValidation.getNotEmptyCondition();
    }

    if (keys.indexOf('forceValue') > -1) {
      obj.forceValue = AjfCondition.fromJson(obj.forceValue);
    }

    if (keys.indexOf('maxDigits') > -1 && typeof obj.maxDigits === 'number') {
      obj.maxDigits = AjfValidation.getMaxDigitsCondition(obj.maxDigits);
    }

    if (keys.indexOf('minDigits') > -1 && typeof obj.minDigits === 'number') {
      obj.minDigits = AjfValidation.getMinDigitsCondition(obj.minDigits);
    }

    if (keys.indexOf('conditions') > -1 && obj.conditions instanceof Array) {
      let conditions: AjfCondition[] = [];
      for (let c of obj.conditions) {
        conditions.push(AjfValidation.fromJson(c));
      }
      obj.conditions = conditions;
    }

    return new AjfValidationGroup(obj);
  }

  /**
   * this constructor will assign the obj value to a class variables
   * @param obj : any
   */
  constructor(obj?: any) {
    super(obj);

    this.forceValue = obj && obj.forceValue || null;
    this.maxValue = obj && obj.maxValue || null;
    this.minValue = obj && obj.minValue || null;
    this.notEmpty = obj && obj.notEmpty || null;
    this.maxDigits = obj && obj.maxDigits || null;
    this.minDigits = obj && obj.minDigits || null;
    this.conditions = obj && obj.conditions || [];

    this.jsonExportedMembers = this.jsonExportedMembers
      .concat([
        'forceValue', 'maxValue', 'minValue', 'notEmpty',
        'maxDigits', 'minDigits', 'conditions'
      ]);
  }

  toJson(): any {
    const json: any = {};
    if (this.forceValue != null) {
      json['forceValue'] = true;
    }

    if (this.maxValue != null) {
      json['maxValue'] = this.maxValue.condition.replace('$value <= ', '');
    }

    if (this.minValue != null) {
      json['minValue'] = this.minValue.condition.replace('$value >= ', '');
    }

    if (this.notEmpty != null) {
      json['notEmpty'] = true;
    }

    if (this.maxDigits != null) {
      json['maxDigits'] = this.maxDigits.condition.replace(
        '$value ? $value.toString().length <=  : false', '');
    }

    if (this.minDigits != null) {
      json['minDigits'] = this.minDigits.condition.replace(
        '$value ? $value.toString().length >=  : false', '');
    }

    if (this.conditions != null) {
      json['conditions'] = this.conditions.map(c => c.toJson());
    }

    return json;
  }

  /**
   * this protected method evaluate max value
   * @param value : any
   * @return AjfValidationResult
   */
  protected _evaluateMaxValue(value: any) {
    if (this.maxValue == null) { return null; }
    return this.maxValue.evaluate({'$value' : value});
  }

  /**
   * this protected method evaluate min value
   * @param value : any
   * @return AjfValidationResult
   */
  protected _evaluateMinvalue(value: any) {
    if (this.minValue == null) { return null; }
    return this.minValue.evaluate({'$value' : value});
  }

  /**
   * this protected method evaluate not empty value
   * @param value : any
   * @return AjfValidationResult
   */
  protected _evaluateNotEmpty(value: any) {
    if (this.notEmpty == null) { return null; }
    return this.notEmpty.evaluate({'$value' : value});
  }

  /**
   * this protected method evaluate conditions
   * @param context : any
   * @return AjfValidationResult[]
   */
  protected _evaluateConditions(context: any): AjfValidationResult[] {
    let res: AjfValidationResult[] = [];
    this.conditions.forEach((cond) => {
      res.push(cond.evaluate(context));
    });
    return res;
  }

  /**
   * this public method evaluate
   * @param value   : any
   * @param context : any
   * @return AjfValidationResult[]
   */
  evaluate(value: any, context?: any): AjfValidationResult[] {
    let res: AjfValidationResult[] = [];
    let ctx = deepCopy(context);
    ctx['$value'] = value;
    res = this._evaluateConditions(ctx);
    if (this.maxValue) {
      const maxValue = this._evaluateMaxValue(value);
      if (maxValue != null) {
        res.push();
      }
    }
    if (this.minValue) {
      const minValue = this._evaluateMinvalue(value);
      if (minValue != null) {
        res.push(minValue);
      }
    }
    if (this.notEmpty) {
      const notEmpty = this._evaluateNotEmpty(value);
      if (notEmpty != null) {
        res.push(notEmpty);
      }
    }
    if (this.maxDigits) {
      res.push(this.maxDigits.evaluate({'$value' : value}));
    }
    if (this.minDigits) {
      res.push(this.minDigits.evaluate({'$value' : value}));
    }
    return res;
  }
  /**
   * this public method evaluate force value
   * @param context : any
   * @return string
   */
  evaluateForceValue(context: any) {
    return this.forceValue.evaluate(context);
  }
}
