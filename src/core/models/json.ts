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

export abstract class AjfJsonSerializable {
  private _jsonExportedMembers: string[] = [];

  static fromJson(_: any): AjfJsonSerializable {
    throw new Error('Not implemented');
  }

  private static _valueToJson(val: any): any {
    if (val instanceof Array) {
      val = val.map((v) => AjfJsonSerializable._valueToJson(v));
    }

    return val instanceof AjfJsonSerializable ? val.toJson() : val;
  }

  /**
   * this private static method will get property to json
   * @param obj  : any - object json
   * @param prop : string - property
   * @return any
   */
  private static _propertyToJson(obj: any, prop: string): any {
    let val: any;
    let getter = `get${prop.toLocaleUpperCase().substr(0, 1)}${prop.substr(1)}`;
    if (obj.hasOwnProperty(prop)) {
      val = obj[prop];
    } else if (typeof obj[getter] === 'function') {
      val = obj[getter]();
    } else {
      val = obj[prop];
    }

    return AjfJsonSerializable._valueToJson(val);
  }

  /**
   * this protected method will get json exported members
   * @return string[] - json exported members
   */
  protected get jsonExportedMembers(): string[] {
    return this._jsonExportedMembers;
  }

  /**
   * this protected method will set json exported members
   * @param string[] - json exported members
   */
  protected set jsonExportedMembers(members: string[]) {
    this._jsonExportedMembers = members;
  }

  constructor(_?: any) {}

  /**
   * this method will load json
   * @return any - json
   */
  toJson(): any {
    let json: any = {};

    this._jsonExportedMembers.forEach(
        (m) => { json[m] = AjfJsonSerializable._propertyToJson(this, m); });

    return json;
  }
}
