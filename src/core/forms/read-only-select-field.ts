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
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

import {AjfBaseFieldComponent} from './base-field';
import {AjfFormRendererService} from './form-renderer';
import {
  AjfFieldWithChoicesInstance
} from './interface/fields-instances/field-with-choices-instance';
import {AjfFieldType} from './interface/fields/field-type';
import {AJF_WARNING_ALERT_SERVICE, AjfWarningAlertService} from './warning-alert-service';

/**
 * This component allows you to show the values of AjfFieldWithChoicesInstance
 * contained in the control of the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlySelectFieldComponent
 */
@Component({
  templateUrl: 'read-only-select-field.html',
  styleUrls: ['read-only-select-field.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfReadOnlySelectFieldComponent extends
    AjfBaseFieldComponent<AjfFieldWithChoicesInstance<String|number>> {
  readonly multiple: Observable<boolean>;

  constructor(
      cdr: ChangeDetectorRef, service: AjfFormRendererService,
      @Inject(AJF_WARNING_ALERT_SERVICE) was: AjfWarningAlertService) {
    super(cdr, service, was);

    this.multiple = this.control.pipe(
        filter(control => control != null),
        map(() => this.instance.node.fieldType === AjfFieldType.MultipleChoice));
  }
}
