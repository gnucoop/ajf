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

function functionSerializer(_: any, v: any): any {
  if (typeof v === 'function') {
    return v.toString().replace(/[\r\n]+/g, ' ');
  }
  return v;
}

function functionDeserializer(_: any, v: any): any {
  if (typeof v === 'string' && /^function.*?\([^\0]*?\)\s*\{.*\}$/.test(v)) {
    const argsMatch = v
      .replace(/\/\/.*$|\/\*[\s\S]*?\*\//mg, '')
      .match(/\(.*?\)/m);
    if (argsMatch != null && argsMatch.length > 0) {
      const args = argsMatch[0]
        .replace(/^\(|\)$/, '')
        .match(/[^\s(),]+/g) || [];
      const bodyMatch = v.match(/\{(.*)\}/);
      if (bodyMatch != null && bodyMatch.length > 1) {
        const body = bodyMatch[1];
        const fx = args.concat(body);
        return Function.apply(null, fx);
      }
    }
  }
  return v;
}

export function deepCopy(oldObj: any): any {
  return JSON.parse(
    JSON.stringify(oldObj, functionSerializer),
    functionDeserializer
  );
}
