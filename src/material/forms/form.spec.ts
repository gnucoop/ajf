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
  AjfFieldType,
  AjfFieldWithChoices,
  AjfFormRendererService,
  AjfFormSerializer,
  AjfNodeType,
  AjfSlideInstance
} from '@ajf/core/forms';
import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import {timer} from 'rxjs';
import {take} from 'rxjs/operators';

import {AjfFormRenderer, AjfFormsModule} from './public-api';

describe('AjfFormRenderer', () => {
  let service: AjfFormRendererService;

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

    service = TestBed.get(AjfFormRendererService);
    await TestBed.compileComponents();
  });

  it('should update slide validation based on fields value', async () => {
    const form = AjfFormSerializer.fromJson({
      nodes: [{
        id: 1,
        parent: 0,
        parentNode: 0,
        name: 'slide',
        label: 'slide',
        nodeType: 3,
        conditionalBranches: [{condition: 'true'}],
        nodes: [{
          id: 2,
          parent: 1,
          parentNode: 0,
          name: 'foo',
          label: 'foo',
          nodeType: AjfNodeType.AjfField,
          fieldType: AjfFieldType.String,
          validation: {notEmpty: true},
        } as any]
      }]
    });

    const fixture = TestBed.createComponent(AjfFormRenderer);
    const cmp = fixture.componentInstance;
    cmp.form = form;

    let nodesTree: AjfSlideInstance[] = [];
    service.nodesTree.pipe(take(1)).subscribe(r => nodesTree = r);

    fixture.detectChanges();
    await fixture.whenStable();
    await timer(200).pipe(take(1)).toPromise();
    fixture.detectChanges();
    await fixture.whenStable();

    const formGroup = (await cmp.formGroup.pipe(take(1)).toPromise())!;
    expect(formGroup).toBeDefined();

    expect(nodesTree[0].valid).toBeFalsy();

    formGroup.patchValue({foo: 'bar'});

    fixture.detectChanges();
    await fixture.whenStable();
    await timer(200).pipe(take(1)).toPromise();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(nodesTree[0].valid).toBeTruthy();
  });

  it('should show error messages for invalid fields', async () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    await timer(200).pipe(take(1)).toPromise();
    fixture.detectChanges();
    await fixture.whenStable();

    let field = fixture.debugElement.query(By.css('.ajf-field-field')).nativeElement;
    expect(field).not.toHaveClass('ajf-validated');
    let error = fixture.debugElement.query(By.css('.error'));
    expect(error).not.toBeNull();
    expect(error.nativeElement).toBeDefined();

    fixture.componentInstance.form = AjfFormSerializer.fromJson(testForm, {field: 'choice 1'});

    fixture.detectChanges();
    await fixture.whenStable();
    await timer(200).pipe(take(1)).toPromise();
    fixture.detectChanges();
    await fixture.whenStable();

    field = fixture.debugElement.query(By.css('.ajf-field-field')).nativeElement;
    expect(field).toHaveClass('ajf-validated');
    error = fixture.debugElement.query(By.css('.error'));
    expect(error).toBeNull();
  });

  it('should show the sum of first and second cell in the third cell', async () => {
    const formulasForm: any = {
      choicesOrigins: [],
      nodes: [{
        parent: 0,
        id: 7,
        name: 'table1',
        label: 'editable table with formulas',
        nodeType: 3,
        nodes: [{
          id: 701,
          parent: 7,
          name: 'row',
          rows: [['value1', 'value2', {formula: 'row__0__0+row__0__1', editable: false}]],
          label: '2.1',
          editable: true,
          nodeType: 0,
          fieldType: 11,
          rowLabels: ['row1'],
          columnLabels: ['value1', 'value2', 'sum']
        }]
      }]
    };
    const context: any = {value1: 1, value2: 2};

    const fixture = TestBed.createComponent(AjfFormRenderer);
    const cmp = fixture.componentInstance;

    const form = AjfFormSerializer.fromJson(formulasForm, context);
    cmp.form = form;

    fixture.detectChanges();
    await fixture.whenStable();
    await timer(100).pipe(take(1)).toPromise();
    fixture.detectChanges();
    await fixture.whenStable();

    const formGroup = (await cmp.formGroup.pipe(take(1)).toPromise())!;
    const ctx = service.getFormValue();

    expect(formGroup).toBeDefined();
    expect(ctx).toBeDefined();
    expect(ctx['row__0__2']).toBeDefined();
    expect(ctx['row__0__2']).toBe(3);
  });

  it('should be valid if no validation rule is defined', async () => {
    const form = AjfFormSerializer.fromJson({
      nodes: [{
        id: 1,
        parent: 0,
        parentNode: 0,
        name: 'slide',
        label: 'slide',
        nodeType: 3,
        conditionalBranches: [{condition: 'true'}],
        nodes: [{
          id: 2,
          parent: 1,
          parentNode: 0,
          name: 'foo',
          label: 'foo',
          nodeType: AjfNodeType.AjfField,
          fieldType: AjfFieldType.String,
        } as any]
      }]
    });


    const fixture = TestBed.createComponent(AjfFormRenderer);
    const cmp = fixture.componentInstance;
    cmp.form = form;

    let nodesTree: AjfSlideInstance[] = [];
    service.nodesTree.pipe(take(1)).subscribe(r => nodesTree = r);

    fixture.detectChanges();
    await fixture.whenStable();
    await timer(200).pipe(take(1)).toPromise();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(nodesTree[0].valid).toBeTruthy();
  });
});

const testForm = {
  choicesOrigins: [
    {
      name: 'choices',
      label: 'choices',
      type: 'fixed',
      choices: [
        {label: 'choice 1', value: 'choice 1'},
        {label: 'choice 2', value: 'choice 2'},
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
  template: '<ajf-form [form]="form"></ajf-form>',
})
class TestComponent {
  form = AjfFormSerializer.fromJson(testForm);
}
