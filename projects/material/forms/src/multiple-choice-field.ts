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
  AfterViewInit,
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
  templateUrl: 'multiple-choice-field.html',
  styleUrls: ['multiple-choice-field.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfMultipleChoiceFieldComponent<T>
  extends AjfFieldWithChoicesComponent<T> implements AfterViewInit, OnDestroy {

  readonly searchFilterCtrl = new FormControl<string>('');
  private searchFilterSub: Subscription;

  filteredChoices: AjfChoice<any>[] = [];

  constructor(
    cdr: ChangeDetectorRef,
    service: AjfFormRendererService,
    @Inject(AJF_WARNING_ALERT_SERVICE) was: AjfWarningAlertService,
    @Optional() @Inject(AJF_SEARCH_ALERT_THRESHOLD) searchThreshold: number,
  ) {
    super(cdr, service, was, searchThreshold);

    this.searchFilterSub = this.searchFilterCtrl.valueChanges.subscribe(() => {
      this.filterChoices();
    });
  }

  ngAfterViewInit(): void {
    this.filteredChoices = this.instance?.filteredChoices || [];
  }

  private filterChoices() {
    const choices = this.instance?.filteredChoices || [];
    let search = this.searchFilterCtrl.value;
    if (!search) {
      this.filteredChoices = choices;
      return;
    }
    search = search.toLowerCase();
    this.filteredChoices = choices.filter(c => c.label.toLowerCase().includes(search!));
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.searchFilterSub.unsubscribe();
  }
}
