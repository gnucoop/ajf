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

import {AjfStyles, AjfWidget, AjfWidgetType} from '@ajf/core/reports';
import {deepCopy} from '@ajf/core/utils';
import {CdkDrag, CdkDragDrop} from '@angular/cdk/drag-drop';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {Observable, Subscription, timer} from 'rxjs';

import {AjfReportBuilderDragData} from './report-builder-drag-data';
import {AjfReportBuilderService} from './report-builder-service';

/**
 *  manage the content page
 *
 * @export
 */
@Component({
  selector: 'ajf-report-builder-content',
  templateUrl: 'content.html',
  styleUrls: ['content.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'(mouseover)': 'onMouseOver()', '(mouseleave)': 'onMouseLeave()'}
})
export class AjfReportBuilderContent implements OnInit, AfterViewChecked, OnDestroy {
  onMouseOver(): void {
    this.showActions = true;
    this._service.overStarted();
  }

  onMouseLeave(): void {
    this.showActions = false;
    this._service.overEnded();
  }

  canDropPredicate(dropZones: string[]): (item: CdkDrag<AjfReportBuilderDragData>) => boolean {
    return item => {
      for (let i = 0; i < item.data.dropZones.length; i++) {
        if (dropZones.indexOf(item.data.dropZones[i]) > -1) {
          return true;
        }
      }
      return false;
    };
  }

  reportStyles: Observable<AjfStyles>;

  // this boolean sign if is dragged a widget
  onDragged = false;


  /**
   *  observe the status of the fixed zoom
   *
   * @memberOf AjfReportBuilderContent
   */
  fixedZoom = false;

  // this boolean sign if widget is in drag enter status
  onDragEnter: any = {};


  show = false;


  // this array contains all widget locate in header zone
  headerWidgets: AjfWidget[] = [];
  /**
   * observe the css style of header
   *
   * @memberOf AjfReportBuilderContent
   */
  headerStyles: Observable<AjfStyles>;

  // this array contains all widget locate in content zone
  contentWidgets: AjfWidget[] = [];

  /**
   * observe the css style of content
   *
   * @memberOf AjfReportBuilderContent
   */
  contentStyles: Observable<AjfStyles>;

  // this array contains all widget locate in footer zone
  footerWidgets: AjfWidget[] = [];


  onOver: boolean = false;
  /**
   * observe the css style of footer
   *
   * @memberOf AjfReportBuilderContent
   */
  footerStyles: Observable<AjfStyles>;


  // this is the current widget
  currentWidget: AjfWidget|null = null;


  /**
   * if true mouse event is on dragged status
   *
   * @memberOf AjfReportBuilderContent
   */
  showActions = false;

  private _onDraggedSub: Subscription = Subscription.EMPTY;
  private _fixedZoomSub: Subscription = Subscription.EMPTY;
  private _onDragEnterSub: Subscription = Subscription.EMPTY;
  private _headerWidgetsSub: Subscription = Subscription.EMPTY;
  private _contentWidgetsSub: Subscription = Subscription.EMPTY;
  private _footerWidgetsSub: Subscription = Subscription.EMPTY;
  private _onOverSub: Subscription = Subscription.EMPTY;
  private _currentWidgetSub: Subscription = Subscription.EMPTY;

  constructor(private _service: AjfReportBuilderService, private _cdRef: ChangeDetectorRef) {
    this.headerStyles = this._service.headerStyles;
    this.contentStyles = this._service.contentStyles;
    this.footerStyles = this._service.footerStyles;
  }

  isLayout(widget: AjfWidget): boolean {
    return widget.widgetType === AjfWidgetType.Layout;
  }

  /**
   *  sign the start of mouse drag with 200 ms of delay
   *
   * @memberOf AjfReportBuilderContent
   */
  onDragStartHandler(): void {
    let s = timer(200).subscribe(() => {
      if (s != null) {
        s.unsubscribe();
      }
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

  /**
   *  sign the enter of mouse drag
   *
   * @memberOf AjfReportBuilderContent
   */
  onDragEnterHandler(array: string, index: number|undefined): void {
    if (index == null) {
      return;
    }
    this._service.dragEnter(array, index);
  }

  /**
   * sign the leave of mouse drag
   *
   * @memberOf AjfReportBuilderContent
   */
  onDragLeaveHandler(): void {
    this._service.dragLeave();
  }


  /**
   *  return true if array and index is === with array and index of onDragEnter
   *
   * @param array
   * @param index
   *
   * @memberOf AjfReportBuilderContent
   */
  onDragEnterCheck(array: string, index: number): boolean {
    if ((array === this.onDragEnter.array) &&
        ((index === this.onDragEnter.index) || (index === -1))) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * remove widget element from type array in idx position
   *
   * @param type can be header content or footer
   * @param idx
   *
   * @memberOf AjfReportBuilderContent
   */
  remove(type: string, idx: number) {
    this._service.remove(type, idx);
  }

  /**
   * add widget element into type array in idx position
   *
   * @param type
   * @param event
   *
   * @memberOf AjfReportBuilderContent
   */
  addToList(arrayTo: string, event: CdkDragDrop<AjfReportBuilderDragData>, to?: number) {
    this.onDragEndHandler();
    this._service.setOrigin(arrayTo);
    const itemData = event.item.data as AjfReportBuilderDragData;
    if (itemData.fromColumn != null) {
      this._service.removeWidgetToColumn(itemData.fromColumn, itemData.fromIndex!);
      this.currentWidget = itemData.widget!;
    } else if (itemData.widget != null) {
      this.remove(itemData.arrayFrom!, itemData.from!);
      this.currentWidget = itemData.widget;
    } else if (itemData.json != null && itemData.json !== '') {
      this.currentWidget = deepCopy(itemData.json);
    } else {
      let obj = {'widgetType': (AjfWidgetType as any)[itemData.widgetType!]};
      this.currentWidget = deepCopy(obj);
    }
    this.onDragEndHandler();
    if (this.currentWidget != null) {
      switch (arrayTo) {
        case 'header':
          this._service.addHeaderWidget(this.currentWidget, to);
          break;
        case 'content':
          this._service.addContentWidget(this.currentWidget, to);
          break;
        case 'footer':
          this._service.addfooterWidget(this.currentWidget, to);
          break;
      }
    }
    this.onDragLeaveHandler();
  }

  ngOnInit(): void {
    this._headerWidgetsSub = this._service.headerWidgets.subscribe(x => {
      this.headerWidgets = x.widgets;
    });
    this._contentWidgetsSub = this._service.contentWidgets.subscribe(x => {
      this.contentWidgets = x.widgets;
    });
    this._footerWidgetsSub = this._service.footerWidgets.subscribe(x => {
      this.footerWidgets = x.widgets;
    });
    this._onDraggedSub = this._service.onDragged.subscribe(x => {
      this.onDragged = x;
    });
    this._fixedZoomSub = this._service.fixedZoom.subscribe(bool => {
      this.fixedZoom = bool;
    });
    this._onDragEnterSub = this._service.onDragEnter.subscribe(x => {
      this.onDragEnter = x;
    });
    this._onOverSub = this._service.onOver.subscribe(x => {
      this.onOver = x;
    });
  }

  ngAfterViewChecked() {
    this._cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    [this._headerWidgetsSub, this._contentWidgetsSub, this._footerWidgetsSub,
     this._currentWidgetSub, this._onDraggedSub, this._fixedZoomSub, this._onOverSub,
     this._onDragEnterSub]
        .forEach(s => {
          s.unsubscribe();
        });
  }
}
