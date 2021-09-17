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

import {HttpClient} from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {AjfFormRendererService} from './form-renderer';
import {AjfVideoUrlFieldComponent} from './video-url-field';
import {AJF_WARNING_ALERT_SERVICE, AjfWarningAlertService} from './warning-alert-service';

/**
 * This component allows you to show the video related to url contained in the control of
 * the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyVideoUrlFieldComponent
 */
@Component({
  selector: 'ajf-read-only-video-url-field',
  templateUrl: 'read-only-video-url-field.html',
  styleUrls: ['read-only-video-url-field.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfReadOnlyVideoUrlFieldComponent extends AjfVideoUrlFieldComponent {
  constructor(
      cdr: ChangeDetectorRef, service: AjfFormRendererService,
      @Inject(AJF_WARNING_ALERT_SERVICE) was: AjfWarningAlertService, domSanitizer: DomSanitizer,
      httpClient: HttpClient) {
    super(cdr, service, was, domSanitizer, httpClient);
  }
}
