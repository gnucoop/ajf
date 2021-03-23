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
import {AjfBaseSlideInstance} from './interface/slides-instances/base-slide-instance';

/**
 * It checks if idx is a valid index for slide parameter.
 *
 * @export
 * @class AjfValidSlidePipe
 */
@Pipe({name: 'ajfValidSlide', pure: false})
export class AjfValidSlidePipe implements PipeTransform {
  transform(slide: AjfBaseSlideInstance, idx: number): boolean {
    if (idx == null || typeof idx !== 'number') {
      return false;
    }
    if (idx >= slide.slideNodes.length) {
      return true;
    }
    return slide.slideNodes[idx]
        .map(n => {
          if (n.visible && Object.keys(n).indexOf('valid') > -1) {
            return (<any>n).valid;
          }
          return true;
        })
        .reduce((v1, v2) => v1 && v2, true);
  }
}
