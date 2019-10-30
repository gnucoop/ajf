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

import {AjfForm, AjfFormSerializer, AjfFormRendererService} from '@ajf/core/forms';
import {AjfContext} from '@ajf/core/models';
import {Component} from '@angular/core';

import {formSchema} from './form';


@Component({
  moduleId: module.id,
  selector: 'forms-demo',
  templateUrl: 'forms-demo.html',
  styleUrls: ['forms-demo.css'],
})
export class FormsDemo {
  formSchema: string = JSON.stringify(formSchema);
  form: AjfForm;
  context: string = '{}';

  constructor(private _formRendererService: AjfFormRendererService) {
    this.form = AjfFormSerializer.fromJson(formSchema);
    console.log(this.form);
  }

  setSchema(): void {
    if (this.formSchema == null) {
      return;
    }

    try {
      let schema = JSON.parse(this.formSchema);
      let context: AjfContext;
      if (this.context != null && this.context.length > 0) {
        context = JSON.parse(this.context);
      } else {
        context = {};
      }
      this.form = AjfFormSerializer.fromJson(schema, context);
      console.log(this.form);
    } catch (e) {
      console.log(e);
    }
  }

  getCurrentContext(): void {
    this.context = JSON.stringify(this._formRendererService.getFormValue());
  }
}
