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
  AjfForm,
  AjfFormRendererService,
  AjfFormSerializer,
  AjfReadOnlyFieldComponent,
  createFieldWithChoicesInstance,
  createFormPdf
} from '@ajf/core/forms';
import {AjfContext} from '@ajf/core/models';
import {AjfFieldService} from '@ajf/material/forms';
import {Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {CustomSelectMultiple} from './custom-select-multiple';
import {formContext, formSchema} from './form';


@Component({
  selector: 'forms-demo',
  templateUrl: 'forms-demo.html',
  styleUrls: ['forms-demo.css'],
})
export class FormsDemo {
  formSchema: string = JSON.stringify(formSchema);
  form$: BehaviorSubject<AjfForm|null> = new BehaviorSubject<AjfForm|null>(null);

  context: string = JSON.stringify(formContext);

  get readonly() {
    return this._readonly;
  }
  set readonly(value: boolean) {
    this._readonly = value;
  }
  private _readonly = false;

  constructor(
      fieldService: AjfFieldService,
      private _formRendererService: AjfFormRendererService,
  ) {
    fieldService.registerCustomField({
      fieldType: 101,
      component: CustomSelectMultiple,
      readOnlyComponent: AjfReadOnlyFieldComponent,
      createInstance: createFieldWithChoicesInstance as any,
      isFieldWithChoice: true,
    });
    const form = AjfFormSerializer.fromJson(formSchema, formContext);
    this.form$.next(form);
    console.log(form);
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
      const form = AjfFormSerializer.fromJson(schema, context);
      console.log(form);
      this.form$.next(form);
    } catch (e) {
      console.log(e);
    }
  }

  getCurrentContext(): void {
    this.context = JSON.stringify(this._formRendererService.getFormValue());
  }

  printPdf() {
    const schema = {
      name: 'Test Form',
      schema: this.form$.getValue() as AjfForm,
      is_tallysheet: false,
    };
    const formData = {
      date_start: ' ',
      date_end: ' ',
      data: this._formRendererService.getFormValue(),
    };
    createFormPdf(schema, undefined, formData).open();
  }
}
