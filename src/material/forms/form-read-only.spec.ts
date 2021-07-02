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
  AjfField,
  AjfFieldType,
  AjfFieldWithChoices,
  AjfForm,
  AjfFormSerializer,
  AjfNodeType
} from '@ajf/core/forms';
import {AjfTranslocoModule} from '@ajf/core/transloco';
import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {timer} from 'rxjs';
import {take} from 'rxjs/operators';

import {AjfFormsModule} from './public-api';

describe('AjfFormRenderer', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AjfFormsModule,
        NoopAnimationsModule,
        AjfTranslocoModule,
      ],
      declarations: [
        TestComponent, TestReadOnlySingleChoiceComponent, TestReadOnlyMultipleChoiceComponent,
        TestReadOnlyInputComponent, TestReadOnlyInputAndFormComponent
      ],
    });
    await TestBed.compileComponents();
  });

  it('read only select value should equals to label', async () => {
    const fixture = TestBed.createComponent(TestComponent);

    fixture.detectChanges();
    await fixture.whenStable();
    await timer(200).pipe(take(1)).toPromise();
    fixture.detectChanges();
    await fixture.whenStable();

    let field = fixture.debugElement.query(By.css('.ajf-field-field')).nativeElement;
    expect(field.textContent).toEqual('Black Cat');
  });

  it('set single choice read only by schema', async () => {
    const fixture = TestBed.createComponent(TestReadOnlySingleChoiceComponent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();

    const field = fixture.debugElement.query(By.css('.ajf-field-field')).nativeElement;
    const spanChild: HTMLCollection = field.getElementsByTagName('span');
    // read only component structure <span> value </span>
    // this condition check if the field has a reader-only template
    const condition = spanChild && spanChild.length === 1 && spanChild.item(0) !== null &&
        (spanChild.item(0) as Element).textContent === 'Black Cat';
    expect(condition).toEqual(true);
  });

  it('set multiple choice read only by schema', async () => {
    const fixture = TestBed.createComponent(TestReadOnlyMultipleChoiceComponent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();

    const field = fixture.debugElement.query(By.css('.ajf-field-field')).nativeElement;
    const spanChild: HTMLCollection = field.getElementsByTagName('span');
    // read only component structure <span> value </span>
    // this condition check if the field has a reader-only template
    const condition = spanChild && spanChild.length === 1 && spanChild.item(0) !== null &&
        (spanChild.item(0) as Element).textContent === ' Black Cat ';
    expect(condition).toEqual(true);
  });

  it('set input read only by schema', async () => {
    const fixture = TestBed.createComponent(TestReadOnlyInputComponent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();

    const field = fixture.debugElement.query(By.css('.ajf-field-field')).nativeElement;
    const spanChild: HTMLCollection = field.getElementsByTagName('span');
    // read only component structure <span> value </span>
    // this condition check if the field has a reader-only template
    const condition = spanChild && spanChild.length === 1 && spanChild.item(0) !== null &&
        (spanChild.item(0) as Element).textContent === '15';
    expect(condition).toEqual(true);
  });

  it('readonly form override editable field', async () => {
    const fixture = TestBed.createComponent(TestReadOnlyInputAndFormComponent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();

    const field = fixture.debugElement.query(By.css('.ajf-field-field')).nativeElement;
    const spanChild: HTMLCollection = field.getElementsByTagName('span');
    // read only component structure <span> value </span>
    // this condition check if the field has a reader-only template
    const condition = spanChild && spanChild.length === 1 && spanChild.item(0) !== null &&
        (spanChild.item(0) as Element).textContent === '15';
    expect(condition).toEqual(true);
  });
});

const slideForm = {
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
    nodes: []
  }],
} as any;

const testForm = JSON.parse(JSON.stringify(slideForm)) as AjfForm;
testForm.nodes[0].nodes = [{
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
} as unknown as AjfFieldWithChoices<string>];

const inputTestForm = JSON.parse(JSON.stringify(slideForm)) as AjfForm;
inputTestForm.nodes[0].nodes = [{
  id: 2,
  parent: 1,
  name: 'field',
  label: 'field',
  nodeType: AjfNodeType.AjfField,
  fieldType: AjfFieldType.Number,
  editable: true,
  validation: {notEmpty: true} as any
} as unknown as AjfField];

const readOnlyInputTestForm = JSON.parse(JSON.stringify(slideForm)) as AjfForm;
readOnlyInputTestForm.nodes[0].nodes = [{
  id: 2,
  parent: 1,
  name: 'field',
  label: 'field',
  nodeType: AjfNodeType.AjfField,
  fieldType: AjfFieldType.Number,
  editable: false,
  validation: {notEmpty: true} as any
} as unknown as AjfField];

const readOnlySingleChoiceTestForm = JSON.parse(JSON.stringify(slideForm)) as AjfForm;
readOnlySingleChoiceTestForm.nodes[0].nodes = [{
  id: 2,
  parent: 1,
  parentNode: 0,
  nodeType: AjfNodeType.AjfField,
  editable: false,
  name: 'field',
  label: 'field',
  conditionalBranches: [{condition: 'true'}],
  fieldType: AjfFieldType.SingleChoice,
  choicesOriginRef: 'choices',
  validation: {notEmpty: true} as any
} as unknown as AjfFieldWithChoices<string>];

const readOnlyMultipleChoiceTestForm = JSON.parse(JSON.stringify(slideForm)) as AjfForm;
readOnlyMultipleChoiceTestForm.nodes[0].nodes = [{
  id: 2,
  parent: 1,
  parentNode: 0,
  nodeType: AjfNodeType.AjfField,
  editable: false,
  name: 'field',
  label: 'field',
  fieldType: AjfFieldType.MultipleChoice,
  choicesOriginRef: 'choices',
} as unknown as AjfFieldWithChoices<string>];
@Component({
  template: '<ajf-form readonly [form]="form"></ajf-form>',
})
class TestComponent {
  form = AjfFormSerializer.fromJson(testForm, {field: 'blackcat'});
}

@Component({
  template: '<ajf-form [form]="form"></ajf-form>',
})
class TestReadOnlyInputComponent {
  form = AjfFormSerializer.fromJson(readOnlyInputTestForm, {field: 15});
}

@Component({
  template: '<ajf-form readonly [form]="form"></ajf-form>',
})
class TestReadOnlyInputAndFormComponent {
  form = AjfFormSerializer.fromJson(inputTestForm, {field: 15});
}

@Component({
  template: '<ajf-form [form]="form"></ajf-form>',
})
class TestReadOnlySingleChoiceComponent {
  form = AjfFormSerializer.fromJson(readOnlySingleChoiceTestForm, {field: 'blackcat'});
}

@Component({
  template: '<ajf-form [form]="form"></ajf-form>',
})
class TestReadOnlyMultipleChoiceComponent {
  form = AjfFormSerializer.fromJson(readOnlyMultipleChoiceTestForm, {field: ['blackcat']});
}
