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


/**
 * This class will define an ajf warning result
 */
export class AjfWarningResult {

  result: boolean;
  warning: string;

  /**
   * this constructor will assign the parameters value to a class variables
   * @param res : boolean
   * @param wrn : string
   */
  constructor(res: boolean, wrn: string) {
    this.result = res;
    this.warning = wrn;
  }
}

/**
 * This class will define an ajf warning
 */
export class AjfWarning extends AjfCondition {
  warningMessage: string;

  /**
   * this static method will load an AjfWarning from json
   * @param obj  : any - object warning
   * @return AjfWarning
   */
  static fromJson(obj: any): AjfWarning { return new AjfWarning(obj); }

  static getNotEmptyWarning(): AjfWarning {
    return new AjfWarning({
      condition : `notEmpty($value)`,
      warningMessage : `Value must not be empty`
    });
  }

  /**
   * this constructor will assign the obj value to a class variables and call
   * super()
   */
  constructor(obj?: any) {
    super(obj);
    this.warningMessage = obj && obj.warningMessage || 'Undefined Error';
    this.jsonExportedMembers = this.jsonExportedMembers
      .concat(['warningMessage']);
  }

  /**
   * this public method will evaluate context or forceFormula
   * @param context      : any - context
   * @param forceFormula : string - formula
   * @return AjfWarningResult
   */
  evaluate(context?: any, forceFormula?: string): AjfWarningResult {
    return new AjfWarningResult(super.evaluate(context, forceFormula),
                                this.warningMessage);
  }
}

/**
 * This class will define an ajf warning group
 */
export class AjfWarningGroup extends AjfJsonSerializable {
  notEmpty: AjfWarning | null;
  conditions: AjfWarning[];

  /**
   * this static method will load an AjfWarningGroup from json
   * @param obj  : any - object warningGroup
   * @return AjfValidationGroup
   */
  static fromJson(obj: any): AjfWarningGroup {
    let keys: string[] = Object.keys(obj);

    if (keys.indexOf('notEmpty') > -1) {
      obj.notEmpty = AjfWarning.getNotEmptyWarning();
    }

    if (keys.indexOf('conditions') > -1 && obj.conditions instanceof Array) {
      let conditions: AjfCondition[] = [];
      for (let c of obj.conditions) {
        conditions.push(AjfWarning.fromJson(c));
      }
      obj.conditions = conditions;
    }

    return new AjfWarningGroup(obj);
  }

  /**
   * this constructor will assign the obj value to a class variables
   * @param obj : any
   */
  constructor(obj?: any) {
    super(obj);

    this.notEmpty = obj && obj.notEmpty || null;
    this.conditions = obj && obj.conditions || null;

    this.jsonExportedMembers = this.jsonExportedMembers
      .concat(['notEmpty', 'conditions']);
  }

  /**
   * this protected method evaluate conditions
   * @param context : any
   * @return AjfWarningResult[]
   */
  protected _evaluateConditions(context: any): AjfWarningResult[] {
    let res: AjfWarningResult[] = [];
    this.conditions.forEach((cond) => {
      res.push(cond.evaluate(context));
    });
    return res;
  }

  /**
   * this public method evaluate
   * @param value   : any
   * @param context : any
   * @return AjfWarningResult[]
   */
  evaluate(context?: any): AjfWarningResult[] {
    let res: AjfWarningResult[] = this._evaluateConditions(context);
    return res;
  }
}
