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

import {AjfFieldType, AjfFormRendererService, AjfFormSerializer,
  AjfNodeType, AjfSlideInstance} from '@ajf/core/forms';
import {TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import {timer} from 'rxjs';
import {first} from 'rxjs/operators';

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
    });

    service = TestBed.get(AjfFormRendererService);
    await TestBed.compileComponents();
  });

  it('should update slide validation based on fields value', async () => {
    const form = AjfFormSerializer.fromJson({
      nodes: [
        {
          id: 1,
          parent: 0,
          parentNode: 0,
          name: 'slide',
          label: 'slide',
          nodeType: 3,
          conditionalBranches: [{condition: 'true'}],
          nodes: [
            {
              id: 2,
              parent: 1,
              parentNode: 0,
              name: 'foo',
              label: 'foo',
              nodeType: AjfNodeType.AjfField,
              fieldType: AjfFieldType.String,
              validation: {
                notEmpty: true
              },
            } as any
          ]
        }
      ]
    });

    const fixture = TestBed.createComponent(AjfFormRenderer);
    const cmp = fixture.componentInstance;
    cmp.form = form;

    let nodesTree: AjfSlideInstance[] = [];
    service.nodesTree.pipe(first()).subscribe(r => nodesTree = r);

    fixture.detectChanges();
    await fixture.whenRenderingDone();

    const formGroup = (await cmp.formGroup.pipe(first()).toPromise())!;
    expect(formGroup).toBeDefined();
    expect(nodesTree[0].valid).toBeFalsy();

    formGroup.patchValue({foo: 'bar'});

    fixture.detectChanges();
    await fixture.whenRenderingDone();
    await timer(500).pipe(first()).toPromise();

    expect(nodesTree[0].valid).toBeTruthy();
  });
});
