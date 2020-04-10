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
  AjfFieldWithChoicesComponent,
  AjfFormRendererService
} from '@ajf/core/forms';
import {BooleanInput} from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Optional,
  ViewEncapsulation
} from '@angular/core';

import {AjfWarningAlertService} from './warning-alert-service';

@Component({
  templateUrl: 'single-choice-field.html',
  styleUrls: ['single-choice-field.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfSingleChoiceFieldComponent<T> extends AjfFieldWithChoicesComponent<T> {
  constructor(
      cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService,
      @Optional() @Inject(AJF_SEARCH_ALERT_THRESHOLD) searchThreshold: number) {
    super(cdr, service, was, searchThreshold);
  }

  static ngAcceptInputType_readonly: BooleanInput;
}
