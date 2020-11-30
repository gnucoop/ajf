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

import {AjfImageType} from '@ajf/core/image';
import {evaluateExpression} from '@ajf/core/models';
import {
  AjfChartWidget,
  AjfColumnWidget,
  AjfDataset,
  AjfImageWidget,
  AjfLayoutWidget,
  AjfMapWidget,
  AjfTableWidget,
  AjfTextWidget,
  AjfWidget,
  AjfWidgetType
} from '@ajf/core/reports';
import {CdkDrag, CdkDragDrop} from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {Observable, Subscription, timer} from 'rxjs';
import {distinctUntilChanged, map, startWith} from 'rxjs/operators';

import {AjfReportBuilderDragData} from './report-builder-drag-data';
import {AjfReportBuilderService} from './report-builder-service';

@Component({
  selector: 'ajf-report-builder-renderer-widget',
  templateUrl: 'renderer-widget.html',
  styleUrls: ['renderer-widget.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfReportBuilderRendererWidget implements OnInit, OnDestroy, OnChanges {
  get widgetTypes() {
    return AjfWidgetType;
  }

  @Input() widget: AjfWidget;

  get layoutWidget(): AjfLayoutWidget {
    return this.widget as AjfLayoutWidget;
  }

  @Input() position: number;

  @Input() section: string;

  // this boolean sign if is dragged a widget
  onDragged = false;

  currentContentWidget: AjfWidget|null = null;
  obj: any;
  fixedZoom: any;

  getTableTitles: Observable<string[]>;
  getTableContent: Observable<string[][]|undefined>;

  getChartType: Observable<number>;
  getDataset: Observable<AjfDataset[][]>;
  getChartBackgroundColor: Observable<string[]>;
  getChartBorderColor: Observable<string[]>;
  getChartBorderWidth: Observable<number>;

  layoutShow: boolean;

  private _onDraggedSub: Subscription = Subscription.EMPTY;

  constructor(private _service: AjfReportBuilderService) {}

  canDropPredicate(item: CdkDrag<AjfReportBuilderDragData>): boolean {
    for (let i = 0; i < item.data.dropZones.length; i++) {
      if (['header', 'widget'].indexOf(item.data.dropZones[i]) > -1) {
        return true;
      }
    }
    return false;
  }

  /**
   *  sign the start of mouse drag with 200 ms of delay
   *
   * @memberOf AjfReportBuilderContent
   */
  onDragStartHandler(): void {
    let s = timer(200).subscribe(() => {
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

  getColumnContent(): AjfColumnWidget[] {
    const myObj: AjfLayoutWidget = <AjfLayoutWidget>this.widget;

    return <AjfColumnWidget[]>myObj.content;
  }

  getIcon(): {fontSet: string, fontIcon: string}|null {
    const defVal = {fontSet: '', fontIcon: ''};
    const myObj: AjfImageWidget = <AjfImageWidget>this.widget;
    if (myObj.icon == null) {
      return null;
    }
    return evaluateExpression(myObj.icon.formula) || defVal;
  }

  getFlag(): string|null {
    const defVal = 'ch';
    const myObj: AjfImageWidget = <AjfImageWidget>this.widget;
    if (myObj.flag == null) {
      return null;
    }
    return evaluateExpression(myObj.flag.formula) || defVal;
  }

  getPercent(index: number): string {
    const myObj: AjfLayoutWidget = <AjfLayoutWidget>this.widget;
    const percent = myObj.columns[index] * 100;

    return `${percent.toString()}%`;
  }

  getImageUrl(): string|null {
    const defVal = '';
    const myObj: AjfImageWidget = <AjfImageWidget>this.widget;
    if (myObj.url == null) {
      return null;
    }
    return evaluateExpression(myObj.url.formula) || defVal;
  }

  getImageType() {
    return this.widget != null ? (<AjfImageWidget>this.widget).imageType : AjfImageType.Image;
  }

  getHtmlText(): string {
    const myObj: AjfTextWidget = this.widget as AjfTextWidget;
    if (myObj.htmlText === '') {
      return '...';
    } else {
      return myObj.htmlText;
    }
  }

  getCoordinate(): number[] {
    const myObj: AjfMapWidget = this.widget as AjfMapWidget;
    if (myObj.coordinate == null) {
      return [51.505, -0.09, 13];
    } else {
      return myObj.coordinate as any;
    }
  }

  getTileLayer(): string {
    const myObj: AjfMapWidget = this.widget as AjfMapWidget;
    if (myObj.tileLayer === '') {
      return 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    } else {
      return myObj.tileLayer;
    }
  }

  getAttribution(): string {
    let myObj: AjfMapWidget;
    myObj = <AjfMapWidget>this.widget;
    if (myObj.attribution === '') {
      return '&copy; <a href=\'http://osm.org/copyright\'>O</a> contributors';
    } else {
      return myObj.attribution;
    }
  }

  addToList(event: CdkDragDrop<AjfReportBuilderDragData>, toColumn: AjfColumnWidget): void {
    this.onDragEndHandler();
    this._service.addToColumn(event, toColumn);
  }

  ngOnInit(): void {
    this._onDraggedSub = this._service.onDragged.subscribe(x => {
      this.onDragged = x;
    });

    this.getChartType = this._service.currentWidget.pipe(
        map((widget: AjfWidget|null) => {
          if (widget == null) {
            return 0;
          }
          const myObj = <AjfChartWidget>this.widget;
          return <number>(myObj.chartType);
        }),
        distinctUntilChanged(), startWith(0));

    this.getDataset = this._service.currentWidget.pipe(
        map((widget: AjfWidget|null) => {
          if (widget != null && (widget as AjfChartWidget).dataset != null) {
            const myObj = <AjfChartWidget>this.widget;
            return <any>myObj.dataset;
          } else {
            return [];
          }
        }),
        distinctUntilChanged());

    this.getTableTitles = this._service.currentWidget.pipe(map((widget: AjfWidget|null) => {
      if (widget == null) {
        return [];
      }

      const myObj = this.widget as AjfTableWidget;

      if (myObj.dataset != null) {
        let tableTitle: string[] = [];

        for (let i = 0; i < myObj.dataset.length; i++) {
          if (myObj.dataset[i][0] != null) {
            tableTitle.push(myObj.dataset[i][0].label || '');
          }
        }
        return tableTitle;
      } else {
        return [];
      }
    }));

    this.getTableContent = this._service.currentWidget.pipe(map((widget: AjfWidget|null) => {
      if (widget == null) {
        return [];
      }

      const myObj = <AjfTableWidget>this.widget;

      if (myObj.dataset != null) {
        let tableContent: string[][] = [];

        for (let i = 0; i < myObj.dataset.length; i++) {
          for (let j = 0; j < myObj.dataset[i].length; j++) {
            if ((myObj.dataset[i] != null) && (myObj.dataset[i][j + 1] != null)) {
              if (tableContent[j] == null) {
                tableContent[j] = [];
              }
              if (tableContent[j][i] == null) {
                tableContent[j][i] = ' ';
              }
              tableContent[j].splice(i, 1, myObj.dataset[i][j + 1].label || '');
            }
          }
        }
        return tableContent;
      }
      return [];
    }));

    this._service.updateCurrentWidget(this.widget);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const widget = changes['widget'];
    if (widget && widget.currentValue != null) {
      this.widget = widget.currentValue;
    }
  }

  ngOnDestroy(): void {
    this._onDraggedSub.unsubscribe();
  }
}
