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

import {AjfContext} from './context';
import {AjfStringIdentifier} from './string-identifier';

export const buildStringIdentifier =
    (stringIdentifier: AjfStringIdentifier[]|undefined, context: AjfContext, emptyString = '') => {
      if (stringIdentifier == null) {
        return emptyString;
      }
      const str: string[] = stringIdentifier.map(s => {
        const values: string[] = [];
        if (s.value != null && s.value.length > 0) {
          s.value.forEach(curValue => {
            let val: string|number|string[]|number[]|null = null;
            const vp: string[] = curValue.split('.');
            vp.forEach(k => {
              if (context[k] !== undefined) {
                val = context[k];
              }
            });
            if (val != null && (val as unknown) instanceof Array &&
                (val as (string | number)[]).length > 0) {
              val = (val as (string | number)[]).join(', ');
            }
            if (val != null) {
              values.push(`${val}`);
            }
          });
        }
        return `${s.label}: ${values.length > 0 ? values.join(', ') : emptyString}`;
      });
      return str.join(' - ');
    };
