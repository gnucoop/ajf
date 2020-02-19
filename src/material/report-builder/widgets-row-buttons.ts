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

import {AjfLayoutWidget, AjfWidget, AjfWidgetType} from '@ajf/core/reports';
import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit,
  ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';

import {AjfReportBuilderService} from './report-builder-service';
import {ajfWidgetTypeToLabel, widgetReportBuilderIconName} from './utils';

@Component({
  selector: 'ajf-report-builder-widgets-row-buttons',
  templateUrl: 'widgets-row-buttons.html',
  styleUrls: ['widgets-row-buttons.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfReportBuilderWidgetsRowButtons implements OnDestroy, OnInit {
  @Input() from: string;
  @Input() fromWidget: AjfWidget;
  @Input() position: number;
  @Input() widget: AjfWidget;
  @Input() child: boolean;
  @Input() isOver = false;
  currentWidget: AjfWidget|null = null;
  isClicked = false;
  color: string[] = [];

  widgetIcon: string;
  widgetLabel: string;
  label: string;

  // this boolean sign if is dragged a widget
  onDragged = false;

  // this boolean sign if is on over a widget
  onOver = false;

  private _currentWidgetSub: Subscription = Subscription.EMPTY;
  private _onDraggedSub: Subscription = Subscription.EMPTY;
  private _onOverSub: Subscription = Subscription.EMPTY;


  /**
   *
   * @param private _afjBuilderService: AjfBuilderService
   */
  constructor(private _service: AjfReportBuilderService) {

  }

  selectedWidget() {
    this.isClicked = !this.isClicked;
    this._service.setOrigin(this.from);
    this._service.updateCurrentWidget(this.widget);
  }

  remove() {
    if (this.fromWidget != null) {
      this._service.updateCurrentWidget(this.fromWidget);
    }
    this._service.remove(this.from, this.position);
  }

  onFocus(): boolean {
    if (this.widget === this.currentWidget) {
      return true;
    } else {
      return false;
    }
  }

  changeColumn(direction: string) {

    if (direction == 'back') {
      this._service.changeColumn(
          this.position, this.position - 1, <AjfLayoutWidget>this.fromWidget);
    } else {
      this._service.changeColumn(
          this.position, this.position + 1, <AjfLayoutWidget>this.fromWidget);
    }
  }
  isColumn(): boolean {
    if (this.label === 'Column') {
      return true;
    } else {
      return false;
    }
  }

  isOneColumn(): boolean {
    let rootObj = <AjfLayoutWidget>this.fromWidget;
    if (rootObj.columns.length > 1) {
      return false;
    } else {
      return true;
    }
  }

  ngOnInit() {
    this.label = AjfWidgetType[this.widget.widgetType];
    this.widgetIcon = widgetReportBuilderIconName(this.widget.widgetType);
    this.widgetLabel = ajfWidgetTypeToLabel(this.widget.widgetType);

    this._onDraggedSub = this._service.onDragged
      .subscribe(x => {
        this.onDragged = x;
      });

    this._onOverSub = this._service.onOver
      .subscribe(x => {
        this.onOver = x;
      });

    this._currentWidgetSub = this._service.currentWidget
      .subscribe(
      x => {
        this.currentWidget = x;
        if (x !== this.widget) {
          this.isClicked = false;
        }
      });

  }
  ngOnDestroy(): void {
    this._onDraggedSub.unsubscribe();
    this._onOverSub.unsubscribe();
    this._currentWidgetSub.unsubscribe();
  }
}
