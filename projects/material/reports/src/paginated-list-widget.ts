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
  AjfPaginatedListWidgetInstance,
  AjfWidgetInstance,
} from '@ajf/core/reports';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

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
