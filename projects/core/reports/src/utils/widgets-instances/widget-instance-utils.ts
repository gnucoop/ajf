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

import {AjfContext, AjfFormula, createFormula, evaluateExpression} from '@ajf/core/models';
import {TranslocoService} from '@ajf/core/transloco';

export function evalAndTranslate(f: AjfFormula, context: AjfContext, ts: TranslocoService): any {
  const val = evaluateExpression(f.formula, context);
  if (typeof val === 'string') {
    return ts.translate(val);
  }
  return val;
}

/**
 * Evaluate a string with expression inside, identified by double square brackets
 * Example: "Number of positive identified: [[n_positive_campaign]]"
 */
export function evaluateProperty(
  expression: string,
  context: AjfContext,
  ts: TranslocoService,
): string {
  let htmlText = ts.translate(String(expression));
  const formulaRegEx: RegExp = /\[{2}(.+?)\]{2}/g;
  const matches: {idx: number; len: number; formula: string}[] = [];
  let match: RegExpExecArray | null;
  while (match = formulaRegEx.exec(htmlText)) {
    const idx = match.index;
    const len = match[0].length;
    matches.push({idx, len, formula: match[1]});
  }
  matches.reverse().forEach(m => {
    const val = evaluateExpression(m.formula, context);
    htmlText = `${htmlText.substring(0, m.idx)}${val}${htmlText.substring(m.idx + m.len)}`;
  });
  return htmlText;
}
