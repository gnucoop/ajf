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
  AjfBaseSlideInstance,
  AjfFieldInstance,
  AjfFieldType,
  AjfNodeInstance,
  AjfRepeatingSlideInstance,
  AjfSlideInstance,
  isFieldInstance,
  isRepeatingSlideInstance,
  nodeInstanceCompleteName,
} from '@ajf/core/forms';
import {Pipe, PipeTransform} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';

/** The filled/total counter shown as a chip in the slide header. */
export interface AjfSlideCompletion {
  done: number;
  total: number;
}

/**
 * The fields a slide header counts. `slideNodes` is indexed per repetition, and
 * a non-repeating slide keeps its only set of nodes at index 0, so both kinds of
 * slide are read the same way.
 */
const countableFields = (slide: AjfBaseSlideInstance, idx: number): AjfFieldInstance[] => {
  const nodes: AjfNodeInstance[] =
    (slide.slideNodes && slide.slideNodes[idx]) || slide.flatNodes || [];
  return nodes.filter(
    n => n.visible && isFieldInstance(n) && n.node.fieldType !== AjfFieldType.Empty,
  ) as AjfFieldInstance[];
};

/**
 * Whether a field holds anything.
 *
 * The value is read off the form group, not off `AjfFieldInstance.value`: the
 * instance's own `value` is only written at initialisation and by formulas, so it
 * does not follow what the user types. The group is flat and keyed by each
 * instance's complete name, which is how `AjfFormRendererService.getControl`
 * resolves a control too.
 */
const isFilled = (field: AjfFieldInstance, formGroup: UntypedFormGroup | null): boolean => {
  const name = nodeInstanceCompleteName(field);
  const control = formGroup != null && formGroup.contains(name) ? formGroup.controls[name] : null;
  const value = control != null ? control.value : field.value;
  if (value == null || value === '') {
    return false;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return true;
};

/**
 * How many of a slide's fields carry a value, out of how many are on it. Notes
 * (`AjfFieldType.Empty`) hold no value and are left out of both numbers.
 *
 * Impure because it reads mutable instance state, in the same way as
 * `ajfValidSlide` and `ajfAsFieldInstanceErrors`. Returns a memoized object; see
 * the note inside.
 */
@Pipe({name: 'ajfSlideCompletion', pure: false})
export class AjfSlideCompletionPipe implements PipeTransform {
  private _last: AjfSlideCompletion | null = null;

  transform(
    slide: AjfBaseSlideInstance,
    idx: number = 0,
    formGroup: UntypedFormGroup | null = null,
  ): AjfSlideCompletion {
    const fields = countableFields(slide, idx);
    const done = fields.filter(f => isFilled(f, formGroup)).length;
    const total = fields.length;
    // Hand back the same object while the counts hold, or the fresh identity on
    // every check would trip Angular's "expression has changed" guard.
    if (this._last != null && this._last.done === done && this._last.total === total) {
      return this._last;
    }
    this._last = {done, total};
    return this._last;
  }
}

/**
 * How many of a slide's visible fields are failing validation.
 */
@Pipe({name: 'ajfSlideIssues', pure: false})
export class AjfSlideIssuesPipe implements PipeTransform {
  transform(slide: AjfBaseSlideInstance, idx: number = 0): number {
    return countableFields(slide, idx).filter(f => !f.valid).length;
  }
}

/** What is left to fix in the whole form, for the header and footer alerts. */
export interface AjfFormIssues {
  /** Visible fields failing validation, across every slide and repetition. */
  fields: number;
  /** How many slides hold at least one of them. */
  slides: number;
}

/**
 * The form's outstanding work in one place. A per-slide count only tells the
 * reader about the slide they are already looking at, which is the one place
 * they can see the failing fields for themselves.
 *
 * Counted here rather than taken from `AjfFormRendererService.errors`, which
 * counts invalid slide pages and says nothing about how many fields are behind
 * them.
 *
 * Impure and memoized, like its neighbours above.
 */
@Pipe({name: 'ajfFormIssues', pure: false})
export class AjfFormIssuesPipe implements PipeTransform {
  private _last: AjfFormIssues = {fields: 0, slides: 0};

  transform(slides: AjfSlideInstance[] | null): AjfFormIssues {
    let fields = 0;
    let slideCount = 0;
    (slides || [])
      .filter(slide => slide.visible !== false)
      .forEach(slide => {
        // Every repetition of a repeating slide carries its own set of fields,
        // and any of them can be the one failing.
        const reps = isRepeatingSlideInstance(slide)
          ? Math.max(1, (slide as AjfRepeatingSlideInstance).reps)
          : 1;
        let slideFields = 0;
        for (let idx = 0; idx < reps; idx++) {
          slideFields += countableFields(slide, idx).filter(f => !f.valid).length;
        }
        if (slideFields > 0) {
          fields += slideFields;
          slideCount++;
        }
      });
    if (this._last.fields === fields && this._last.slides === slideCount) {
      return this._last;
    }
    this._last = {fields, slides: slideCount};
    return this._last;
  }
}
