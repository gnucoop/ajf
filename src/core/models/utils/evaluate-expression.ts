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
import {tokenize} from 'esprima';

import {AjfExpressionUtils} from './expression-utils';

let execContext: any = {};

export function evaluateExpression(
    expression: string, context?: AjfContext, forceFormula?: string): any {
  let formula = forceFormula || expression || '';
  if (formula === '') {
    return '';
  }
  if (formula === 'true') {
    return true;
  }
  if (formula === 'false') {
    return false;
  }
  if (context != null && context[formula] !== undefined) {
    return context[formula];
  }
  if (/^"[^"]*"$/.test(formula)) {
    return formula.replace(/^"+|"+$/g, '');
  }
  const identifiers =
      tokenize(formula).filter((t: any) => t.type === 'Identifier').map((t: any) => t.value);
  const ctx: any[] = [];
  identifiers.forEach((key: string) => {
    let val: any = null;
    if (context != null && context[key] !== undefined) {
      val = context[key];
    } else if (AjfExpressionUtils.utils[key] !== undefined) {
      const util = AjfExpressionUtils.utils[key];
      val = util.fn;
    }
    ctx.push(val);
  });
  identifiers.push('execContext');
  ctx.push(execContext);

  try {
    let f = new Function(...identifiers, `return ${formula}`);
    const res = f(...ctx);
    f = <any>null;
    return res;
  } catch (e) {
    return false;
  }
}
