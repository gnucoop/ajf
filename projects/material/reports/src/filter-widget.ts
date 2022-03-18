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

import {FormGroup} from '@angular/forms';
import {AjfFormRendererService} from '@ajf/core/forms';
import {evaluateExpression} from '@ajf/core/models';
import {
  AjfBaseWidgetComponent,
  AjfFilterInstance,
  AjfWidgetInstance,
  widgetToWidgetInstance,
} from '@ajf/core/reports';
import {TranslocoService} from '@ajf/core/transloco';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'ajf-filter-widget',
  templateUrl: 'filter-widget.html',
  styleUrls: ['filter-widget.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [AjfFormRendererService],
})
export class AjfFilterWidgetComponent extends AjfBaseWidgetComponent<AjfWidgetInstance> {
  @Output() readonly filteredInstance: Observable<AjfWidgetInstance>;

  constructor(
    cdr: ChangeDetectorRef,
    el: ElementRef,
    private _ts: TranslocoService,
    private _formRenderer: AjfFormRendererService,
  ) {
    super(cdr, el);

    this.filteredInstance = this._formRenderer.formGroup.pipe(
      filter(fg => this.instance != null && this.instance.filter != null && fg != null),
      switchMap(formGroup => (formGroup as FormGroup).valueChanges),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      map(a => {
        const instance = this.instance as AjfWidgetInstance;
        const filter = instance.filter as AjfFilterInstance;
        const newConst: any = {...(filter.context || {}), ...a};
        if (filter.variables != null) {
          (filter.variables || []).forEach(variable => {
            newConst[variable.name] = evaluateExpression(variable.formula.formula, newConst);
          });
        }
        this.instance = widgetToWidgetInstance(
          instance.widget,
          newConst,
          this._ts,
          filter.variables,
        ) as AjfWidgetInstance;
        return this.instance;
      }),
    );
  }
}
