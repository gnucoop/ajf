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

import {AjfBaseWidgetComponent, AjfLayoutWidgetInstance} from '@ajf/core/reports';
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewEncapsulation
} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  templateUrl: 'layout-widget.html',
  styleUrls: ['layout-widget.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfLayoutWidgetComponent extends
    AjfBaseWidgetComponent<AjfLayoutWidgetInstance> implements AfterContentChecked {
  private _allcolumnsRendered$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly allcolumnsRendered$: Observable<boolean> =
      this._allcolumnsRendered$ as Observable<boolean>;

  constructor(cdr: ChangeDetectorRef, el: ElementRef) {
    super(cdr, el);
  }
  ngAfterContentChecked(): void {
    this._allcolumnsRendered$.next(true);
  }
}
