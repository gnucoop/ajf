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

import {AjfContext} from '@ajf/core/models';
import {TranslocoService} from '@ajf/core/transloco';

import {AjfReportContainerInstance} from '../../interface/reports-instances/report-container-instance';
import {AjfReportContainer} from '../../interface/reports/report-container';
import {AjfReportVariable} from '../../interface/reports/report-variable';
import {widgetToWidgetInstance} from '../widgets-instances/widget-to-widget-instance';

export function createReportContainerInstance(
  container: AjfReportContainer,
  context: AjfContext,
  ts: TranslocoService,
  variables: AjfReportVariable[] = [],
): AjfReportContainerInstance {
  const content = container.content.map(c => {
    return widgetToWidgetInstance(c, context, ts, variables);
  });
  return {
    container,
    content,
    styles: container.styles,
  };
}
