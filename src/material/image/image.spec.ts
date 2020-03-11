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

import {AjfImageType} from '@ajf/core/image';
import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';

import {AjfImageModule} from './public-api';

describe('AjfImage', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AjfImageModule,
      ],
      declarations: [
        TestComponent,
      ],
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
  template: '<ajf-image [type]="type" [imageUrl]="imageUrl"></ajf-image>'
})
class TestComponent {
  type = AjfImageType.Image;
  imageUrl = cartman;
}

const cartman = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2'
  + 'ZyB2aWV3Qm94PSIwIDAgMTA0IDk3IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJtMT'
  + 'QgODVsMyA5aDcyczUtOSA0LTEwYy0yLTItNzkgMC03OSAxIiBmaWxsPSIjN0M0RTMyIi8+CjxwYXRoIGQ9Im0xOSA0N3Mt'
  + 'OSA3LTEzIDE0Yy01IDYgMyA3IDMgN2wxIDE0czEwIDggMjMgOGMxNCAwIDI2IDEgMjggMHM5LTIgOS00YzEtMSAyNyAxID'
  + 'I3LTlzNy0yMC0xMS0yOWMtMTctOS02Ny0xLTY3LTEiIGZpbGw9IiNFMzAwMDAiLz4KPHBhdGggZD0ibTE3IDMyYy0zIDQ4'
  + 'IDgwIDQzIDcxLTNsLTM1LTE1IiBmaWxsPSIjRkZFMUM0Ii8+CjxwYXRoIGQ9Im0xNyAzMmM5LTM2IDYxLTMyIDcxLTMtMj'
  + 'AtOS00MC05LTcxIDMiIGZpbGw9IiM4RUQ4RjgiLz4KPHBhdGggZD0ibTU0IDM1YTEwIDggNjAgMSAxIDAgMC4xem0tMTcg'
  + 'M2ExMCA4IC02MCAxIDEgMCAwLjF6IiBmaWxsPSIjRkZGIi8+CjxwYXRoIGQ9Im00MSA2YzEtMSA0LTMgOC0zIDMgMCA5LT'
  + 'EgMTQgM2wtMSAyaC00cy0zIDEtNSAwLTEtMS0xLTFsLTMgMS0yLTFoLTFzLTEgMi0zIDJjMCAwLTItMS0yLTNtLTI0IDI4'
  + 'di0yczM1LTIwIDcxLTN2MnMtMzUtMTctNzEgM20tMTIgMjhjMy0yIDUtMiA4IDBzMTMgNiA4IDExYy0yIDItNiAwLTggMC'
  + '0xIDEtNCAyLTYgMS00LTMtNi04LTItMTJtOTQtM3MtOS0yLTExIDRsLTMgNWMwIDEtMiAzIDMgM3M1IDIgNyAyYzMgMCA3'
  + 'LTEgNy00IDAtNC0xLTExLTMtMTAiIGZpbGw9IiNGRkYyMDAiLz4KPHBhdGggZD0ibTU2IDc4djFtLTEtMTB2MW0wIDE3dj'
  + 'EiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik02MCwzNmExIDEgMCAxIDEgMC0w'
  + 'LjFNNDksMzZhMSAxIDAgMSAxIDAtMC4xTTU3LDU1YTIgMyAwIDEgMSAwLTAuMU0xMiw5NGMwLDAsMjAtNCw0MiwwYzAsMC'
  + 'wyNy00LDM5LDB6Ii8+CjxwYXRoIGQ9Im01MCA1OXM0IDMgMTAgMG0tNCA3bDIgMTItMiAxMm0tMzEtNDBzMTAgMTIgMjMg'
  + 'MTIgMjQgMCAzNS0xNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9Ii41Ii8+Cjwvc3ZnPgo=';
