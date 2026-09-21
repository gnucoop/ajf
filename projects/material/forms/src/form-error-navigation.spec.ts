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
import {AjfTranslocoModule} from '@ajf/core/transloco';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {firstValueFrom, timer} from 'rxjs';
import {take} from 'rxjs/operators';

import {AjfFormRenderer, AjfFormsModule} from './public_api';

/**
 * The footer reports what is left to fix and offers to page to it. These cover
 * the second half of that: that the arrows move the slider on a form the user
 * has only opened, which is how a saved draft reaches the renderer -- no value
 * has moved, and the error positions have to be there all the same.
 */
describe('AjfFormRenderer error navigation', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AjfFormsModule, NoopAnimationsModule, AjfTranslocoModule],
    });
    await TestBed.compileComponents();
  });

  const field = (id: number, parent: number, name: string, required = false) => ({
    id,
    parent,
    parentNode: 0,
    name,
    label: name,
    nodeType: AjfNodeType.AjfField,
    fieldType: AjfFieldType.String,
    ...(required ? {validation: {notEmpty: true}} : {}),
  });

  const slide = (id: number, parent: number, name: string, nodes: any[]) => ({
    id,
    parent,
    parentNode: 0,
    name,
    label: name,
    nodeType: AjfNodeType.AjfSlide,
    conditionalBranches: [{condition: 'true'}],
    nodes,
  });

  /** Two slides, the second one holding a required field left empty. */
  async function render(hasStartMessage = false): Promise<ComponentFixture<AjfFormRenderer>> {
    const fixture = TestBed.createComponent(AjfFormRenderer);
    fixture.componentInstance.hasStartMessage = hasStartMessage;
    fixture.componentInstance.form = AjfFormSerializer.fromJson({
      nodes: [
        slide(1, 0, 'first', [field(2, 1, 'filled')]),
        slide(3, 1, 'second', [field(4, 3, 'required', true)]),
      ],
    } as any);
    fixture.detectChanges();
    await fixture.whenStable();
    await firstValueFrom(timer(300).pipe(take(1)));
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  /** The footer's two jump arrows: back to an error, on to the next one. */
  const jumpButtons = (fixture: ComponentFixture<AjfFormRenderer>): HTMLButtonElement[] =>
    Array.from(fixture.nativeElement.querySelectorAll('.ajf-footer-jump button'));

  async function click(
    fixture: ComponentFixture<AjfFormRenderer>,
    which: 'prev' | 'next',
  ): Promise<void> {
    jumpButtons(fixture)[which === 'prev' ? 0 : 1].click();
    fixture.detectChanges();
    await fixture.whenStable();
  }

  it('reports the outstanding field in the footer', async () => {
    const fixture = await render();

    expect(fixture.nativeElement.querySelector('.ajf-form-footer-status')).not.toBeNull();
    expect(jumpButtons(fixture).length).toBe(2);
  });

  it('pages to the failing slide, on a form that was only opened', async () => {
    const fixture = await render();
    expect(fixture.componentInstance.formSlider.currentPage).toBe(0);

    await click(fixture, 'next');

    expect(fixture.componentInstance.formSlider.currentPage).toBe(1);
  });

  it('pages to it with the back arrow too, there being only one error', async () => {
    const fixture = await render();

    await click(fixture, 'prev');

    expect(fixture.componentInstance.formSlider.currentPage).toBe(1);
  });

  it('counts the start message page when paging to the error', async () => {
    const fixture = await render(true);
    expect(fixture.componentInstance.formSlider.currentPage).toBe(0);

    await click(fixture, 'next');

    // Page 0 is the message, so the second slide is page 2.
    expect(fixture.componentInstance.formSlider.currentPage).toBe(2);
  });
});
