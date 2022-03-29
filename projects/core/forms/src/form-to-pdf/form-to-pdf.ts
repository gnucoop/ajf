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

import {AjfContext, evaluateExpression} from '@ajf/core/models';
import {
  createPdf,
  Content,
  PageOrientation,
  TCreatedPdf,
  TDocumentDefinitions,
} from '@ajf/core/pdfmake';

import {AjfChoice} from '../interface/choices/choice';
import {AjfEmptyField} from '../interface/fields/empty-field';
import {AjfField} from '../interface/fields/field';
import {AjfFieldType} from '../interface/fields/field-type';
import {AjfTableField} from '../interface/fields/table-field';
import {AjfForm} from '../interface/forms/form';
import {AjfNodeType} from '../interface/nodes/node-type';
import {AjfRepeatingSlide} from '../interface/slides/repeating-slide';
import {AjfSlide} from '../interface/slides/slide';
import {isField} from '../utils/nodes/is-field';
import {isRepeatingSlide} from '../utils/nodes/is-repeating-slide';
import {isSlideNode} from '../utils/nodes/is-slide-node';

export function createFormPdf(
  form: AjfForm,
  translate?: (_: string) => string,
  orientation?: PageOrientation,
  header?: Content[],
  context?: AjfContext,
): TCreatedPdf {
  const t = translate ? translate : (s: string) => s;
  const pdfDef = formToPdf(form, t, orientation, header, context);
  return createPdf(pdfDef);
}

// ChoicesMap maps a choicesOriginRef to the list the choices.
interface ChoicesMap {
  [name: string]: AjfChoice<any>[];
}

function stripHTML(s: string): string {
  return s.replace(/<\/?[^>]+(>|$)/g, '');
}

// Given a context, lookupStringFunction returns a function that allows to retrieve
// the field values from the context. The values are returned as print-friendly strings.
// rep is the index of the repeating slide, if the field belongs to one.
function lookupStringFunction(context?: AjfContext, rep?: number): (name: string) => string {
  if (context == null) {
    return (_: string) => ' ';
  }
  return (name: string) => {
    if (name == null) {
      return ' ';
    }
    if (rep != null) {
      name = name + '__' + rep;
    }
    const val = context[name];
    if (val == null) {
      return ' ';
    }
    if (val === true) {
      return 'yes';
    }
    if (val === false) {
      return 'no';
    }
    return String(val);
  };
}

// Analogous to lookupStringFunction, but for multiple-choice questions,
// returning an array of values.
function lookupArrayFunction(context?: AjfContext, rep?: number): (name: string) => string[] {
  if (context == null) {
    return (_: string) => [];
  }
  return (name: string) => {
    if (name == null) {
      return [];
    }
    if (rep != null) {
      name = name + '__' + rep;
    }
    const val = context[name];
    if (Array.isArray(val)) {
      return val;
    }
    return [];
  };
}

// Given an AjfForm, returns its pdfmake pdf document definition.
function formToPdf(
  form: AjfForm,
  translate: (s: string) => string,
  orientation?: PageOrientation,
  header?: Content[],
  context?: AjfContext,
): TDocumentDefinitions {
  const choicesMap: ChoicesMap = {};
  for (const o of form.choicesOrigins) {
    choicesMap[o.name] = o.choices;
  }

  const content = header ? [...header] : [];
  for (const slide of form.nodes) {
    if (isSlideNode(slide)) {
      content.push(...slideToPdf(slide, choicesMap, translate, context));
    } else if (isRepeatingSlide(slide)) {
      content.push(...repeatingSlideToPdf(slide, choicesMap, translate, context));
    }
  }
  return {content, pageOrientation: orientation};
}

function slideToPdf(
  slide: AjfSlide | AjfRepeatingSlide,
  choicesMap: ChoicesMap,
  translate: (s: string) => string,
  context?: AjfContext,
  rep?: number,
): Content[] {
  let label = translate(slide.label);
  if (rep != null) {
    label = `${label} (${translate('repeat')} ${rep})`;
  }
  const content: Content[] = [{text: label, fontSize: 18, bold: true, margin: [0, 15, 0, 10]}];
  for (const field of slide.nodes) {
    if (isField(field)) {
      content.push(...fieldToPdf(field, choicesMap, translate, context, rep));
    }
  }
  return content;
}

function repeatingSlideToPdf(
  slide: AjfRepeatingSlide,
  choicesMap: ChoicesMap,
  translate: (s: string) => string,
  context?: AjfContext,
): Content[] {
  let repeats = 3; // default, if no formData
  const maxRepeats = 20;
  if (context != null && slide.name != null) {
    const r = context[slide.name];
    if (typeof r === 'number') {
      repeats = Math.min(r, maxRepeats);
    }
  }

  const content = [];
  for (let r = 0; r < repeats; r++) {
    content.push(...slideToPdf(slide, choicesMap, translate, context, r));
  }
  return content;
}

function borderlessCell(text: string, bold?: boolean): Content {
  return {table: {body: [[{text, bold, border: [false, false, false, false]}]]}};
}

function fieldToPdf(
  field: AjfField | AjfEmptyField,
  choicesMap: ChoicesMap,
  translate: (s: string) => string,
  context?: AjfContext,
  rep?: number,
): Content[] {
  if (field.nodeType !== AjfNodeType.AjfField) {
    throw new Error('not a field');
  }

  const visible =
    context == null /* form not compiled, show all fields */ ||
    field.visibility == null ||
    evaluateExpression(field.visibility.condition, context);
  if (!visible) {
    return [];
  }

  const lookupString = lookupStringFunction(context, rep);

  switch (field.fieldType) {
    case AjfFieldType.String:
    case AjfFieldType.Text:
      return [
        borderlessCell(translate(field.label)),
        {table: {widths: ['*'], body: [[lookupString(field.name)]]}, margin: [5, 0, 0, 5]},
      ];
    case AjfFieldType.Formula:
      let value = lookupString(field.name);
      if (value === ' ') {
        // If the value of the field is not in the context, recompute the formula.
        const formula = field.formula || {formula: ''};
        value = String(evaluateExpression(formula.formula, context));
      }
      return [
        borderlessCell(translate(field.label)),
        {table: {widths: ['*'], body: [[value]]}, margin: [5, 0, 0, 5]},
      ];
    case AjfFieldType.Number:
    case AjfFieldType.Boolean:
    case AjfFieldType.DateInput:
    case AjfFieldType.Time:
      let val = lookupString(field.name);
      // for boolean fields in compiled forms, a null value is printed as 'no':
      if (field.fieldType === AjfFieldType.Boolean && context != null && val === ' ') {
        val = 'no';
      }
      return [
        {
          table: {
            widths: ['*', '*'],
            body: [[{text: translate(field.label), border: [false, false, false, false]}, val]],
          },
        },
      ];
    case AjfFieldType.SingleChoice:
    case AjfFieldType.MultipleChoice:
      const choices = choicesMap[(field as any).choicesOriginRef];
      if (context == null) {
        // empty form
        return choiceToPdf(field, choices, translate);
      }
      // compiled form, only print choices that are selected
      const selectedValues =
        field.fieldType === AjfFieldType.SingleChoice
          ? [lookupString(field.name)]
          : lookupArrayFunction(context, rep)(field.name);
      const nonNullChoice = (c: AjfChoice<any> | undefined): c is AjfChoice<any> => c != null;
      let selectedChoices = selectedValues
        .map(v => choices.find(c => c.value === v))
        .filter(nonNullChoice);
      if (selectedChoices.length === 0) {
        selectedChoices = selectedValues.map(v => ({
          label: v,
          value: v,
        }));
      }
      return choiceToPdf(field, selectedChoices, translate, context);
    case AjfFieldType.Empty:
      const text = stripHTML(translate(field.HTML));
      return [borderlessCell(text, true)];
    case AjfFieldType.Table:
      return tableToPdf(field, lookupString, translate);
    default:
      // yet unsupported field type
      return [];
  }
}

function choiceToPdf(
  field: AjfField,
  choices: AjfChoice<any>[],
  translate: (s: string) => string,
  context?: AjfContext,
): Content[] {
  let choiceLabels: string[];
  if (choices == null || choices.length === 0) {
    choiceLabels = [' '];
  } else {
    choiceLabels = choices.map(c => c.label);
  }
  const body = [];
  for (const c of choiceLabels) {
    body.push([translate(c)]);
  }
  let question = translate(field.label);
  // If the form is empty (to be compiled),
  // help the user distinguish between single- and multiple-choice questions:
  if (context == null && field.fieldType === AjfFieldType.SingleChoice) {
    question += ` (${translate('single choice')})`;
  }
  if (context == null && field.fieldType === AjfFieldType.MultipleChoice) {
    question += ` (${translate('multipe choice')})`;
  }
  return [
    {
      columns: [
        borderlessCell(question),
        {
          table: {widths: ['*'], body},
        },
      ],
      margin: [0, 0, 0, 5],
    },
  ];
}

function tableToPdf(
  table: AjfTableField,
  lookupString: (s: string) => string,
  translate: (s: string) => string,
): Content[] {
  const body: string[][] = [['', ...table.columnLabels.map(translate)]];
  for (let i = 0; i < table.rows.length; i++) {
    const row = [...table.rows[i]];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      if (typeof cell !== 'string') {
        row[j] = cell.formula;
      }
    }
    const valsRow = (row as string[]).map(lookupString).map(translate);
    body.push([translate(table.rowLabels[i]), ...valsRow]);
  }
  return [
    borderlessCell(translate(table.label)),
    {table: {body, widths: Array(table.columnLabels.length + 1).fill('*')}, margin: [5, 0, 0, 5]},
  ];
}
