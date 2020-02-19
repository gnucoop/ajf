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

import {Input, Directive, ElementRef, Renderer2} from '@angular/core';


@Directive({ selector: '[applyStyles]' })
export class ApplyStylesDirective {
  private _cssStyles: { [style: string]: any; };
  @Input()
  set applyStyles(cssStyles: { [style: string]: any; }|null) {
    if (cssStyles != null && this._cssStyles !== cssStyles) {
      this._cssStyles = cssStyles;
      this._updateStyles();
    }
  }

  constructor(private _el: ElementRef, private _renderer: Renderer2) { }

  private _updateStyles(): void {
    if (this._cssStyles == null) {
      return;
    }

    Object.keys(this._cssStyles).forEach((style: string) => {
      try {
        this._renderer.setStyle(
          this._el.nativeElement,
          style,
          `${this._cssStyles[style]}`
        );
      } catch (e) { }
    });
  }
}
