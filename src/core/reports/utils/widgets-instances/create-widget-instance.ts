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
import {AjfFormSerializer} from '@ajf/core/forms';
import {AjfWidgetInstance} from '../../interface/widgets-instances/widget-instance';
import {AjfWidget} from '../../interface/widgets/widget';
import {AjfReportVariable} from '../../interface/reports/report-variable';

export function createWidgetInstance(
  widget: AjfWidget,
  context: AjfContext,
  _ts: TranslocoService,
  variables: AjfReportVariable[] = [],
): AjfWidgetInstance {
  let filter = undefined;
  if (widget.filter != null && widget.filter.schema != null) {
    filter = {
      form: AjfFormSerializer.fromJson(widget.filter.schema, context),
      context,
      variables,
    };
  }
  return {
    widget,
    widgetType: widget.widgetType,
    visible: evaluateExpression(widget.visibility.condition, context),
    styles: widget.styles || {},
    filter,
  };
}
