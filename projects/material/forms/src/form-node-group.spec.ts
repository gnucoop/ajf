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
  AjfFormRendererService,
  AjfFormSerializer,
  AjfNodeType,
} from '@ajf/core/forms';
import {AjfTranslocoModule} from '@ajf/core/transloco';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {firstValueFrom, timer} from 'rxjs';
import {take} from 'rxjs/operators';

import {AjfFormRenderer, AjfFormsModule} from './public_api';

/**
 * A node group is a bracket around the fields it holds: it carries a visibility
 * condition for the whole block and renders nothing of itself. These check that
 * the fields inside one reach the page, and that the group leaves no row behind.
 */
describe('AjfFormRenderer node groups', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AjfFormsModule, NoopAnimationsModule, AjfTranslocoModule],
    });
    await TestBed.compileComponents();
  });

  const field = (id: number, parent: number, name: string) => ({
    id,
    parent,
    parentNode: 0,
    name,
    label: name,
    nodeType: AjfNodeType.AjfField,
    fieldType: AjfFieldType.String,
  });

  const group = (visibility?: {condition: string}, parent = 2) => ({
    id: 3,
    parent,
    parentNode: 0,
    name: 'group',
    label: 'group',
    nodeType: AjfNodeType.AjfNodeGroup,
    conditionalBranches: [{condition: 'true'}],
    ...(visibility ? {visibility} : {}),
    nodes: [field(4, 3, 'inside1'), field(5, 4, 'inside2')],
  });

  /** The fields actually laid out, in order, by the name on each row's label. */
  const visibleRows = (fixture: ComponentFixture<AjfFormRenderer>): string[] =>
    Array.from(fixture.nativeElement.querySelectorAll('ajf-field-row'))
      .filter(row => !(row as HTMLElement).classList.contains('ajf-hidden-row'))
      .map(row => {
        const label = (row as HTMLElement).querySelector('.ajf-field-label label');
        return label != null ? label.textContent!.trim() : '';
      });

  async function render(slide: any): Promise<ComponentFixture<AjfFormRenderer>> {
    const fixture = TestBed.createComponent(AjfFormRenderer);
    fixture.componentInstance.form = AjfFormSerializer.fromJson({nodes: [slide]} as any);
    fixture.detectChanges();
    await fixture.whenStable();
    await firstValueFrom(timer(300).pipe(take(1)));
    fixture.detectChanges();
    return fixture;
  }

  const slide = (nodeType: AjfNodeType, nodes: any[]) => ({
    id: 1,
    parent: 0,
    parentNode: 0,
    name: 'slide',
    label: 'slide',
    nodeType,
    conditionalBranches: [{condition: 'true'}],
    ...(nodeType === AjfNodeType.AjfRepeatingSlide ? {minReps: 1, maxReps: 3} : {}),
    nodes,
  });

  it('renders the fields of a group in a slide, and nothing for the group', async () => {
    const fixture = await render(slide(AjfNodeType.AjfSlide, [field(2, 1, 'outside'), group()]));

    expect(visibleRows(fixture)).toEqual(['en.outside', 'en.inside1', 'en.inside2']);
  });

  it('renders the fields of a group carrying a visibility condition', async () => {
    const fixture = await render(
      slide(AjfNodeType.AjfSlide, [field(2, 1, 'outside'), group({condition: 'true'})]),
    );

    expect(visibleRows(fixture)).toEqual(['en.outside', 'en.inside1', 'en.inside2']);
  });

  it('renders the fields of a group inside a repeating slide', async () => {
    const fixture = await render(
      slide(AjfNodeType.AjfRepeatingSlide, [field(2, 1, 'outside'), group()]),
    );

    expect(visibleRows(fixture)).toEqual(['en.outside', 'en.inside1', 'en.inside2']);
  });

  it('shows the fields of a group only while its visibility condition holds', async () => {
    // The condition names a field declared after the group, which is how the
    // form builder lays this out: a block of fields switched on by an answer
    // further down the slide.
    const fixture = await render(
      slide(AjfNodeType.AjfSlide, [group({condition: 'trigger'}, 1), field(2, 3, 'trigger')]),
    );
    const svc = TestBed.inject(AjfFormRendererService);
    const fg = (await firstValueFrom(svc.formGroup.pipe(take(1))))!;

    const settle = async () => {
      await fixture.whenStable();
      await firstValueFrom(timer(400).pipe(take(1)));
      fixture.detectChanges();
    };

    expect(visibleRows(fixture)).toEqual(['en.trigger']);

    fg.controls['trigger'].setValue('yes');
    await settle();
    expect(visibleRows(fixture)).toEqual(['en.inside1', 'en.inside2', 'en.trigger']);

    fg.controls['trigger'].setValue(null);
    await settle();
    expect(visibleRows(fixture)).toEqual(['en.trigger']);
  });
});
