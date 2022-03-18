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

import {AjfRepeatingSlideInstance} from './interface/slides-instances/repeating-slide-instance';
import {AjfSlideInstance} from './interface/slides-instances/slide-instance';

/**
 * It casts an AjfSlideInstance as AjfRepeatingSlideInstance.
 */
@Pipe({name: 'ajfAsRepeatingSlideInstance'})
export class AjfAsRepeatingSlideInstancePipe implements PipeTransform {
  transform(instance: AjfSlideInstance): AjfRepeatingSlideInstance {
    return instance as unknown as AjfRepeatingSlideInstance;
  }
}
