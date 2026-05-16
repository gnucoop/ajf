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
  AJF_SEARCH_ALERT_THRESHOLD,
  AJF_WARNING_ALERT_SERVICE,
  AjfChoice,
  AjfFieldWithChoicesComponent,
  AjfFormRendererService,
} from '@ajf/core/forms';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {combineLatest, merge, Observable, of, Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';

import {AjfWarningAlertService} from './warning-alert-service';

const maxChoicesInDom = 40;

@Component({
  templateUrl: 'multiple-choice-field.html',
  styleUrls: ['multiple-choice-field.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfMultipleChoiceFieldComponent<T>
  extends AjfFieldWithChoicesComponent<T>
  implements OnDestroy
{
  readonly expandThreshold = super.searchThreshold;
  readonly searchFilterCtrl = new FormControl<string>('', {nonNullable: true});

  filteredChoices$: Observable<AjfChoice<any>[]>;

  private readonly _choicesUpdate$ = new Subject<void>();
  private _instanceUpdateForChoicesSub = Subscription.EMPTY;

  constructor(
    cdr: ChangeDetectorRef,
    service: AjfFormRendererService,
    @Inject(AJF_WARNING_ALERT_SERVICE) was: AjfWarningAlertService,
    @Optional() @Inject(AJF_SEARCH_ALERT_THRESHOLD) searchThreshold: number,
  ) {
    super(cdr, service, was, searchThreshold);

    const controlValue$ = this.control.pipe(
      switchMap(ctrl => (ctrl ? ctrl.valueChanges.pipe(startWith(ctrl.value)) : of(null))),
      startWith(null),
      distinctUntilChanged(),
    );

    this.filteredChoices$ = combineLatest([
      merge(
        this.searchFilterCtrl.valueChanges.pipe(debounceTime(150), distinctUntilChanged()),
        this._choicesUpdate$,
      ).pipe(startWith(null)),
      controlValue$,
    ]).pipe(
      map(([_, selectedValues]: [any, string[] | null]) => {
        const search = this.searchFilterCtrl.value;
        const choices = this.instance?.filteredChoices || [];
        if (search) {
          const lowerSearch = search.toLowerCase();
          return choices.filter(c =>
            (c.translatedLabel ?? c.label).toLowerCase().includes(lowerSearch),
          );
        }
        if (choices.length <= maxChoicesInDom) {
          return choices;
        }
        let truncated = choices.slice(0, maxChoicesInDom);
        // make sure selected choices are included in truncated
        for (const val of selectedValues ?? []) {
          if (!truncated.some(c => c.value === val)) {
            const selected = choices.find(c => c.value === val);
            if (selected) {
              truncated = [selected, ...truncated];
            }
          }
        }
        return truncated;
      }),
    );
  }

  protected override _onInstanceChange(): void {
    this._instanceUpdateForChoicesSub.unsubscribe();
    this._choicesUpdate$.next();
    if (this.instance) {
      this._instanceUpdateForChoicesSub = this.instance.updatedEvt.subscribe(() => {
        this._choicesUpdate$.next();
      });
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._instanceUpdateForChoicesSub.unsubscribe();
    this._choicesUpdate$.complete();
  }
}
