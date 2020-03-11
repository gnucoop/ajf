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

import {AjfForm, AjfFormSerializer} from '@ajf/core/forms';
import {AjfFormBuilderService} from '@ajf/material/form-builder';
import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';

import {formSchema} from './form';


@Component({
  selector: 'form-builder-demo',
  templateUrl: 'form-builder-demo.html',
  styleUrls: ['form-builder-demo.css'],
})
export class FormBuilderDemo implements AfterViewInit, OnDestroy {
  form: AjfForm;
  formSchema: string;
  error: string | null;

  private _currentFormSub: Subscription = Subscription.EMPTY;

  constructor(private _service: AjfFormBuilderService) {
    this._updateForm(formSchema);
  }

  ngOnDestroy(): void {
    this._currentFormSub.unsubscribe();
  }

  ngAfterViewInit(): void {
    this._currentFormSub = this._service.getCurrentForm().pipe(
      delay(0),
    ).subscribe(form => {
      this.formSchema = JSON.stringify(form);
    });
  }

  setForm(): void {
    this.error = null;
    try {
      const fs = JSON.parse(this.formSchema);
      this.form = AjfFormSerializer.fromJson(fs);
    } catch (e) {
      this.error = e.message;
    }
  }

  private _updateForm(schema: any): void {
    this.form = AjfFormSerializer.fromJson(schema);
    this.formSchema = JSON.stringify(schema);
  }
}
