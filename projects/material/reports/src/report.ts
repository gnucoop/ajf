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
import {
  AjfReportInstance,
  AjfReportRenderer as CoreReportRenderer,
  AjfWidgetInstance,
} from '@ajf/core/reports';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ajf-report',
  templateUrl: 'report.html',
  styleUrls: ['report.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AjfReportRenderer extends CoreReportRenderer {
  @Output() filterWidgetChange = new EventEmitter<{context: AjfContext, report?: AjfReportInstance}>();

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  filterWidgetChanged(changes: {context: AjfContext, widget: AjfWidgetInstance}) {
    const report = this.instance!;
    if (report.content!.content.length === 1) {
      // Report likely has 1 global layout widget with a filter,
      // create a copy of the report with the updated layout widget
      const layout = changes.widget;
      const contentContent = [layout];
      const content = {...report.content!, content: contentContent};
      const newReport = {...report, content};
      this.filterWidgetChange.emit({context: changes.context, report: newReport});
    } else {
      this.filterWidgetChange.emit({context: changes.context});
    }
  }
}
