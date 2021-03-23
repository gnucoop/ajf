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

import {AjfContext} from '@ajf/core/models';
import {Type} from '@angular/core';

import {AjfBaseFieldComponent} from '../../base-field';
import {AjfFieldInstanceCreate} from '../../utils/fields-instances/create-field-instance';
import {AjfFieldInstance} from '../fields-instances/field-instance';

/**
 * Represents the association between an AjfFieldType and the
 * components used to render it.
 */
export interface AjfFieldComponentsMap {

  /**
   * The field type.
   */
  [key: number]: {

    /**
     * The field component.
     */
    component: Type<AjfBaseFieldComponent>,

    /**
     * The readonly field component.
     */
    readOnlyComponent?: Type<AjfBaseFieldComponent>,

    /**
     * The Angular inputs of the components.
     */
    inputs?: {[key: string]: any},

    /**
     * The signature and return type of the method used for create Instance.
     */
    createInstance?: (instance: AjfFieldInstanceCreate, context: AjfContext) => AjfFieldInstance;

    /**
     * If true, the field has choices.
     */
    isFieldWithChoice?: boolean;
  };
}
