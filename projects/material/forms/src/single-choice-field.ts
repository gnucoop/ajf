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
import {Subscription} from 'rxjs';

import {AjfWarningAlertService} from './warning-alert-service';

@Component({
  templateUrl: 'single-choice-field.html',
  styleUrls: ['single-choice-field.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfSingleChoiceFieldComponent<T>
  extends AjfFieldWithChoicesComponent<T> implements OnDestroy {

  readonly searchFilterCtrl = new FormControl<string>('');
  private searchFilterSub: Subscription;

  constructor(
    cdr: ChangeDetectorRef,
    service: AjfFormRendererService,
    @Inject(AJF_WARNING_ALERT_SERVICE) was: AjfWarningAlertService,
    @Optional() @Inject(AJF_SEARCH_ALERT_THRESHOLD) searchThreshold: number,
  ) {
    super(cdr, service, was, searchThreshold);

    this.searchFilterSub = this.searchFilterCtrl.valueChanges.subscribe(() => {
      cdr.markForCheck();
    });
  }

  filteredChoices(): AjfChoice<any>[] {
    const choices = this.instance?.filteredChoices || [];
    let search = this.searchFilterCtrl.value;
    if (!search) {
      return choices;
    }
    search = search.toLowerCase();
    return choices.filter(c => c.label.toLowerCase().includes(search!));
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.searchFilterSub.unsubscribe();
  }
}
