/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
  AjfFormRendererService,
} from '@ajf/core/forms';
import {AjfMultipleChoiceFieldComponent, AjfWarningAlertService} from '@ajf/material/forms';
import {ChangeDetectorRef, Component, Inject, Optional} from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'custom-select-multiple.html',
  styleUrls: ['custom-select-multiple.css'],
})
export class CustomSelectMultiple extends AjfMultipleChoiceFieldComponent<any> {
  constructor(
      changeDetectorRef: ChangeDetectorRef,
      @Inject(AJF_WARNING_ALERT_SERVICE) service: AjfFormRendererService,
      warningAlertService: AjfWarningAlertService,
      @Optional() @Inject(AJF_SEARCH_ALERT_THRESHOLD) searchThreshold: number) {
    super(changeDetectorRef, service, warningAlertService, searchThreshold);
  }
}
