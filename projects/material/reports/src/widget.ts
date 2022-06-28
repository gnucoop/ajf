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

import {
  AjfBaseWidgetComponent,
  AjfColumnWidgetInstance,
  AjfDialogWidgetInstance,
  AjfLayoutWidgetInstance,
  AjfPaginatedListWidgetInstance,
  AjfReportWidget as CoreComponent,
  AjfWidgetComponentsMap,
  AjfWidgetInstance,
  AjfWidgetService as CoreService,
  AjfWidgetType as wt,
} from '@ajf/core/reports';
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injectable,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, Observable} from 'rxjs';

import {AjfChartWidgetComponent} from './chart-widget';
import {AjfFormulaWidgetComponent} from './formula-widget';
import {AjfGraphWidgetComponent} from './graph-widget';
import {AjfHeatMapWidgetComponent} from './heat-map-widget';
import {AjfImageContainerWidgetComponent} from './image-container-widget';
import {AjfImageWidgetComponent} from './image-widget';
import {AjfMapWidgetComponent} from './map-widget';
import {AjfPageBreakWidgetComponent} from './page-break-widget';
import {AjfTableWidgetComponent} from './table-widget';
import {AjfTextWidgetComponent} from './text-widget';

const defaultWidgetsFactory = (): AjfWidgetComponentsMap => {
  const defaultWidgets: AjfWidgetComponentsMap = {};
  defaultWidgets[wt.Layout] = {component: AjfLayoutWidgetComponent};
  defaultWidgets[wt.PageBreak] = {component: AjfPageBreakWidgetComponent};
  defaultWidgets[wt.Image] = {component: AjfImageWidgetComponent};
  defaultWidgets[wt.Text] = {component: AjfTextWidgetComponent};
  defaultWidgets[wt.Chart] = {component: AjfChartWidgetComponent};
  defaultWidgets[wt.Table] = {component: AjfTableWidgetComponent};
  defaultWidgets[wt.DynamicTable] = {component: AjfTableWidgetComponent};
  defaultWidgets[wt.Map] = {component: AjfMapWidgetComponent};
  defaultWidgets[wt.Column] = {component: AjfColumnWidgetComponent};
  defaultWidgets[wt.Formula] = {component: AjfFormulaWidgetComponent};
  defaultWidgets[wt.ImageContainer] = {component: AjfImageContainerWidgetComponent};
  defaultWidgets[wt.Graph] = {component: AjfGraphWidgetComponent};
  defaultWidgets[wt.PaginatedList] = {component: AjfPaginatedListWidgetComponent};
  defaultWidgets[wt.Dialog] = {component: AjfDialogWidgetComponent};
  defaultWidgets[wt.HeatMap] = {component: AjfHeatMapWidgetComponent};
  return defaultWidgets;
};

@Injectable({providedIn: 'root'})
export class AjfWidgetService extends CoreService {
  constructor() {
    super(defaultWidgetsFactory());
  }
}

@Component({
  selector: 'ajf-widget',
  templateUrl: 'widget.html',
  styleUrls: ['widget.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AjfReportWidget extends CoreComponent {
  readonly widgetsMap: AjfWidgetComponentsMap;

  constructor(renderer: Renderer2, widgetService: AjfWidgetService) {
    super(renderer);
    this.widgetsMap = widgetService.componentsMap;
  }
}

@Component({
  templateUrl: 'column-widget.html',
  styleUrls: ['column-widget.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfColumnWidgetComponent extends AjfBaseWidgetComponent<AjfColumnWidgetInstance> {
  constructor(cdr: ChangeDetectorRef, el: ElementRef) {
    super(cdr, el);
  }
}

@Component({
  templateUrl: 'layout-widget.html',
  styleUrls: ['layout-widget.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfLayoutWidgetComponent
  extends AjfBaseWidgetComponent<AjfLayoutWidgetInstance>
  implements AfterContentChecked
{
  private _allcolumnsRendered$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly allcolumnsRendered$: Observable<boolean> = this
    ._allcolumnsRendered$ as Observable<boolean>;

  constructor(cdr: ChangeDetectorRef, el: ElementRef) {
    super(cdr, el);
  }
  ngAfterContentChecked(): void {
    this._allcolumnsRendered$.next(true);
  }
}

@Component({
  templateUrl: 'dialog-widget.html',
  styleUrls: ['dialog-widget.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfDialogWidgetComponent extends AjfBaseWidgetComponent<AjfDialogWidgetInstance> {
  @ViewChild('dialogContent', {read: TemplateRef}) dialogContent!: TemplateRef<HTMLElement>;

  constructor(cdr: ChangeDetectorRef, el: ElementRef, private _dialog: MatDialog) {
    super(cdr, el);
  }

  openDialog(): void {
    this._dialog.open(this.dialogContent);
  }
}

@Component({
  templateUrl: 'paginated-list-widget.html',
  styleUrls: ['paginated-list-widget.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfPaginatedListWidgetComponent
  extends AjfBaseWidgetComponent<AjfPaginatedListWidgetInstance>
  implements OnChanges, OnInit
{
  get currentPage(): number {
    return this._currentPage;
  }
  private _currentPage = 0;

  get pages(): number {
    return this._pages;
  }
  private _pages = 0;

  get currentContent(): AjfWidgetInstance[] {
    return this._currentContent;
  }
  private _currentContent: AjfWidgetInstance[] = [];

  get canGoForward(): boolean {
    return this._canGoForward;
  }
  private _canGoForward = false;

  get canGoBackward(): boolean {
    return this._canGoBackward;
  }
  private _canGoBackward = false;

  constructor(cdr: ChangeDetectorRef, el: ElementRef) {
    super(cdr, el);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['instance']) {
      this._updateCurrentContent();
    }
  }

  ngOnInit(): void {
    this._updateCurrentContent();
  }

  goToPage(direction: 'next' | 'previous'): void {
    const diff = direction === 'next' ? 1 : -1;
    const newPage = this._currentPage + diff;
    if (newPage <= 0 || newPage > this._pages) {
      return;
    }
    this._currentPage = newPage;
    this._canGoForward = newPage < this._pages;
    this._canGoBackward = newPage > 1;
    this._fillCurrentContent();
  }

  private _updateCurrentContent(): void {
    this._canGoBackward = false;
    if (this.instance == null || this.instance.content.length === 0) {
      this._currentPage = 0;
      this._pages = 0;
    } else {
      this._currentPage = 1;
      const {content} = this.instance;
      const {pageSize} = this.instance.widget;
      this._pages = Math.ceil(content.length / pageSize);
      this._canGoForward = this._pages > 1;
    }
    this._fillCurrentContent();
  }

  private _fillCurrentContent(): void {
    if (this.instance == null || this.instance.content.length === 0) {
      this._currentContent = [];
      return;
    }
    const {content} = this.instance;
    const {pageSize} = this.instance.widget;
    const start = (this._currentPage - 1) * pageSize;
    this._currentContent = content.slice(start, start + pageSize);
    this._cdr.markForCheck();
  }
}
