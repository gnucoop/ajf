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

import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {timer} from 'rxjs';

import {AjfChartType, AjfReportWidgetType} from '@ajf/core/reports';
import {sizedEnumToStringArray} from '@ajf/core/utils';
import {AjfReportBuilderService} from './report-builder-service';


@Component({
  moduleId: module.id,
  selector: 'ajf-report-builder-widgets-toolbar',
  templateUrl: 'widgets-toolbar.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * This class will define an Ajf builder fields toolbar
 */
export class AjfReportBuilderWidgetsToolbar {
  // fieldTypes is an array string that contains the field options
  chartTypes: string[] = sizedEnumToStringArray(AjfChartType);
  widgetTypes: string[] = sizedEnumToStringArray(AjfReportWidgetType);


  /**
   *
   * @param private _afjBuilderService: AjfBuilderService
   */
  constructor(private _service: AjfReportBuilderService) {
    // delete Column widget
    let pos = this.widgetTypes.indexOf('Column');
    if (pos !== -1) {
      this.widgetTypes.splice(pos, 1);
    }
  }
  /**
   *  sign the start of mouse drag with 200 ms of delay
   *
   * @memberOf AjfReportBuilderContent
   */
  onDragStartHandler(): void {
    let s = timer(200)
      .subscribe(() => {
        if (s != null) { s.unsubscribe(); }
        this._service.dragStarted();
      });
  }

  /**
   * sign the end of mouse drag
   *
   * @memberOf AjfReportBuilderContent
   */
  onDragEndHandler(): void {
    this._service.dragEnded();
  }
}
