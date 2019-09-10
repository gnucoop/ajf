/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
import {TranslateService} from '@ngx-translate/core';

import {AjfReportInstance} from '../../interface/reports-instances/report-instance';
import {AjfReport} from '../../interface/reports/report';

import {createReportContainerInstance} from './create-report-container-instance';

export function createReportInstance(
    report: AjfReport, context: AjfContext, ts: TranslateService): AjfReportInstance {
  (report.variables || []).forEach(variable => {
    context[variable.name] = evaluateExpression(variable.formula.formula, context);
  });
  return {
    report,
    header: report.header ? createReportContainerInstance(report.header, context, ts) : undefined,
    content: report.content ? createReportContainerInstance(report.content, context, ts) :
                              undefined,
    footer: report.footer ? createReportContainerInstance(report.footer, context, ts) : undefined,
    styles: report.styles || {},
  };
}
