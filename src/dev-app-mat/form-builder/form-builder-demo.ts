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

import {Component} from '@angular/core';

import {AjfForm} from '@ajf/core/forms';
import {form} from './form';


@Component({
  moduleId: module.id,
  selector: 'form-builder-demo',
  templateUrl: 'form-builder-demo.html',
  styleUrls: ['form-builder-demo.css'],
})
export class FormBuilderDemo {
  form: AjfForm;
  formSchema: string;
  error: string | null;

  constructor() {
    this.form = AjfForm.fromJson(form);
  }

  setForm(): void {
    this.error = null;
    try {
      const fs = JSON.parse(this.formSchema);
      this.form = AjfForm.fromJson(fs);
    } catch (e) {
      this.error = e.message;
    }
  }
}
