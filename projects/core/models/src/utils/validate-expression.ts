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

import {AjfContext} from '@ajf/core/common';

import {getContextString} from './get-context-string';

let cachedContext: any = {};
let cachedContextString = '{}';

export function validateExpression(str: string, context?: AjfContext): boolean {
  if (context === cachedContext) {
    console.log('cache hit');
  } else {
    cachedContext = context;
    cachedContextString = getContextString(context);
  }
  let ctx = cachedContextString;
  try {
    let f = new Function(`${ctx}${str}`);
    f();
    f = <any>null;
    return true;
  } catch (e) {
    return false;
  }
}
