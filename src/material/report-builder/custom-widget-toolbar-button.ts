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

import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {AjfReportBuilderService} from './report-builder-service';
import {ajfWidgetTypeStringToIcon, ajfWidgetTypeStringToLabel} from './utils';


@Component({
  moduleId: module.id,
  selector: 'ajf-report-builder-custom-widget-toolbar-button',
  inputs: ['widgetType', 'position'],
  templateUrl: 'custom-widget-toolbar-button.html',
  styleUrls: ['custom-widget-toolbar-button.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * This class will define an ajf builder field toolbar button
 * @implements : OnInit
 */
export class AjfReportBuilderCustomWidgetToolbarButton implements OnInit {
  widgetType: string;
  widgetIcon: string;
  widgetLabel: string;
  position: number;

  /**
   * this constructor will init icon registry
   */
  constructor(
    private _service: AjfReportBuilderService
  ) {
  }

  /**
   * this method call a service method for remove custom widget
   *
   * @memberOf AjfReportBuilderCustomWidgetToolbarButton
   */
  remove() {
    this._service.remove('customWidgets', this.position);
  }
  /**
   * this method will init  fieldIcon and fieldLabel
   */
  ngOnInit(): void {
    this.widgetIcon = ajfWidgetTypeStringToIcon(this.widgetType);
    this.widgetLabel = ajfWidgetTypeStringToLabel(this.widgetType);
  }
}
