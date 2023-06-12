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

import {AjfGeolocation} from '@ajf/core/geolocation';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

export const GEOLOCATION_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AjfGeolocationComponent),
  multi: true,
};

/**
 * Ajf geolocation component.
 */
@Component({
  selector: 'ajf-geolocation',
  templateUrl: 'geolocation.html',
  styleUrls: ['geolocation.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GEOLOCATION_CONTROL_VALUE_ACCESSOR],
})
export class AjfGeolocationComponent extends AjfGeolocation implements OnDestroy {
  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }
}
