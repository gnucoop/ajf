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

export function trFormula(f: AjfFormula, context: AjfContext, ts: TranslocoService): any {
  let formula = f.formula;
  if (formula.substring(0, 1) === '"' || formula.substring(0, 1) === "'") {
    const ft = formula.slice(1, -1);
    const transFt =
      ft != null && typeof ft === 'string' && ft.trim().length > 0 ? ts.translate(ft) : ft;
    if (ft.length > 0) {
      formula = `"${transFt}"`;
    }
  } else {
    formula =
      formula != null && typeof formula === 'string' && formula.trim().length > 0
        ? ts.translate(formula)
        : formula;
  }
  let res;
  try {
    res = evaluateExpression(formula, context);
  } catch (_) {
    res = formula;
  }
  return res;
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
  const formulaRegEx: RegExp = /\[{2}(.+?)\]{2}/g;
  const matches: {idx: number; len: number; formula: AjfFormula}[] = [];
  let match: RegExpExecArray | null;
  let htmlText = expression;
  while ((match = formulaRegEx.exec(htmlText))) {
    const idx = match.index;
    const len = match[0].length;
    const formula = createFormula({formula: match[1]});
    matches.push({idx, len, formula});
  }
  matches.reverse().forEach(m => {
    let calcValue;
    try {
      calcValue = evaluateExpression(m.formula.formula, context);
    } catch (e) {
      calcValue = '';
    }
    htmlText = `${htmlText.substring(0, m.idx)}${calcValue}${htmlText.substring(m.idx + m.len)}`;
  });
  htmlText = htmlText === '[[]]' ? 'false' : htmlText;
  return htmlText != null && htmlText.length > 0 ? ts.translate(htmlText) : htmlText;
}
