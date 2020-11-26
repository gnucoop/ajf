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

import {AjfFieldType, AjfFieldWithChoices, AjfFormSerializer, AjfNodeType} from '@ajf/core/forms';
import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';

import {AjfFormsModule} from './public-api';

describe('AjfFormRenderer', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AjfFormsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        TestComponent,
      ],
    });
    await TestBed.compileComponents();
  });

  it('read only select value should equals to label', async () => {
    const fixture = TestBed.createComponent(TestComponent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();

    let field = fixture.debugElement.query(By.css('.ajf-field-field')).nativeElement;
    expect(field.textContent).toEqual('Black Cat');
  });
});

const testForm = {
  choicesOrigins: [
    {
      name: 'choices',
      label: 'choices',
      type: 'fixed',
      choices: [
        {value: 'dog', label: 'Dog'},
        {value: 'cat', label: 'Cat'},
        {value: 'blackcat', label: 'Black Cat'},
      ],
    },
  ],
  nodes: [{
    id: 1,
    parent: 0,
    parentNode: 0,
    nodeType: AjfNodeType.AjfSlide,
    name: 'slide',
    label: 'slide',
    conditionalBranches: [{condition: 'true'}],
    nodes: [{
      id: 2,
      parent: 1,
      parentNode: 0,
      nodeType: AjfNodeType.AjfField,
      name: 'field',
      label: 'field',
      conditionalBranches: [{condition: 'true'}],
      fieldType: AjfFieldType.SingleChoice,
      choicesOriginRef: 'choices',
      validation: {notEmpty: true} as any
    } as unknown as AjfFieldWithChoices<string>]
  }],
} as any;

@Component({
  template: '<ajf-form readonly [form]="form"></ajf-form>',
})
class TestComponent {
  form = AjfFormSerializer.fromJson(testForm, {field: 'blackcat'});
}
