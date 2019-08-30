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

import {AjfForm, AjfFormSerializer} from '@ajf/core/forms';
import {AjfContext} from '@ajf/core/models';
import {AjfJsonValidator} from '@ajf/core/json-validation';
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
  form: AjfForm = AjfFormSerializer.fromJson(formSchema);
  formIsVisible: boolean = false;
  context: string = '{}';

  messages: Array<string> = [];

  setSchema(): void {
    if (this.formSchema == null) {
      return;
    }
    let formSchemaOb: object = {};

    this.messages = [];
    let contextob: AjfContext | undefined = undefined;

    try {
      formSchemaOb = JSON.parse(this.formSchema);

      let schemaIsValid =  AjfJsonValidator.validate(formSchemaOb);

      if (!schemaIsValid) {
        this.messages = this.messages.concat(
          (AjfJsonValidator.getErrors() || [])
            .map((e) =>
              `${e.dataPath} ${e.message} (${Object.keys(e.params)
                .map(k => `${k}=${Object(e.params)[k]}`)
                .join(',')
              })`
            )
        );
      } else {
        if (this.context != null && this.context.length > 0) {
          contextob = JSON.parse(this.context);
        } else {
          contextob = {};
        }
      }

      this.formIsVisible = schemaIsValid;
    } catch (e) {
      console.log(e);
      this.messages.push(e);
      this.formIsVisible = false;
    }

    if (this.formIsVisible) {
      this.form = AjfFormSerializer.fromJson(formSchemaOb, contextob);
    }
  }
}
