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

import {Inject, Optional, Pipe, PipeTransform} from '@angular/core';

import {AjfFieldInstance} from './interface/fields-instances/field-instance';
import {AjfFieldWithChoicesInstance} from './interface/fields-instances/field-with-choices-instance';
import {AjfFieldType} from './interface/fields/field-type';
import {AjfFieldWithChoices} from './interface/fields/field-with-choices';
import {AjfRangeField} from './interface/fields/range-field';
import {AjfValidation} from './interface/validation/validation';
import {AjfValidationGroup} from './interface/validation/validation-group';
import {AJF_SEARCH_ALERT_THRESHOLD} from './search-alert-threshold';

/**
 * What a field row prints under its label: the kind of field it is, in words,
 * plus the constraint the schema puts on it.
 *
 * `name` and `detailUnit` are translation keys, while `detailValue` carries the
 * numbers, which read the same in every language.
 */
export interface AjfFieldTypeLabel {
  /** Translation key for the type name, e.g. `text`, `single choice`. */
  name: string;
  /** The constraint's numbers, e.g. `16` or `0–100`. */
  detailValue?: string;
  /** Translation key for the constraint's unit, e.g. `characters`. */
  detailUnit?: string;
}

const NAMES: {[key: number]: string} = {
  [AjfFieldType.String]: 'text',
  [AjfFieldType.Text]: 'formatted text',
  [AjfFieldType.Number]: 'number',
  [AjfFieldType.Boolean]: 'yes/no',
  [AjfFieldType.SingleChoice]: 'single choice',
  [AjfFieldType.MultipleChoice]: 'multiple choice',
  [AjfFieldType.Formula]: 'calculated',
  [AjfFieldType.Empty]: 'note',
  [AjfFieldType.DateRange]: 'date range',
  [AjfFieldType.DateInput]: 'date',
  [AjfFieldType.Range]: 'range',
  [AjfFieldType.Time]: 'time',
  [AjfFieldType.Table]: 'table',
  [AjfFieldType.Geolocation]: 'position',
  [AjfFieldType.Barcode]: 'barcode',
  [AjfFieldType.File]: 'attachment',
  [AjfFieldType.Image]: 'image',
  [AjfFieldType.VideoUrl]: 'video',
  [AjfFieldType.Signature]: 'signature',
  [AjfFieldType.Audio]: 'audio',
};

const DEFAULT_SEARCH_THRESHOLD = 6;

/**
 * The digit bound of a validation, whether it was given as a plain number or
 * built by `maxDigitsValidation` / `minDigitsValidation`, whose conditions read
 * `$value ? $value.toString().length <= 16 : false`.
 */
const digitBound = (validation: AjfValidation | number | undefined): number | null => {
  if (validation == null) {
    return null;
  }
  if (typeof validation === 'number') {
    return validation;
  }
  const match = /length\s*[<>]=\s*(\d+)/.exec(validation.condition || '');
  return match != null ? parseInt(match[1], 10) : null;
};

/** The bound of a min/max value validation, when it was given as a plain number. */
const valueBound = (validation: AjfValidation | number | undefined): number | null =>
  typeof validation === 'number' ? validation : null;

/** `16` for a single bound or two that agree, `8–16` for two that differ. */
const digits = (min: number | null, max: number | null): string | undefined => {
  if (min != null && max != null) {
    return min === max ? String(max) : `${min}–${max}`;
  }
  const only = max != null ? max : min;
  return only != null ? String(only) : undefined;
};

/**
 * Resolve the type line of a field row.
 *
 * Takes the instance rather than the node because two of the names depend on how
 * the field actually ends up rendering: a choice field reads as `choice with
 * search` once its choices outgrow the search threshold, and a range field with
 * the `rating` appearance is a different thing from a slider.
 */
@Pipe({name: 'ajfFieldTypeLabel'})
export class AjfFieldTypeLabelPipe implements PipeTransform {
  private readonly _searchThreshold: number;

  constructor(
    @Optional() @Inject(AJF_SEARCH_ALERT_THRESHOLD) searchThreshold: number,
  ) {
    this._searchThreshold = searchThreshold != null ? searchThreshold : DEFAULT_SEARCH_THRESHOLD;
  }

  transform(instance: AjfFieldInstance): AjfFieldTypeLabel {
    const node = instance?.node;
    if (node == null) {
      return {name: 'field'};
    }
    return {name: this._name(instance), ...this._detail(node.validation)};
  }

  private _name(instance: AjfFieldInstance): string {
    const node = instance.node;
    switch (node.fieldType) {
      case AjfFieldType.Range:
        return (node as AjfRangeField).appearance === 'rating' ? 'rating' : 'range';
      case AjfFieldType.SingleChoice:
        return this._isNarrow(instance) ? 'choice with search' : 'single choice';
      case AjfFieldType.MultipleChoice:
        return this._isNarrow(instance) ? 'multiple choice with search' : 'multiple choice';
      default:
        return NAMES[node.fieldType] || 'field';
    }
  }

  /**
   * Whether the choices collapse into a searchable dropdown. Kept in step with
   * the `isNarrow` getter of the choice field components, `forceExpanded`
   * included, so the label never contradicts the control below it.
   */
  private _isNarrow(instance: AjfFieldInstance): boolean {
    const node = instance.node as AjfFieldWithChoices<unknown>;
    if (node.forceExpanded) {
      return false;
    }
    const choices = (instance as AjfFieldWithChoicesInstance<unknown>).filteredChoices;
    return Boolean(node.forceNarrow) || (choices || []).length > this._searchThreshold;
  }

  private _detail(validation: AjfValidationGroup | undefined): Partial<AjfFieldTypeLabel> {
    if (validation == null) {
      return {};
    }
    const length = digits(digitBound(validation.minDigits), digitBound(validation.maxDigits));
    if (length != null) {
      return {detailValue: length, detailUnit: 'characters'};
    }
    // A lone bound would print a bare number with nothing to tell the reader
    // which end of the range it is, so only a closed interval is worth showing.
    const min = valueBound(validation.minValue);
    const max = valueBound(validation.maxValue);
    return min != null && max != null ? {detailValue: `${min}–${max}`} : {};
  }
}
