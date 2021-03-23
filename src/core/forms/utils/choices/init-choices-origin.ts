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

import {AjfChoicesFunctionOrigin} from '../../interface/choices/choices-function-origin';
import {
  AjfChoicesObservableArrayOrigin
} from '../../interface/choices/choices-observable-array-origin';
import {AjfChoicesObservableOrigin} from '../../interface/choices/choices-observable-origin';
import {AjfChoicesOrigin} from '../../interface/choices/choices-origin';
import {AjfChoicesPromiseOrigin} from '../../interface/choices/choices-promise-origin';
/**
 * Called by form-rederer
 * take as param an AjfChoicesOrigin&lt;any&gt; and return an Promise&lt;void&gt; for handling async
 * event
 */
export function initChoicesOrigin(origin: AjfChoicesOrigin<any>): Promise<void> {
  /** fixed don't use async evente the promise is resolved */
  if (origin.type === 'fixed') {
    return Promise.resolve();
  }
  /** apply function and than return resolve promise */
  if (origin.type === 'function') {
    const fo = origin as AjfChoicesFunctionOrigin<any>;
    fo.choices = fo.generator();
    return Promise.resolve();
  }
  /** modify origin.choices with result of resolved promise */
  if (origin.type === 'promise') {
    const po = origin as AjfChoicesPromiseOrigin<any>;
    return po.generator.then(choices => po.choices = choices).then();
  }
  /** modify origin.choices with result of subscribed observable */
  if (origin.type === 'observable') {
    const obso = origin as AjfChoicesObservableOrigin<any>;
    if (obso.generator != null) {
      obso.choices = [];
      return new Promise<void>(res => {
        obso.generator.subscribe(
            c => obso.choices.push(c),
            () => {},
            () => res(),
        );
      });
    }
  }
  /** modify origin.choices with result of subscribed observable */
  if (origin.type === 'observableArray') {
    const aoo = origin as AjfChoicesObservableArrayOrigin<any>;
    if (aoo.generator != null) {
      aoo.choices = [];
      return new Promise<void>(res => {
        aoo.generator.subscribe(choices => {
          aoo.choices = choices;
          res();
        });
      });
    }
  }
  return Promise.resolve();
}
