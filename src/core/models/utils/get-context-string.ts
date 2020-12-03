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

import {AjfExpressionUtils} from './expression-utils';

export function getContextString(context?: AjfContext): string {
  let fstr = AjfExpressionUtils.UTIL_FUNCTIONS;
  if (context instanceof Array) {
    for (let i = 0; i < context.length; i++) {
      fstr = `${fstr}var ${context[i]} = true;`;
    }
  } else if (context != null) {
    Object.keys(context).forEach(x => {
      let val: any = context[x];
      if (val == null || isNaN(Number(val)) || val === '' || val instanceof Array) {
        if (val instanceof Array) {
          for (let i = 0; i < val.length; i++) {
            val[i] =
                (val == null || isNaN(Number(val[i])) || val[i] === '') && val[i] || Number(val[i]);
          }
        }
        val = JSON.stringify(val);
      } else {
        val = Number(val);
      }
      fstr = `${fstr}var ${x} = ${val}; `;
    });
  }
  return fstr;
}
