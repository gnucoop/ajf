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
  AjfForm, AjfFormSerializer,
  createFieldWithChoicesInstance
} from '@ajf/core/forms';
import {AjfFieldService} from '@ajf/material/forms';
import {AjfContext} from '@ajf/core/models';

import {Component, ChangeDetectorRef} from '@angular/core';

import {CustomSelectMultiple} from './custom-select-multiple';
import {formSchema, formContext} from './form';


@Component({
  moduleId: module.id,
  selector: 'forms-demo',
  templateUrl: 'forms-demo.html',
  styleUrls: ['forms-demo.css'],
})
export class FormsDemo {
  formSchema: string = JSON.stringify(formSchema);
  form: AjfForm;
  context: string = JSON.stringify(formContext);

  get readonly() {
    return this._readonly;
  }
  set readonly(value: boolean) {
    this._readonly = value;
    this._fieldService.setReadOnly(value);
    this._cdr.markForCheck();
  }
  private _readonly = false;

  constructor(private _fieldService: AjfFieldService, private _cdr: ChangeDetectorRef) {
    _fieldService.registerCustomField({
      fieldType: 101,
      component: CustomSelectMultiple,
      createInstance: createFieldWithChoicesInstance as any,
      isFieldWithChoice: true,
    });
    this.form = AjfFormSerializer.fromJson(formSchema, formContext);
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
}
