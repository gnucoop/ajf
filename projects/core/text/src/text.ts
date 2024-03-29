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

import {TranslocoService} from '@ajf/core/transloco';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

/**
 * this component manages the report text
 *
 * @export
 */
@Component({
  selector: 'ajf-text',
  templateUrl: 'text.html',
  styleUrls: ['text.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AjfTextComponent {
  /**
   * @memberOf TextComponent
   */
  private _htmlText: SafeHtml | undefined;
  @Input()
  set htmlText(htmlText: string) {
    // type checking and length checking for instant method
    const htmlTextToBeTranslate: string =
      htmlText != null && typeof htmlText === 'string' && htmlText.trim().length > 0
        ? this._ts.translate(htmlText)
        : htmlText;
    this._htmlText = this._domSanitizer.bypassSecurityTrustHtml(htmlTextToBeTranslate);
    this._cdr.markForCheck();
  }

  get innerHTML(): SafeHtml | undefined {
    return this._htmlText;
  }

  constructor(
    private _cdr: ChangeDetectorRef,
    private _domSanitizer: DomSanitizer,
    private _ts: TranslocoService,
  ) {}
}
