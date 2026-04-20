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
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith} from 'rxjs/operators';

import {TranslocoService} from '@ajf/core/transloco';
import {FormControl} from '@angular/forms';
import {AjfWarningAlertService} from './warning-alert-service';

@Component({
  templateUrl: 'single-choice-field.html',
  styleUrls: ['single-choice-field.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfSingleChoiceFieldComponent<T>
  extends AjfFieldWithChoicesComponent<T>
  implements OnDestroy
{
  readonly searchFilterCtrl = new FormControl<string>('', {nonNullable: true});

  filteredChoices$: Observable<AjfChoice<any>[]>;

  private translatedChoices: {choice: AjfChoice<any>; label: string}[] = [];

  constructor(
    cdr: ChangeDetectorRef,
    service: AjfFormRendererService,
    @Inject(AJF_WARNING_ALERT_SERVICE) was: AjfWarningAlertService,
    @Optional() @Inject(AJF_SEARCH_ALERT_THRESHOLD) searchThreshold: number,
    private _ts: TranslocoService,
  ) {
    super(cdr, service, was, searchThreshold);

    this.filteredChoices$ = this.searchFilterCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      distinctUntilChanged(),
      map(search => {
        const choices = this.instance?.filteredChoices || [];

        if (choices.length && this.translatedChoices.length !== choices.length) {
          this.rebuildCache();
        }
        if (!search) {
          return choices;
        }
        const lowerSearch = search.toLowerCase();
        return this.translatedChoices.filter(c => c.label.includes(lowerSearch)).map(c => c.choice);
      }),
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.rebuildCache();
  }

  private rebuildCache(): void {
    const choices = this.instance?.filteredChoices || [];

    this.translatedChoices = choices.map(c => ({
      choice: c,
      label: this._ts.translate(c.label).toLowerCase(),
    }));
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
