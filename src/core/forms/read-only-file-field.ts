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

import {AjfFile, fileIcon} from '@ajf/core/file-input';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {filter, map, shareReplay, startWith, switchMap} from 'rxjs/operators';

import {AjfBaseFieldComponent} from './base-field';
import {AjfFormRendererService} from './form-renderer';
import {AJF_WARNING_ALERT_SERVICE, AjfWarningAlertService} from './warning-alert-service';

/**
 * This component allows you to download the file contained in the control of
 * the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyFileFieldComponent
 */
@Component({
  selector: 'ajf-read-only-file-field',
  templateUrl: 'read-only-file-field.html',
  styleUrls: ['read-only-file-field.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfReadOnlyFileFieldComponent extends AjfBaseFieldComponent {
  readonly fileIcon: SafeResourceUrl;
  readonly fileUrl: Observable<SafeResourceUrl>;
  readonly fileName: Observable<string>;

  constructor(
      cdr: ChangeDetectorRef, service: AjfFormRendererService,
      @Inject(AJF_WARNING_ALERT_SERVICE) was: AjfWarningAlertService, domSanitizer: DomSanitizer) {
    super(cdr, service, was);
    this.fileIcon = domSanitizer.bypassSecurityTrustResourceUrl(fileIcon);
    const fileStream = this.control.pipe(
        filter(control => control != null),
        switchMap(control => {
          control = control as FormControl;
          return control.valueChanges.pipe(
                     startWith(control.value),
                     ) as Observable<AjfFile>;
        }),
        filter(value => value != null),
        shareReplay(1),
    );
    this.fileUrl = fileStream.pipe(
        map(file => domSanitizer.bypassSecurityTrustResourceUrl((file as AjfFile).content)),
    );
    this.fileName = fileStream.pipe(map(file => (file as AjfFile).name));
  }
}
