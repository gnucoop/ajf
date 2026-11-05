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

import {AjfTranslocoModule} from '@ajf/core/transloco';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

import {AjfGeolocationModule} from './public_api';

describe('AjfGeolocationComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let latitude: HTMLInputElement;
  let longitude: HTMLInputElement;

  const type = async (input: HTMLInputElement, value: string) => {
    input.value = value;
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjfTranslocoModule.forRoot(), TestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    await fixture.whenStable();
    [latitude, longitude] = fixture.nativeElement.querySelectorAll('input');
  });

  it('hands the typed coordinates to the form control', async () => {
    await type(latitude, '45,1');
    await type(longitude, '9.2');
    expect(fixture.componentInstance.ctrl.value).toBe('45.1,9.2');
  });

  it('drops a coordinate cleared by hand, and the value once both are', async () => {
    await type(latitude, '45.1');
    await type(longitude, '9.2');

    await type(latitude, '');
    expect(fixture.componentInstance.ctrl.value).toBe(',9.2');
    await type(longitude, '');
    expect(fixture.componentInstance.ctrl.value).toBeNull();
  });

  it('empties the inputs when the form control is reset', async () => {
    const ctrl = fixture.componentInstance.ctrl;
    ctrl.setValue('45.1,9.2');
    await fixture.whenStable();
    expect([latitude.value, longitude.value]).toEqual(['45.1', '9.2']);

    ctrl.reset();
    await fixture.whenStable();
    expect([latitude.value, longitude.value]).toEqual(['', '']);
  });
});

@Component({
  template: '<ajf-geolocation [formControl]="ctrl"></ajf-geolocation>',
  imports: [AjfGeolocationModule, ReactiveFormsModule],
})
class TestComponent {
  ctrl = new FormControl<string | null>(null);
}
