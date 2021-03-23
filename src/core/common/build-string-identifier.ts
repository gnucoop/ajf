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

/**
 * emptyString: the string displayed when the context has no match.
 * entriesDivider: the string displauyed beetwen entries
 * labelSuffix: the string displayed between the label and its values
 * valuesDivider: the string dispayed between values
 * @export
 * @interface BuildStringIdentifierOpts
 */
export interface BuildStringIdentifierOpts {
  emptyString?: string;
  entriesDivider?: string;
  labelSuffix?: string;
  valuesDivider?: string;
}

const defaultOpts = {
  emptyString: 'Not specified',
  entriesDivider: ' - ',
  labelSuffix: ': ',
  valuesDivider: ', ',
};

export const buildStringIdentifierOpts =
    (opts?: BuildStringIdentifierOpts): Required<BuildStringIdentifierOpts> =>
        ({...defaultOpts, ...opts});

export const buildStringIdentifier =
    (stringIdentifier: AjfStringIdentifier[]|undefined, context: AjfContext,
     opts?: BuildStringIdentifierOpts): string => {
      const strings = {...defaultOpts, ...opts} as Required<BuildStringIdentifierOpts>;
      if (stringIdentifier == null) {
        return strings.emptyString;
      }
      const str: string[] = stringIdentifier.map(s => {
        const values: string[] = [];
        if (s.value != null && s.value.length > 0) {
          s.value.forEach(curValue => {
            const vp: string[] = curValue.split('.');
            let curContext = context;
            let val: any = null;
            vp.forEach(k => {
              if (curContext[k] !== undefined) {
                val = context[k];
                curContext = context[k];
              }
            });
            if (val != null && val instanceof Array && val.length > 0) {
              val = val.map(v => `${v}`).join(', ');
            }
            if (val != null) {
              values.push(`${val}`);
            }
          });
        }
        return `${s.label}: ${values.length > 0 ? values.join(', ') : strings.emptyString}`;
      });
      return str.join(' - ');
    };
