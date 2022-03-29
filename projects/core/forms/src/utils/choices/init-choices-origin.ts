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

import {firstValueFrom} from 'rxjs';
import {toArray} from 'rxjs/operators';

import {AjfChoicesOrigin} from '../../interface/choices/choices-origin';
/**
 * Called by form-rederer
 * take as param an AjfChoicesOrigin&lt;any&gt; and return an Promise&lt;void&gt; for handling async
 * event
 */
export async function initChoicesOrigin(origin: AjfChoicesOrigin<any>): Promise<void> {
  /** fixed don't use async evente the promise is resolved */
  if (origin.type === 'fixed') {
    return;
  }
  /** apply function and than return resolve promise */
  if (origin.type === 'function') {
    origin.choices = origin.generator();
    return;
  }
  /** modify origin.choices with result of resolved promise */
  if (origin.type === 'promise') {
    return origin.generator.then(choices => (origin.choices = choices)).then();
  }
  /** modify origin.choices with result of subscribed observable */
  if (origin.type === 'observable') {
    if (origin.generator != null) {
      origin.choices = [];
      return firstValueFrom(origin.generator.pipe(toArray()))
        .then(choices => (origin.choices = choices))
        .then();
    }
  }
  /** modify origin.choices with result of subscribed observable */
  if (origin.type === 'observableArray') {
    if (origin.generator != null) {
      origin.choices = [];
      return firstValueFrom(origin.generator)
        .then(choices => (origin.choices = choices))
        .then();
    }
  }
  return;
}
