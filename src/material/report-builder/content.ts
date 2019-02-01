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
  AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component,
  OnInit, OnDestroy, ViewEncapsulation
} from '@angular/core';
import {CdkDrag, CdkDragDrop} from '@angular/cdk/drag-drop';

import {Observable, Subscription, timer} from 'rxjs';

import {
  AjfReportLayoutWidget, AjfReportStyles, AjfReportWidget, AjfReportWidgetType
} from '@ajf/core/reports';
import {deepCopy} from '@ajf/core/utils';
import {AjfReportBuilderDragData} from './report-builder-drag-data';
import {AjfReportBuilderService} from './report-builder-service';

/**
 *  manage the content page
 *
 * @export
 */
@Component({
  moduleId: module.id,
  selector: 'ajf-report-builder-content',
  templateUrl: 'content.html',
  styleUrls: ['content.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(mouseover)': 'onMouseOver()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class AjfReportBuilderContent implements OnInit, AfterViewChecked, OnDestroy {
  onMouseOver(): void {
    this.showActions = true;
    this.service.overStarted();
  }

  onMouseLeave(): void {
    this.showActions = false;
    this.service.overEnded();
  }

  canDropPredicate(
    dropZones: string[]
  ): (item: CdkDrag<AjfReportBuilderDragData>) => boolean {
    return item => {
      item.data.dropZones.forEach(d => {
        if (dropZones.indexOf(d) > -1) { return true; }
      });
      return false;
    };
  }

  reportStyles: Observable<AjfReportStyles>;

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
  headerWidgets: AjfReportWidget[] = [];
  /**
   * observe the css style of header
   *
   * @memberOf AjfReportBuilderContent
   */
  headerStyles: Observable<AjfReportStyles>;

  // this array contains all widget locate in content zone
  contentWidgets: AjfReportWidget[] = [];

  /**
   * observe the css style of content
   *
   * @memberOf AjfReportBuilderContent
   */
  contentStyles: Observable<AjfReportStyles>;

  // this array contains all widget locate in footer zone
  footerWidgets: AjfReportWidget[] = [];


  onOver: boolean = false;
  /**
   * observe the css style of footer
   *
   * @memberOf AjfReportBuilderContent
   */
  footerStyles: Observable<AjfReportStyles>;


  // this is the current widget
  currentWidget: AjfReportWidget | null = null;


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

  constructor(
    private service: AjfReportBuilderService,
    private cdRef: ChangeDetectorRef) {
    this.headerStyles = this.service.headerStyles;
    this.contentStyles = this.service.contentStyles;
    this.footerStyles = this.service.footerStyles;
  }

  isLayout(widget: AjfReportWidget): boolean {
    if (widget instanceof AjfReportLayoutWidget) {
      return true;
    } else {
      return false;
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


  /**
   *  return true if array and index is === with array and index of onDragEnter
   *
   * @param array
   * @param index
   *
   * @memberOf AjfReportBuilderContent
   */
  onDragEnterCheck(array: string, index: number): boolean {
    if (
      (array === this.onDragEnter.array) &&
      ((index === this.onDragEnter.index) || (index === -1))
    ) {
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
    this.service.remove(type, idx);
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
    this.service.setOrigin(arrayTo);
    const itemData = event.item.data as AjfReportBuilderDragData;
    if (itemData.fromColumn != null) {
        this.service.removeWidgetToColumn(itemData.fromColumn, itemData.fromIndex!);
        this.currentWidget = itemData.widget!;
    } else if (itemData.widget != null) {
      this.remove(itemData.arrayFrom!, itemData.from!);
      this.currentWidget = itemData.widget;
    } else if (itemData.json != null && itemData.json !== '') {
      this.currentWidget = AjfReportWidget.fromJson(JSON.parse(deepCopy(itemData.json)));
    } else {
      let obj = {
        'widgetType': (AjfReportWidgetType as any)[itemData.widgetType!]
      };
      this.currentWidget = AjfReportWidget.fromJson(obj);
    }
    this.onDragEndHandler();
    if (this.currentWidget != null) {
      switch (arrayTo) {
        case 'header':
          this.service.addHeaderWidget(this.currentWidget, to);
          break;
        case 'content':
          this.service.addContentWidget(this.currentWidget, to);
          break;
        case 'footer':
          this.service.addfooterWidget(this.currentWidget, to);
          break;
      }
    }
    this.onDragLeaveHandler();
  }

  ngOnInit(): void {
    this._headerWidgetsSub = this.service.headerWidgets
      .subscribe(x => {
        this.headerWidgets = x.widgets;
      });
    this._contentWidgetsSub = this.service.contentWidgets
      .subscribe(x => {
        this.contentWidgets = x.widgets;
      });
    this._footerWidgetsSub = this.service.footerWidgets
      .subscribe(x => {
        this.footerWidgets = x.widgets;
      });
    this._onDraggedSub = this.service.onDragged
      .subscribe(x => {
        this.onDragged = x;
      });
    this._fixedZoomSub = this.service.fixedZoom
      .subscribe(bool => {
        this.fixedZoom = bool;
      });
    this._onDragEnterSub = this.service.onDragEnter
      .subscribe(x => {
        this.onDragEnter = x;
      });
    this._onOverSub = this.service.onOver
      .subscribe(x => {
        this.onOver = x;
      });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    [
      this._headerWidgetsSub, this._contentWidgetsSub, this._footerWidgetsSub,
      this._currentWidgetSub, this._onDraggedSub, this._fixedZoomSub,
      this._onOverSub, this._onDragEnterSub
    ].forEach(s => { s.unsubscribe(); });
  }
}
