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

import {AjfContext, AjfFormula, evaluateExpression} from '@ajf/core/models';
import {TranslocoService} from '@ajf/core/transloco';

export function trFormula(f: AjfFormula, context: AjfContext, ts: TranslocoService): any {
  let formula = f.formula;
  if (formula.substr(0, 1) === '"' || formula.substr(0, 1) === '\'') {
    const ft = formula.slice(1, -1);
    const transFt =
        ft != null && typeof ft === 'string' && ft.trim().length > 0 ? ts.translate(ft) : ft;
    if (ft.length > 0) {
      formula = `"${transFt}"`;
    }
  } else {
    formula = formula != null && typeof formula === 'string' && formula.trim().length > 0 ?
        ts.translate(formula) :
        formula;
  }
  return evaluateExpression(formula, context);
}
