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

import {deepCopy} from '@ajf/core/utils';
import {AjfValidatedProperty} from './validated-property';

/**
 * This class will define an Ajf condition
 */
export class AjfCondition extends AjfValidatedProperty {
  condition: string;
  /**
   * this method will get true condition
   * @return AjCondition
   */
  static alwaysCondition(): AjfCondition {
    return new AjfCondition({condition : 'true'});
  }
  /**
   * this method will get false condition
   * @return AjCondition
   */
  static neverCondition(): AjfCondition {
    return new AjfCondition({condition : 'false'});
  }
  /**
   * this method will load an AjfCondition from json
   * @param obj : any - object condition
   * @return AjfCondition
   */
  static fromJson(obj: any): AjfCondition {
    obj = deepCopy(obj);
    return new AjfCondition(obj);
  }

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = [ 'condition' ];

    this.condition = obj && obj.condition || '';
  }

  getValidationFormula(): string { return this.condition; }
}
