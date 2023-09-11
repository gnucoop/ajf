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
  ViewEncapsulation,
} from '@angular/core';
import {parse, toDate} from 'date-fns';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {AjfInputFieldComponent as CoreComponent} from './input-field';

import {AjfFormRendererService} from './form-renderer';
import {AJF_WARNING_ALERT_SERVICE, AjfWarningAlertService} from './warning-alert-service';
import {TranslocoService} from '@ajf/core/transloco';
import {DatePipe} from '@angular/common';

/**
 * this component show the control value inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyDateFieldComponent
 */
@Component({
  selector: 'ajf-read-date-only-field',
  templateUrl: 'read-only-date-field.html',
  styleUrls: ['read-only-date-field.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfReadOnlyDateFieldComponent extends CoreComponent {
  readonly date: Observable<string>;

  constructor(
    cdr: ChangeDetectorRef,
    service: AjfFormRendererService,
    private _ts: TranslocoService,
    @Inject(AJF_WARNING_ALERT_SERVICE) was: AjfWarningAlertService,
  ) {
    super(cdr, service, was);

    this.date = this.control.pipe(
      filter(control => control != null),
      map(ctrl => {
        if (ctrl) {
          this.formatDateField(ctrl.value);
        }
        return '';
      }),
    );
  }

  formatDateField(val: any): string {
    if (val == null) {
      return '';
    }
    let dt = null;
    if (typeof val === 'string') {
      dt = parse(val, 'yyyy-MM-dd', new Date());
    } else {
      dt = toDate(val);
    }
    if (!isNaN(dt.valueOf())) {
      const datePipe = new DatePipe(this._getCurrentLocale());
      return datePipe.transform(dt, 'shortDate') as string;
    }
    return '';
  }

  private _getCurrentLocale(): string {
    const lang = this._ts.getActiveLang();
    switch (lang) {
      case 'ESP':
        return 'es';
      case 'FRA':
        return 'fr';
      case 'ITA':
        return 'it';
      case 'PRT':
        return 'pt';
      default:
        return 'en';
    }
  }
}
