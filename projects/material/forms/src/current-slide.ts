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

import {
  AjfRepeatingSlideInstance,
  AjfSlideInstance,
  isRepeatingSlideInstance,
} from '@ajf/core/forms';
import {Pipe, PipeTransform} from '@angular/core';

/** Which slide the page slider is currently showing, and where it sits. */
export interface AjfCurrentSlide {
  /** Null while a start or end message page is on screen. */
  slide: AjfSlideInstance | null;
  /** The repetition on screen, zero based; 0 for a non-repeating slide. */
  repIndex: number;
  /** How many repetitions the slide has; 0 when it does not repeat. */
  reps: number;
  /** The slide's ordinal among the visible ones, for the header badge. */
  displayNumber: number;
  /** How many visible slides the form has. */
  total: number;
  /**
   * How many pages the slider holds: one per visible slide, one per repetition
   * of a repeating slide, plus the start and end message pages. Nothing to
   * navigate to when this is 1.
   */
  pages: number;
}

const pageCount = (slide: AjfSlideInstance): number =>
  isRepeatingSlideInstance(slide) ? Math.max(1, (slide as AjfRepeatingSlideInstance).reps) : 1;

/**
 * Resolve the page slider's current page into a slide.
 *
 * The renderer lays out one page per slide, and one page per repetition of a
 * repeating slide, optionally preceded by a start message page -- the same
 * arithmetic the error navigation in `AjfFormRenderer` performs.
 *
 * Impure, because slide visibility and repetition counts are mutated in place.
 * The result is memoized so that the pipe keeps handing back the same object
 * while nothing has moved: returning a fresh one on every check would trip
 * Angular's "expression has changed after it was checked" guard.
 */
@Pipe({name: 'ajfCurrentSlide', pure: false})
export class AjfCurrentSlidePipe implements PipeTransform {
  private _last: AjfCurrentSlide | null = null;

  transform(
    slides: AjfSlideInstance[] | null,
    currentPage: number,
    hasStartMessage: boolean,
    hasEndMessage: boolean = false,
  ): AjfCurrentSlide {
    const visible = (slides || []).filter(s => s.visible !== false);
    const offset = hasStartMessage ? 1 : 0;
    const next: AjfCurrentSlide = {
      slide: null,
      repIndex: 0,
      reps: 0,
      displayNumber: Math.max(1, (currentPage || 0) + 1),
      total: visible.length,
      pages:
        offset +
        (hasEndMessage ? 1 : 0) +
        visible.reduce((count, slide) => count + pageCount(slide), 0),
    };

    let page = (currentPage || 0) - offset;
    if (page >= 0) {
      for (let i = 0; i < visible.length; i++) {
        const slide = visible[i];
        const pages = pageCount(slide);
        if (page < pages) {
          next.slide = slide;
          next.repIndex = page;
          next.reps = isRepeatingSlideInstance(slide)
            ? (slide as AjfRepeatingSlideInstance).reps
            : 0;
          next.displayNumber = i + 1 + offset;
          break;
        }
        page -= pages;
      }
    }

    const last = this._last;
    if (
      last != null &&
      last.slide === next.slide &&
      last.repIndex === next.repIndex &&
      last.reps === next.reps &&
      last.displayNumber === next.displayNumber &&
      last.total === next.total &&
      last.pages === next.pages
    ) {
      return last;
    }
    this._last = next;
    return next;
  }
}
