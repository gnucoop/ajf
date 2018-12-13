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

import {Subscription, timer} from 'rxjs';

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import {AjfReportColumnWidget} from '@ajf/core/reports';
import {AjfReportBuilderService} from './report-builder-service';

/**
 * this component manages the report text
 *
 * @export
 */
@Component({
  moduleId: module.id,
  selector: 'ajf-column',
  templateUrl: 'column.html',
  styleUrls: ['column.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfReportBuilderColumn implements OnDestroy, OnInit {

  /**
   * if true mouse event is on dragged status
   *
   * @memberOf AjfReportBuilderContent
   */
  showActions = false;

  layoutShow = false;

  // this boolean sign if is dragged a widget
  onDragged = false;


  /**
   * is the array of values
   *
   * @memberOf TableComponent
   */
  @Input()
  column: AjfReportColumnWidget;

  private _onDraggedSub: Subscription = Subscription.EMPTY;

  addToList(event: any, idx: number, toColumn: AjfReportColumnWidget) {
    this.onDragEndHandler();
    if (event.dragData.fromColumn) {
      this._service.changePositionOnColumn(event, toColumn, idx);
    } else {
      this._service.addToColumn(event, toColumn, idx);
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
        s.unsubscribe();
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
  constructor(
    private _service: AjfReportBuilderService
  ) {
  }

  ngOnInit() {
    // this.widget = changes.widget.currentValue;

    this._onDraggedSub = this._service.onDragged
      .subscribe(x => {
        this.onDragged = x;
      });
  }

  ngOnDestroy(): void {
    this._onDraggedSub.unsubscribe();
  }
}

