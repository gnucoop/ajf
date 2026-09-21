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

import {AjfRepeatingSlideInstance} from '@ajf/core/forms';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

/**
 * The pager for a repeating slide: one button per repetition plus add and remove
 * actions. The renderer keeps one page per repetition, so picking a number here
 * is a page change, which the renderer performs.
 */
@Component({
  selector: 'ajf-rep-strip',
  templateUrl: 'rep-strip.html',
  styleUrls: ['rep-strip.scss'],
  encapsulation: ViewEncapsulation.None,
  // Deliberately not OnPush: `reps`, `canAdd` and `canRemove` are mutated in
  // place on the slide instance, so the guards below would go stale under a
  // strategy that only re-checks when an input identity changes.
})
export class AjfRepStrip {
  @Input() slide!: AjfRepeatingSlideInstance;

  /** The repetition currently on screen, zero based. */
  @Input() current = 0;

  @Input()
  set readonly(readonly: boolean) {
    this._readonly = coerceBooleanProperty(readonly);
  }
  get readonly(): boolean {
    return this._readonly;
  }
  private _readonly = false;

  @Output() readonly goTo = new EventEmitter<number>();
  @Output() readonly add = new EventEmitter<void>();
  @Output() readonly remove = new EventEmitter<void>();

  /**
   * A repetition count driven by a formula is not the reader's to change:
   * `AjfFormRendererService.addGroup` and `removeGroup` both refuse the call
   * outright, so without this the buttons would sit enabled and do nothing.
   */
  private get manualReps(): boolean {
    return this.slide.formulaReps == null;
  }

  get canAdd(): boolean {
    return this.manualReps && !!this.slide.canAdd;
  }

  get canRemove(): boolean {
    return this.manualReps && !!this.slide.canRemove;
  }

  static ngAcceptInputType_readonly: BooleanInput;
}
