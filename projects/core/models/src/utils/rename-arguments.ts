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

import {getArgumentNames} from './expression-utils';

export function renameArguments(
  formula: string,
  ancestorsNames: {[prop: string]: number},
  prefix: number[],
): string {
  const ancestorsNameStrings = Object.keys(ancestorsNames);
  const names = getArgumentNames(formula);
  names.delete('$value');
  for (const name of names) {
    if (ancestorsNameStrings.indexOf(name) > -1) {
      formula = formula.replace(
        new RegExp(`\\b${name}\\b`, 'g'),
        `${name}__${prefix.slice(ancestorsNames[name]).join('__')}`,
      );
    }
  }
  return formula;
}
