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
import {TestBed} from '@angular/core/testing';

import {AjfImageType} from '../../core/image';

import {AjfImageModule} from './index';

describe('AjfImage', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AjfImageModule],
      declarations: [TestComponent],
    });
    await TestBed.compileComponents();
  });

  it('should support inline svg images', async () => {
    const fixture = TestBed.createComponent(TestComponent);

    fixture.detectChanges();
    await fixture.whenRenderingDone();

    const el = fixture.nativeElement as HTMLElement;
    const subEls = el.getElementsByTagName('img');
    expect(subEls.length).toBe(1);
    const imgEl = subEls[0] as HTMLImageElement;
    expect(imgEl.src).toBe(cartman);
  });
});

@Component({
  template: '<ajf-image [type]="type" [imageUrl]="imageUrl"></ajf-image>',
})
class TestComponent {
  type = AjfImageType.Image;
  imageUrl = cartman;
}

const cartman =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2aWV3Qm94P' +
  'SIwIDAgMTA0IDk3IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJtMTQgODVsMyA5' +
  'aDcyczUtOSA0LTEwYy0yLTItNzkgMC03OSAxIiBmaWxsPSIjN0M0RTMyIi8+CjxwYXRoIGQ9Im0xOSA0N3MtOSA3LTE' +
  'zIDE0Yy01IDYgMyA3IDMgN2wxIDE0czEwIDggMjMgOGMxNCAwIDI2IDEgMjggMHM5LTIgOS00YzEtMSAyNyAxIDI3LT' +
  'lzNy0yMC0xMS0yOWMtMTctOS02Ny0xLTY3LTEiIGZpbGw9IiNFMzAwMDAiLz4KPHBhdGggZD0ibTE3IDMyYy0zIDQ4I' +
  'DgwIDQzIDcxLTNsLTM1LTE1IiBmaWxsPSIjRkZFMUM0Ii8+CjxwYXRoIGQ9Im0xNyAzMmM5LTM2IDYxLTMyIDcxLTMt' +
  'MjAtOS00MC05LTcxIDMiIGZpbGw9IiM4RUQ4RjgiLz4KPHBhdGggZD0ibTU0IDM1YTEwIDggNjAgMSAxIDAgMC4xem0' +
  'tMTcgM2ExMCA4IC02MCAxIDEgMCAwLjF6IiBmaWxsPSIjRkZGIi8+CjxwYXRoIGQ9Im00MSA2YzEtMSA0LTMgOC0zID' +
  'MgMCA5LTEgMTQgM2wtMSAyaC00cy0zIDEtNSAwLTEtMS0xLTFsLTMgMS0yLTFoLTFzLTEgMi0zIDJjMCAwLTItMS0yL' +
  'TNtLTI0IDI4di0yczM1LTIwIDcxLTN2MnMtMzUtMTctNzEgM20tMTIgMjhjMy0yIDUtMiA4IDBzMTMgNiA4IDExYy0y' +
  'IDItNiAwLTggMC0xIDEtNCAyLTYgMS00LTMtNi04LTItMTJtOTQtM3MtOS0yLTExIDRsLTMgNWMwIDEtMiAzIDMgM3M' +
  '1IDIgNyAyYzMgMCA3LTEgNy00IDAtNC0xLTExLTMtMTAiIGZpbGw9IiNGRkYyMDAiLz4KPHBhdGggZD0ibTU2IDc4dj' +
  'FtLTEtMTB2MW0wIDE3djEiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik02M' +
  'CwzNmExIDEgMCAxIDEgMC0wLjFNNDksMzZhMSAxIDAgMSAxIDAtMC4xTTU3LDU1YTIgMyAwIDEgMSAwLTAuMU0xMiw5' +
  'NGMwLDAsMjAtNCw0MiwwYzAsMCwyNy00LDM5LDB6Ii8+CjxwYXRoIGQ9Im01MCA1OXM0IDMgMTAgMG0tNCA3bDIgMTI' +
  'tMiAxMm0tMzEtNDBzMTAgMTIgMjMgMTIgMjQgMCAzNS0xNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2' +
  'Utd2lkdGg9Ii41Ii8+Cjwvc3ZnPgo=';
