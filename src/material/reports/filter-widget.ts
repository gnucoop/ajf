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

import {AjfBaseWidgetComponent, AjfWidgetInstance, widgetToWidgetInstance} from '@ajf/core/reports';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewEncapsulation,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, skip, switchMap, tap} from 'rxjs/operators';
import {AjfFormRendererService} from '@ajf/core/forms';
import {TranslocoService} from '@ajf/core/transloco';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {evaluateExpression} from '@ajf/core/models';

@Component({
  selector: 'ajf-filter-widget',
  templateUrl: 'filter-widget.html',
  styleUrls: ['filter-widget.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [AjfFormRendererService],
  inputs: ['instance'],
})
export class AjfFilterWidgetComponent
  extends AjfBaseWidgetComponent<AjfWidgetInstance>
  implements OnInit, OnDestroy
{
  @Output() readonly filteredInstance: EventEmitter<AjfWidgetInstance> =
    new EventEmitter<AjfWidgetInstance>();

  private _instanceSub: Subscription = Subscription.EMPTY;

  constructor(
    cdr: ChangeDetectorRef,
    el: ElementRef,
    private _ts: TranslocoService,
    private _formRenderer: AjfFormRendererService,
  ) {
    super(cdr, el);
  }

  ngOnDestroy(): void {
    this._instanceSub.unsubscribe();
  }

  ngOnInit(): void {
    if (this.instance != null && this.instance.filter != null) {
      this._instanceSub = this._formRenderer.formGroup
        .pipe(
          filter(fg => fg != null),
          switchMap(formGroup => (formGroup as FormGroup).valueChanges),
          distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
          debounceTime(500),
          skip(1),
          tap(a => {
            if (this.instance != null && this.instance.filter != null) {
              const newConst: any = {...(this.instance.filter.context || {}), ...a};
              if (this.instance.filter.variables != null) {
                (this.instance.filter.variables || []).forEach(variable => {
                  newConst[variable.name] = evaluateExpression(variable.formula.formula, newConst);
                });
              }
              this.instance = widgetToWidgetInstance(
                this.instance.widget,
                newConst,
                this._ts,
              ) as AjfWidgetInstance;
            }
          }),
        )
        .subscribe(() => this.filteredInstance.emit(this.instance));
    }
  }
}
