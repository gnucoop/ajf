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
  AjfContext,
  buildStringIdentifier,
  buildStringIdentifierOpts,
  BuildStringIdentifierOpts,
} from '@ajf/core/common';

import {AjfField} from '../../interface/fields/field';
import {AjfFieldType} from '../../interface/fields/field-type';
import {AjfFieldWithChoices} from '../../interface/fields/field-with-choices';
import {AjfMultipleChoiceField} from '../../interface/fields/multiple-choice-field';
import {AjfSingleChoiceField} from '../../interface/fields/single-choice-field';
import {AjfForm} from '../../interface/forms/form';
import {isFieldWithChoices} from '../fields/is-field-with-choices';
import {flattenNodes} from '../nodes/flatten-nodes';
import {isField} from '../nodes/is-field';

/**
 * It builds a string that contains information preview about the form and its context.
 */
export const buildFormStringIdentifier =
    (form: AjfForm, context: AjfContext, opts?: BuildStringIdentifierOpts): string => {
      if (form == null) {
        return '';
      }
      const stringIdentifier = form.stringIdentifier || [];
      if (stringIdentifier.length === 0) {
        return '';
      }
      const fields =
          flattenNodes(form.nodes).filter(n => isField(n) && isFieldWithChoices(n as AjfField)) as
          AjfFieldWithChoices<unknown>[];
      if (fields.length > 0) {
        context = {...context};
        fields.forEach(field => {
          const value = context[field.name];
          if (value == null) {
            return;
          }
          if (field.fieldType === AjfFieldType.SingleChoice) {
            const singleChoiceField = field as AjfSingleChoiceField<unknown>;
            const choice = singleChoiceField.choicesOrigin.choices.find(c => c.value === value);
            if (choice == null) {
              return;
            }
            context[field.name] = choice.label;
          } else if (
              field.fieldType === AjfFieldType.MultipleChoice && Array.isArray(value) &&
              value.length > 0) {
            const strings = buildStringIdentifierOpts(opts);
            const multipleChoiceField = field as AjfMultipleChoiceField<unknown>;
            const choices =
                multipleChoiceField.choicesOrigin.choices.filter(c => value.indexOf(c.value) > -1);
            context[field.name] = choices.map(c => c.label).join(strings.valuesDivider);
          }
        });
      }
      return buildStringIdentifier(stringIdentifier, context, opts);
    };
