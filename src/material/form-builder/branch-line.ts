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

import {
  ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation
} from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'ajf-fb-branch-line',
  templateUrl: 'branch-line.html',
  styleUrls: ['branch-line.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfFbBranchLine {
  private _offset = 0;
  @Input() set offset(offset: number) {
    this._offset = offset;
    this._updateOffset();
  }

  private _color: string;
  @Input() set color(color: string) {
    this._color = color;
    this._updateColor();
  }

  private _height = 0;
  @Input() set height(height: number) {
    this._height = height;
    this._updateHeight();
  }

  constructor(private _el: ElementRef, private _renderer: Renderer2) { }

  private _updateHeight(): void {
    const height = `${Math.max(0, this._height - 25)}px`;
    this._renderer.setStyle(this._el.nativeElement, 'height', height);
  }

  private _updateOffset(): void {
    const margin = `${this._offset * 4}px`;
    this._renderer.setStyle(this._el.nativeElement, 'margin-top', margin);
    this._renderer.setStyle(this._el.nativeElement, 'margin-left', margin);
  }

  private _updateColor(): void {
    this._renderer.setStyle(this._el.nativeElement, 'border-color', this._color);
  }
}
