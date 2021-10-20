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

import {Directionality} from '@angular/cdk/bidi';
import {ChangeDetectorRef, Component, ElementRef, Inject, ViewEncapsulation} from '@angular/core';
import {DevAppDirectionality} from './dev-app-directionality';

/** Root component for the dev-app demos. */
@Component({
  selector: 'dev-app-layout',
  templateUrl: 'dev-app-layout.html',
  styleUrls: ['dev-app-layout.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DevAppLayout {
  dark = false;
  navGroups = [
    {
      name: 'Common',
      children: [
        {name: 'Examples', route: '/examples'},
        {name: 'File input', route: '/file-input'},
        {name: 'i18n', route: '/i18n'},
      ],
    },
    {
      name: 'Material',
      children: [
        {name: 'Barcode', route: '/mat-barcode'},
        {name: 'Calendar', route: '/mat-calendar'},
        {name: 'Calendar - Ethiopian', route: '/mat-calendar-ethiopian'},
        {name: 'Checkbox group', route: '/mat-checkbox-group'},
        {name: 'Fields', route: '/mat-fields'},
        {name: 'Form builder', route: '/mat-form-builder'},
        {name: 'Forms', route: '/mat-forms'},
        {name: 'Image', route: '/mat-image'},
        {name: 'Node icon', route: '/mat-node-icon'},
        {name: 'Page slider', route: '/mat-page-slider'},
        {name: 'Report from form', route: '/mat-report-from-form'},
        {name: 'Reports', route: '/mat-reports'},
        {name: 'Time', route: '/mat-time'},
        {name: 'Widgets', route: '/mat-widgets'},
      ],
    },
    {
      name: 'Ionic',
      children: [
        {name: 'Barcode', route: '/ion-barcode'},
        {name: 'Calendar', route: '/ion-calendar'},
        {name: 'Checkbox group', route: '/ion-checkbox-group'},
        {name: 'Fields', route: '/ion-fields'},
        {name: 'Forms', route: '/ion-forms'},
        {name: 'Image', route: '/ion-image'},
        {name: 'Node icon', route: '/ion-node-icon'},
        {name: 'Page slider', route: '/ion-page-slider'},
        {name: 'Reports', route: '/ion-reports'},
        {name: 'Widgets', route: '/ion-widgets'},
      ],
    },
  ];

  constructor(
    private _element: ElementRef<HTMLElement>,
    @Inject(Directionality) public dir: DevAppDirectionality,
    cdr: ChangeDetectorRef,
  ) {
    dir.change.subscribe(() => cdr.markForCheck());
  }

  toggleFullscreen() {
    // Cast to `any`, because the typings don't include the browser-prefixed methods.
    const elem = this._element.nativeElement.querySelector('.demo-content') as any;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullScreen) {
      elem.msRequestFullScreen();
    }
  }
}
