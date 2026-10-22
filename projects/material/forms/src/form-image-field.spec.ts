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

import {AjfFieldType, AjfFormSerializer, AjfNodeType} from '@ajf/core/forms';
import {AjfFileInput} from '@ajf/core/file-input';
import {AjfTranslocoModule} from '@ajf/core/transloco';
import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {AjfFormsModule} from './public_api';

// A 1x1 transparent PNG.
const png = Uint8Array.from(
  atob(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  ),
  c => c.charCodeAt(0),
);

describe('AjfFormRenderer image field', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, AjfTranslocoModule.forRoot(), TestComponent],
    });
    await TestBed.compileComponents();
  });

  it('shows the preview of a picked image', async () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const fileInput = await vi.waitFor(() => {
      const input = fixture.debugElement.query(By.directive(AjfFileInput));
      expect(input).not.toBeNull();
      return input.componentInstance as AjfFileInput;
    });

    fileInput.value = new File([png], 'dot.png', {type: 'image/png'});

    await vi.waitFor(() => {
      const img = fixture.nativeElement.querySelector('.ajf-image-preview img') as HTMLImageElement;
      expect(img.getAttribute('src')).toMatch(/^data:image\/png;base64,/);
    });
  });
});

@Component({
  template: '<ajf-form [form]="form"></ajf-form>',
  imports: [AjfFormsModule],
})
class TestComponent {
  form = AjfFormSerializer.fromJson({
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
            name: 'image',
            label: 'image',
            conditionalBranches: [{condition: 'true'}],
            fieldType: AjfFieldType.Image,
          },
        ],
      },
    ],
  } as any);
}
