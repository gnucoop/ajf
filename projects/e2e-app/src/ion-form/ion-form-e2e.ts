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
import {Component} from '@angular/core';

const formSchema: any = {
  choicesOrigins: [
    {
      type: 'fixed',
      name: 'animals',
      choicesType: 'string',
      choices: [
        {value: 'dog', label: 'Dog'},
        {value: 'cat', label: 'Cat'},
      ],
    },
  ],
  nodes: [
    {
      parent: 0,
      id: 1,
      name: 'number1',
      label: 'Number Field Example',
      nodeType: 3,
      nodes: [
        {
          id: 10,
          parent: 1,
          name: 'number',
          label: 'Number',
          nodeType: 0,
          fieldType: 2,
          hint: 'Is a field that allows only numeric inputs',
          hintIcon: 'help-outline',
        },
        {
          parent: 10,
          id: 11,
          name: 'pet_type',
          label: 'Do you have a cat or a dog?',
          nodeType: 0,
          fieldType: 4,
          choicesOriginRef: 'animals',
          hint: 'which pet do you have at home?',
        },
      ],
    },
  ],
};

@Component({
  selector: 'ion-form-e2e',
  templateUrl: 'ion-form-e2e.html',
  styles: [
    `
  ajf-form {
    display: contents;
  }
  `,
  ],
})
export class IonicFormE2E {
  formSchema: string = JSON.stringify(formSchema);
  form: AjfForm;

  constructor() {
    this.form = AjfFormSerializer.fromJson(formSchema);
  }
}
