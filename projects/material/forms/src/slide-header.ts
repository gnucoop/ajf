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

import {AjfSlideInstance, isRepeatingSlideInstance} from '@ajf/core/forms';
import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';

/**
 * The bar at the top of every slide: its number and title, a completion
 * counter, a menu to jump to any other slide, previous/next paging, and a slot
 * for the form's own action buttons.
 *
 * What the form still has failing is reported by the footer alone. Naming it
 * here too cost a phone's whole header width to repeat something already on
 * screen.
 *
 * Paging belongs to the renderer, which owns the page slider, so it is raised
 * as an event rather than handled here.
 */
@Component({
  selector: 'ajf-slide-header',
  templateUrl: 'slide-header.html',
  styleUrls: ['slide-header.scss'],
  encapsulation: ViewEncapsulation.None,
  // Deliberately not OnPush: the completion counter and the add/remove guards
  // are read off mutable instance state through impure pipes,
  // which under OnPush would only be recomputed when an input identity changed.
})
export class AjfSlideHeader {
  /** Absent while a start or end message page is on screen. */
  @Input() slide: AjfSlideInstance | null = null;

  /** The number shown in the badge, already offset by any start message. */
  @Input() displayNumber = 1;

  /** Which repetition of a repeating slide this header belongs to. */
  @Input() repIndex = 0;

  /** Every slide of the form, for the jump menu. */
  @Input() slides: AjfSlideInstance[] = [];

  /** How many repetitions a repeating slide currently has; 0 when not repeating. */
  @Input() reps = 0;

  /** How many visible slides the form has, for the "slide N of M" readout. */
  @Input() total = 0;

  /** How many pages the slider holds, repetitions and message pages included. */
  @Input() pages = 0;

  /**
   * The form's control group, which the completion counter reads values from.
   * Not named `formGroup`: that is ReactiveFormsModule's own selector, and would
   * bind FormGroupDirective to this element too.
   */
  @Input() group: UntypedFormGroup | null = null;

  /**
   * Whether any slide of the form repeats. The repetition count sits inside the
   * jump trigger, so its slot is held open on every slide of such a form -- one
   * width for the whole form beats a trigger that jumps by the width of a pill
   * whenever a repeating slide comes up. Forms with no repeating slide never
   * reserve the space.
   */
  get hasRepeatingSlides(): boolean {
    return this.slides.some(s => isRepeatingSlideInstance(s));
  }

  /**
   * Whether the form has anywhere to page to. A single page form gets no arrows
   * and no "slide 1 of 1": both are controls that cannot do anything.
   */
  get canNavigate(): boolean {
    return this.pages > 1;
  }

  /**
   * Whether the jump menu is worth opening. Counted over the visible slides, the
   * only ones the menu can actually reach.
   */
  get canJump(): boolean {
    return this.slides.filter(s => s.visible !== false).length > 1;
  }

  @Output() readonly jumpTo = new EventEmitter<AjfSlideInstance>();
  @Output() readonly prev = new EventEmitter<void>();
  @Output() readonly next = new EventEmitter<void>();
}
