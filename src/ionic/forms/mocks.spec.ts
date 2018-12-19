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

import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';

import {Observable, of as obsOf} from 'rxjs';

import {Keyboard} from '@ionic-native/keyboard/ngx';


export class AjfFormRendererServiceMock {
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({'question_single_choice': [null]});
  }

  getControl(): Observable<AbstractControl | null> {
    const ctrl = this.form.controls['question_single_choice'];
    return obsOf(ctrl);
  }
}

export class KeyboardMock extends Keyboard {
    /**
     * Hide the keyboard accessory bar with the next, previous and done buttons.
     * @param hide {boolean}
     */
    hideKeyboardAccessoryBar(_hide: boolean): void {}
    /**
     * Force keyboard to be shown.
     */
    show(): void {}
    /**
     * Close the keyboard if open.
     */
    close(): void {}
    /**
     * Prevents the native UIScrollView from moving when an input is focused.
     * @param disable {boolean}
     */
    disableScroll(_disable: boolean): void {}
    /**
     * Creates an observable that notifies you when the keyboard is shown.
     * Unsubscribe to observable to cancel event watch.
     * @returns {Observable}
     */
    onKeyboardShow(): Observable<any> {
      return obsOf('');
    }
    /**
     * Creates an observable that notifies you when the keyboard is hidden.
     * Unsubscribe to observable to cancel event watch.
     * @returns {Observable}
     */
    onKeyboardHide(): Observable<any> {
      return obsOf('');
    }
}
