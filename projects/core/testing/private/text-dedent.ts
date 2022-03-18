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

/**
 * Template string function that can be used to dedent a given string
 * literal. The smallest common indentation will be omitted.
 */
export function dedent(strings: TemplateStringsArray, ...values: any[]) {
  let joinedString = '';
  for (let i = 0; i < values.length; i++) {
    joinedString += `${strings[i]}${values[i]}`;
  }
  joinedString += strings[strings.length - 1];

  const matches = joinedString.match(/^[ \t]*(?=\S)/gm);
  if (matches === null) {
    return joinedString;
  }

  const minLineIndent = Math.min(...matches.map(el => el.length));
  const omitMinIndentRegex = new RegExp(`^[ \\t]{${minLineIndent}}`, 'gm');
  return minLineIndent > 0 ? joinedString.replace(omitMinIndentRegex, '') : joinedString;
}
