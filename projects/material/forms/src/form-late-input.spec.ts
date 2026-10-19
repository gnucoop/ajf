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
  AjfForm,
  AjfFormSerializer,
  AjfNodeType,
} from '@ajf/core/forms';
import {AjfTranslocoModule} from '@ajf/core/transloco';
import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {firstValueFrom, timer} from 'rxjs';
import {take} from 'rxjs/operators';

import {AjfFormsModule} from './public_api';

describe('AjfFormRenderer form input', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, AjfTranslocoModule.forRoot(), TestComponent],
    });
    await TestBed.compileComponents();
  });

  it('renders a form set while the first one is still rendering', async () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    // The choices origins of the first form are still resolving, so the slider
    // does not exist yet: this is the form that used to be dropped.
    fixture.componentInstance.form = buildForm([{value: 'blackcat', label: 'Black Cat'}]);
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    // Once the slider shows up, the second form goes to the renderer and its
    // choices origins resolve in turn: two rounds before the field settles.
    for (let i = 0; i < 2; i++) {
      await fixture.whenStable();
      await firstValueFrom(timer(200).pipe(take(1)));
      fixture.detectChanges();
    }
    await fixture.whenStable();

    const field = fixture.debugElement.query(By.css('.ajf-field-field')).nativeElement;
    expect(field.textContent).toEqual('Black Cat');
  });
});

function buildForm(choices: {value: string; label: string}[]): AjfForm {
  return AjfFormSerializer.fromJson(
    {
      choicesOrigins: [{name: 'choices', label: 'choices', type: 'fixed', choices}],
      nodes: [
        {
          id: 1,
          parent: 0,
          parentNode: 0,
          nodeType: AjfNodeType.AjfSlide,
          name: 'slide',
          label: 'slide',
          conditionalBranches: [{condition: 'true'}],
          nodes: [
            {
              id: 2,
              parent: 1,
              parentNode: 0,
              nodeType: AjfNodeType.AjfField,
              name: 'field',
              label: 'field',
              conditionalBranches: [{condition: 'true'}],
              fieldType: AjfFieldType.SingleChoice,
              choicesOriginRef: 'choices',
            } as unknown as AjfFieldWithChoices<string>,
          ],
        },
      ],
    } as any,
    {field: 'blackcat'},
  );
}

@Component({
  template: '<ajf-form readonly [form]="form"></ajf-form>',
  imports: [AjfFormsModule],
})
class TestComponent {
  form = buildForm([{value: 'none', label: 'None'}]);
}
