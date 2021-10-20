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

import {getCodeIdentifiers} from './expression-utils';

export function normalizeExpression(
  formula: string,
  ancestorsNames: {[prop: string]: number},
  prefix: number[],
): string {
  const ancestorsNameStrings = Object.keys(ancestorsNames);
  const tokens = getCodeIdentifiers(formula);
  tokens.forEach((t: any) => {
    if (ancestorsNameStrings.indexOf(t) > -1) {
      formula = formula.replace(
        new RegExp(`\\b${t}\\b`, 'g'),
        `${t}__${prefix.slice(ancestorsNames[t]).join('__')}`,
      );
    }
  });
  return formula;
}
