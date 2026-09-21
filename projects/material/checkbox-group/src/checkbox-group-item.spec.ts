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

import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

import {AjfCheckboxGroupModule} from './public_api';

/**
 * The item is a checkbox drawn as a bordered button, which means it inherits
 * Material's button metrics -- and Material states them through its own tokens,
 * from rules that outweigh anything a single-class rule here can say. These
 * cover the three places where that showed: the label's weight, the padding,
 * and the box holding its size while the field narrows.
 */
@Component({
  template: `<div class="themed" [style.width.px]="width">
    <ajf-checkbox-group class="ajf-choices-container" [formControl]="ctrl">
      <ajf-checkbox-group-item [value]="'a'">A rather long choice label</ajf-checkbox-group-item>
      <ajf-checkbox-group-item [value]="'b'">B</ajf-checkbox-group-item>
    </ajf-checkbox-group>
  </div>`,
  styles: [
    `
      /* A themed host, stating the metrics a Material theme would state. */
      .themed {
        --mdc-text-button-label-text-weight: 500;
        --mdc-text-button-container-height: 40px;
      }
      /* The layout the form's field.scss gives the choices container. */
      .ajf-choices-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: stretch;
        gap: 8px;
      }
    `,
  ],
})
class TestComponent {
  ctrl = new FormControl<string[]>([]);
  width = 600;
}

describe('CheckboxGroupItem appearance', () => {
  let fixture: ComponentFixture<TestComponent>;

  async function render(width: number): Promise<void> {
    fixture = TestBed.createComponent(TestComponent);
    fixture.componentInstance.width = width;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  const first = <T extends Element>(selector: string): T =>
    fixture.nativeElement.querySelector(selector) as T;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AjfCheckboxGroupModule, ReactiveFormsModule],
      declarations: [TestComponent],
    });
    await TestBed.compileComponents();
  });

  it('reads as body text, not as a call to action', async () => {
    await render(600);

    const label = first('.ajf-checkbox-group-content');
    expect(getComputedStyle(label).fontWeight).toBe('400');
  });

  it('keeps its own horizontal padding', async () => {
    await render(600);

    const button = first('button');
    expect(getComputedStyle(button).paddingLeft).toBe('14px');
    expect(getComputedStyle(button).paddingRight).toBe('14px');
  });

  it('keeps the checkbox square whole as the field narrows', async () => {
    await render(130);

    const icon = first('.mat-icon');
    // Squeezed, the glyph would be drawn at 18px inside a narrower box and show
    // a checkbox cut in half.
    expect(icon.getBoundingClientRect().width).toBe(18);
    expect(getComputedStyle(icon).flexShrink).toBe('0');
  });

  it('grows to the control height the tokens ask for, not the theme button height', async () => {
    await render(130);

    expect(first('button').getBoundingClientRect().height).toBeGreaterThanOrEqual(44);
  });
});
