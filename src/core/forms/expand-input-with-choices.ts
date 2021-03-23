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

import {Pipe, PipeTransform} from '@angular/core';

import {
  AjfFieldWithChoicesInstance
} from './interface/fields-instances/field-with-choices-instance';

/**
 * It returns true if AjfFieldWithChoices is forceExpanded and filteredChoices length is
 * less than equal threshold.
 */
@Pipe({name: 'ajfExpandFieldWithChoices'})
export class AjfExpandFieldWithChoicesPipe implements PipeTransform {
  transform(instance: AjfFieldWithChoicesInstance<any>, threshold: number): boolean {
    return !instance.node.forceNarrow &&
        (instance.node.forceExpanded ||
         (instance.filteredChoices && instance.filteredChoices.length <= threshold));
  }
}
