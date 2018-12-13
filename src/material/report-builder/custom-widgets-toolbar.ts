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

import {
  ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation
} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {Subscription, timer} from 'rxjs';

import {AjfReportBuilderCustomWidgetDialog} from './custom-widget-dialog';
import {AjfReportBuilderService} from './report-builder-service';

export interface AjfReportStyles {
  [style: string]: any;
}

export interface CustomWidget {
  json: string;
  type: string;
}

export interface CustomWidgets {
  widgets: CustomWidget[];
}


@Component({
  moduleId: module.id,
  selector: 'ajf-report-builder-custom-widgets-toolbar',
  styleUrls: ['custom-widgets-toolbar.css'],
  templateUrl: 'custom-widgets-toolbar.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * This class will define an ajf builder toolbar
 * @implements : OnDestroy
 */
export class AjfReportBuilderCustomWidgetsToolbar implements OnDestroy, OnInit {
  customWidgets: CustomWidget[] = [];

  private _customWidgetsSub: Subscription = Subscription.EMPTY;

  private _dialogRef: MatDialogRef<AjfReportBuilderCustomWidgetDialog>;

  private _threeColumnsLayout: string =
  '{"widgetType":0,' +
  '"content":[],"styles":{},"visibility":{"condition":"true"},"columns":[0.34,0.33,0.33],' +
  '"content":' +
  '[{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
  '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
  '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]}]}';
  private _fourColumnsLayout: string =
  '{"widgetType":0,"content":[],"styles":{},"visibility":{"condition":"true"},' +
  '"columns":[0.25,0.25,0.25,0.25],"content":' +
  '[{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
  '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
  '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
  '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]}]}';

  constructor(
    private service: AjfReportBuilderService,
    public dialog: MatDialog) {
  }

  openDialog(idx: number) {
    this._dialogRef = this.dialog.open(AjfReportBuilderCustomWidgetDialog);
    this._dialogRef.componentInstance.label = this.customWidgets[idx].type;
    this._dialogRef.componentInstance.position = idx;
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
        this.service.dragStarted();
      });
  }

  /**
   * sign the end of mouse drag
   *
   * @memberOf AjfReportBuilderContent
   */
  onDragEndHandler(): void {
    this.service.dragEnded();
  }

  /**
   *  sign the enter of mouse drag
   *
   * @memberOf AjfReportBuilderContent
   */
  onDragEnterHandler(array: string, index: number): void {
    this.service.dragEnter(array, index);
  }

  /**
   * sign the leave of mouse drag
   *
   * @memberOf AjfReportBuilderContent
   */
  onDragLeaveHandler(): void {
    this.service.dragLeave();
  }
  ngOnInit(): void {
    this._customWidgetsSub = this.service.customWidgets
      .subscribe(x => {
        this.customWidgets = x;
        if (
          this.customWidgets.length > 0 &&
          this.customWidgets[this.customWidgets.length - 1].type == ''
        ) {
          this.openDialog(this.customWidgets.length - 1);
        }
      });
    this.service.addCustomWidgets({
      json: this._threeColumnsLayout,
      type: 'LayoutWidgetWith3Columns',
    });
    this.service.addCustomWidgets({
      json: this._fourColumnsLayout,
      type: 'LayoutWidgetWith4Columns'
    });
  }

  ngOnDestroy(): void {
    this._customWidgetsSub.unsubscribe();
    this.service.resetCustomWidgets();
  }
}
