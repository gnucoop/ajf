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

import {Observable, Subscription, timer} from 'rxjs';
import {distinctUntilChanged, map, startWith} from 'rxjs/operators';

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';

import {AjfImageType} from '@ajf/core/image';
import {
  AjfDataset,
  AjfReportChartWidget,
  AjfReportColumnWidget,
  AjfReportImageWidget,
  AjfReportLayoutWidget,
  AjfReportMapWidget,
  AjfReportTableWidget,
  AjfReportTextWidget,
  AjfReportWidget,
  AjfReportWidgetType,
} from '@ajf/core/reports';
import {AjfReportBuilderService} from './report-builder-service';

@Component({
  moduleId: module.id,
  selector: 'ajf-report-builder-renderer-widget',
  templateUrl: 'renderer-widget.html',
  styleUrls: ['renderer-widget.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfReportBuilderRendererWidget implements OnInit, OnDestroy, OnChanges {
  get widgetTypes() { return AjfReportWidgetType; }

  @Input()
  widget: AjfReportWidget;

  get layoutWidget(): AjfReportLayoutWidget {
    return this.widget as AjfReportLayoutWidget;
  }

  @Input()
  position: number;

  @Input()
  section: string;

  onDraggedSub: Subscription;
  // this boolean sign if is dragged a widget
  onDragged = false;

  currentContentWidget: AjfReportWidget | null = null;
  obj: any;
  fixedZoom: any;

  getTableTitles: Observable<string[]>;
  getTableContent: Observable<string[][] | undefined>;

  getChartType: Observable<number>;
  getDataset: Observable<AjfDataset[][]>;
  getChartBackgroundColor: Observable<string[]>;
  getChartBorderColor: Observable<string[]>;
  getChartBorderWidth: Observable<number>;

  layoutShow: boolean;

  constructor(
    private service: AjfReportBuilderService
  ) { }


  /**
   *  sign the start of mouse drag with 200 ms of delay
   *
   * @memberOf AjfReportBuilderContent
   */
  onDragStartHandler(): void {
    let s = timer(200)
      .subscribe(() => {
        s.unsubscribe();
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

  getColumnContent(): AjfReportColumnWidget[] {
    const myObj: AjfReportLayoutWidget = <AjfReportLayoutWidget>this.widget;

    return <AjfReportColumnWidget[]>myObj.content;
  }

  getIcon(): {fontSet: string, fontIcon: string} | null {
    const defVal = {fontSet: '', fontIcon: ''};
    const myObj: AjfReportImageWidget = <AjfReportImageWidget>this.widget;
    if (myObj.icon == null) { return null; }
    return myObj.icon.evaluate({}) || defVal;
  }

  getFlag(): string | null {
    const defVal = 'ch';
    const myObj: AjfReportImageWidget = <AjfReportImageWidget>this.widget;
    if (myObj.flag == null) { return null; }
    return myObj.flag.evaluate({}) || defVal;
  }

  getPercent(index: number): string {
    const myObj: AjfReportLayoutWidget = <AjfReportLayoutWidget>this.widget;
    const percent = myObj.columns[index] * 100;

    return `${percent.toString()}%`;
  }

  getImageUrl(): string | null {
    const defVal = '';
    const myObj: AjfReportImageWidget = <AjfReportImageWidget>this.widget;
    if (myObj.url == null) { return null; }
    return myObj.url.evaluate({}) || defVal;
  }

  getImageType() {
    return this.widget != null ?
      (<AjfReportImageWidget>this.widget).imageType :
      AjfImageType.Image;
  }

  getHtmlText() {
    let myObj: AjfReportTextWidget;
    myObj = <AjfReportTextWidget>this.widget;
    if (myObj.htmlText === '') {
      return '...';
    } else {
      return myObj.htmlText;
    }
  }

  getCoordinate() {
    let myObj: AjfReportMapWidget;
    myObj = <AjfReportMapWidget>this.widget;
    if (myObj.coordinate == null) {
      return [51.505, -0.09, 13];
    } else {
      return myObj.coordinate;
    }
  }

  getTileLayer() {
    let myObj: AjfReportMapWidget;
    myObj = <AjfReportMapWidget>this.widget;
    if (myObj.tileLayer === '') {
      return 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    } else {
      return myObj.tileLayerMap;
    }
  }

  getAttribution() {
    let myObj: AjfReportMapWidget;
    myObj = <AjfReportMapWidget>this.widget;
    if (myObj.attribution === '') {
      return "&copy; <a href='http://osm.org/copyright'>O</a> contributors";
    } else {
      return myObj.attributionMap;
    }
  }

  addToList(event: any, toColumn: AjfReportColumnWidget) {
    this.onDragEndHandler();
    this.service.addToColumn(event, toColumn);
  }

  ngOnInit(): void {
    this.onDraggedSub = this.service.onDragged
      .subscribe(x => {
        this.onDragged = x;
      });

    this.getChartType = this.service.currentWidget.pipe(
      map((widget: AjfReportWidget | null) => {
        if (widget == null) { return 0; }
        const myObj = <AjfReportChartWidget>this.widget;
        return <number>(myObj.chartType);
      }),
      distinctUntilChanged(),
      startWith(0)
    );

    this.getDataset = this.service.currentWidget.pipe(
      map((widget: AjfReportWidget | null) => {
        if (widget != null && (widget as AjfReportChartWidget).dataset != null) {
          const myObj = <AjfReportChartWidget>this.widget;
          return <any>myObj.dataset;
        } else {
          return [];
        }
      }),
      distinctUntilChanged()
    );

    this.getTableTitles = this.service.currentWidget.pipe(
      map((widget: AjfReportWidget | null) => {
        if (widget == null) { return []; }

        const myObj = <AjfReportTableWidget>this.widget;

        if (myObj.dataset != null) {
          let tableTitle: string[] = [];

          for (let i = 0; i < myObj.dataset.length; i++) {
            if (myObj.dataset[i][0] != null) {
              tableTitle.push(myObj.dataset[i][0].label);
            }
          }
          return tableTitle;
        } else {
          return [];
        }
      })
    );

    this.getTableContent = this.service.currentWidget.pipe(
      map((widget: AjfReportWidget | null) => {
        if (widget == null) { return []; }

        const myObj = <AjfReportTableWidget>this.widget;

        if (myObj.dataset != null) {
          let tableContent: string[][] = [];

          for (let i = 0; i < myObj.dataset.length; i++) {
            for (let j = 0; j < myObj.dataset[i].length; j++) {
              if (
                (myObj.dataset[i] != null) &&
                (myObj.dataset[i][j + 1] != null)
              ) {
                if (tableContent[j] == null) {
                  tableContent[j] = [];
                }
                if (tableContent[j][i] == null) {
                  tableContent[j][i] = ' ';
                }
                tableContent[j].splice(i, 1, myObj.dataset[i][j + 1].label);
              }
            }
          }
          return tableContent;
        }
      })
    );

    this.service.updateCurrentWidget(this.widget);
  }

  ngOnChanges(changes: any) {
    if (changes.widget && changes.widget.currentValue != null) {
      this.widget = changes.widget.currentValue;
    }
  }

  ngOnDestroy(): void {
    if (this.onDraggedSub != null) { this.onDraggedSub.unsubscribe(); }
  }
}
