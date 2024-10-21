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

import {AjfContext, evaluateExpression} from '@ajf/core/models';
import {TranslocoService} from '@ajf/core/transloco';

import {AjfReportInstance} from '../../interface/reports-instances/report-instance';
import {AjfReport} from '../../interface/reports/report';

import {createReportContainerInstance} from './create-report-container-instance';

export function createReportInstance(
  report: AjfReport,
  context: AjfContext,
  ts: TranslocoService,
): AjfReportInstance {
  (report.variables || []).forEach(variable => {
    context[variable.name] = evaluateExpression(variable.formula.formula, context);
  });
  return {
    report,
    header: report.header
      ? createReportContainerInstance(report.header, context, ts, report.variables)
      : undefined,
    content: report.content
      ? createReportContainerInstance(report.content, context, ts, report.variables)
      : undefined,
    footer: report.footer
      ? createReportContainerInstance(report.footer, context, ts, report.variables)
      : undefined,
    styles: report.styles || {},
  };
}

export function evaluateReportVariables(report: AjfReport, context: AjfContext): AjfContext {
  const variableContext: AjfContext = {};
  (report.variables || []).forEach(variable => {
    variableContext[variable.name] = evaluateExpression(variable.formula.formula, context);
  });
  return variableContext;
}
