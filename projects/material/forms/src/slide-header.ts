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

import {AjfSlideInstance} from '@ajf/core/forms';
import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

/**
 * The bar at the top of every slide: its number and title, a menu to jump to any
 * other slide, previous/next paging, and a slot for the form's own action
 * buttons.
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
  // Deliberately not OnPush: slide visibility and repetition counts are mutated
  // in place, so the jump menu and the repetition pill would go stale under a
  // strategy that only re-checks when an input identity changes.
})
export class AjfSlideHeader {
  /** Absent while a start or end message page is on screen. */
  @Input() slide: AjfSlideInstance | null = null;

  /** The number shown in the badge, already offset by any start message. */
  @Input() displayNumber = 1;

  /** Every slide of the form, for the jump menu. */
  @Input() slides: AjfSlideInstance[] = [];

  /** How many pages the slider holds, repetitions and message pages included. */
  @Input() pages = 0;

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
