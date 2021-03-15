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

import {AjfChoice} from '../interface/choices/choice';
import {AjfEmptyField} from '../interface/fields/empty-field';
import {AjfField} from '../interface/fields/field';
import {AjfFieldType} from '../interface/fields/field-type';
import {AjfForm} from '../interface/forms/form';
import {AjfFormulaField} from '../interface/fields/formula-field';
import {AjfNodeType} from '../interface/nodes/node-type';
import {AjfRepeatingSlide} from '../interface/slides/repeating-slide';
import {AjfSlide} from '../interface/slides/slide';
import {AjfTableCell, AjfTableField} from '../interface/fields/table-field';

import {AjfContext, AjfFormula, evaluateExpression} from '@ajf/core/models';

import {Content, TDocumentDefinitions} from 'pdfmake/interfaces';
import {createPdf, TCreatedPdf} from 'pdfmake/build/pdfmake';
import {vfsFonts} from './vfs-fonts';

const fontsMap = {
  Roboto: {
    normal: 'roboto-all-400-normal.woff',
    bold: 'roboto-all-500-normal.woff',
    italics: 'roboto-all-400-italic.woff',
    bolditalics: 'roboto-all-500-italic.woff'
  },
};

interface FormSchema {
  name: string;
  schema?: AjfForm;
  is_tallysheet?: boolean;
}

interface FormData {
  date_start: string;
  date_end: string;
  data: AjfContext;
}

interface TranslateService {
  instant(s: string): string;
}

export function createFormPdf(
  formSchema: FormSchema, ts?: TranslateService, formData?: FormData): TCreatedPdf {

  const pdfDef = formToPdf(formSchema, ts, formData);
  return createPdf(pdfDef, undefined, fontsMap, vfsFonts);
}

// ChoicesMap maps a choicesOriginRef to the list the choices.
interface ChoicesMap {
  [name: string]: AjfChoice<any>[];
}

function stripHTML(s: string): string {
  return s.replace(/<\/?[^>]+(>|$)/g, '');
}

function translateFunction(ts?: TranslateService): (s: string) => string {
  if (ts == null) {
    return (s: string) => s;
  }
  return (s: string) => {
    if (s == null || s === '' || s === ' ') {
      return ' ';
    }
    return ts.instant(s) as string;
  };
}

// Given a formData, lookupStringFunction returns a function that allows to retrieve
// the field values from the formData. The values are returned as print-friendly strings.
// rep is the index of the repeating slide, if the field belongs to one.
function lookupStringFunction(formData?: FormData, rep?: number): (name: string) => string {
  if (formData == null || formData.data == null) {
    return (_: string) => ' ';
  }
  return (name: string) => {
    if (name == null) {
      return ' ';
    }
    if (rep != null) {
      name = name + '__' + rep;
    }
    const val = formData.data[name];
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
function lookupArrayFunction(formData?: FormData, rep?: number): (name: string) => string[] {
  if (formData == null || formData.data == null) {
    return (_: string) => [];
  }
  return (name: string) => {
    if (name == null) {
      return [];
    }
    if (rep != null) {
      name = name + '__' + rep;
    }
    const val = formData.data[name];
    if (Array.isArray(val)) {
      return val;
    }
    return [];
  };
}

// Given an AjfForm, returns its pdfmake pdf document definition.
function formToPdf(
  formSchema: FormSchema, ts?: TranslateService, formData?: FormData): TDocumentDefinitions {

  const translate = translateFunction(ts);
  const name = translate(formSchema.name);
  const form = formSchema.schema as AjfForm;

  const choicesMap: ChoicesMap = {};
  for (const o of form.choicesOrigins) {
    choicesMap[o.name] = o.choices;
  }

  const content: Content[] = [
    {text: name, fontSize: 22, bold: true, alignment: 'center', margin: [0, 0, 0, 10]}, {
      table: {
        widths: ['*', '*'],
        body: [[
          translate('date start') + ': ' + (formData ? formData.date_start : ''),
          translate('date end') + ': ' + (formData ? formData.date_end : ''),
        ]]
      },
      layout: 'noBorders'
    }
  ];
  for (const slide of form.nodes) {
    if (slide.nodeType === AjfNodeType.AjfSlide) {
      content.push(...slideToPdf(slide as AjfSlide, choicesMap, translate, formData));
    } else if (slide.nodeType === AjfNodeType.AjfRepeatingSlide) {
      content.push(
        ...repeatingSlideToPdf(slide as AjfRepeatingSlide, choicesMap, translate, formData)
      );
    }
  }
  const doc: TDocumentDefinitions = {info: {title: name}, content};
  if (formSchema.is_tallysheet) {
    doc.pageOrientation = 'landscape' as any;
  }
  return doc;
}

function slideToPdf(
  slide: AjfSlide | AjfRepeatingSlide, choicesMap: ChoicesMap,
  translate: (s: string) => string, formData?: FormData, rep?: number): Content[] {

  let label = translate(slide.label);
  if (rep != null) {
    label = `${label} (${translate('repeat')} ${rep})`;
  }
  const content: Content[] =
    [{text: label, fontSize: 18, bold: true, margin: [0, 15, 0, 10]}];
  for (const field of (slide.nodes as AjfField[])) {
    content.push(...fieldToPdf(field, choicesMap, translate, formData, rep));
  }
  return content;
}

function repeatingSlideToPdf(
  slide: AjfRepeatingSlide, choicesMap: ChoicesMap, translate: (s: string) => string,
  formData?: FormData): Content[] {

  let repeats = 3;  // default, if no formData
  const maxRepeats = 20;
  if (formData != null && formData.data != null && slide.name != null) {
    const r = formData.data[slide.name];
    if (typeof (r) === 'number') {
      repeats = Math.min(r, maxRepeats);
    }
  }

  const content = [];
  for (let r = 0; r < repeats; r++) {
    content.push(...slideToPdf(slide, choicesMap, translate, formData, r));
  }
  return content;
}

function borderlessCell(text: string, bold?: boolean): Content {
  return {table: {body: [[{text, bold, border: [false, false, false, false]}]]}};
}

function fieldToPdf(
  field: AjfField, choicesMap: ChoicesMap, translate: (s: string) => string,
  formData?: FormData, rep?: number): Content[] {

  if (field.nodeType !== AjfNodeType.AjfField) {
    throw new Error('not a field');
  }

  const visible =
    formData == null /* form not compiled, show all fields */ ||
    field.visibility == null ||
    evaluateExpression(field.visibility.condition, formData.data);
  if (!visible) {
    return [];
  }

  const lookupString = lookupStringFunction(formData, rep);

  switch (field.fieldType) {
    case AjfFieldType.String:
    case AjfFieldType.Text:
      return [
        borderlessCell(translate(field.label)),
        {table: {widths: ['*'], body: [[lookupString(field.name)]]}, margin: [5, 0, 0, 5]}
      ];
    case AjfFieldType.Formula:
      const formula = ((field as AjfFormulaField).formula as AjfFormula).formula;
      const value = evaluateExpression(formula, (formData || {}).data);
      return [
        borderlessCell(translate(field.label)),
        {table: {widths: ['*'], body: [[String(value)]]}, margin: [5, 0, 0, 5]}
      ];
    case AjfFieldType.Number:
    case AjfFieldType.Boolean:
    case AjfFieldType.DateInput:
    case AjfFieldType.Time:
      let val = lookupString(field.name);
      // for boolean fields in compiled forms, a null value is printed as 'no':
      if (field.fieldType === AjfFieldType.Boolean && formData != null && val === ' ') {
        val = 'no';
      }
      return [{
        table: {
          widths: ['*', '*'],
          body: [[ {text: translate(field.label), border: [false, false, false, false]}, val ]]
        }
      }];
    case AjfFieldType.SingleChoice:
    case AjfFieldType.MultipleChoice:
      const choices = choicesMap[(field as any).choicesOriginRef];
      if (formData == null) { // empty form
        return choiceToPdf(field, choices, translate);
      }
      // compiled form, only print choices that are selected
      const selectedValues = (field.fieldType === AjfFieldType.SingleChoice) ?
        [lookupString(field.name)] :
        lookupArrayFunction(formData, rep)(field.name);
      const selectedChoices = selectedValues.map(v => choices.find(c => c.value = v))
        .filter(c => c) as AjfChoice<any>[];
      return choiceToPdf(field, selectedChoices, translate);
    case AjfFieldType.Empty:
      const text = stripHTML(translate((field as AjfEmptyField).HTML));
      return [borderlessCell(text, true)];
    case AjfFieldType.Table:
      return tableToPdf(field as AjfTableField, lookupString, translate);
    default:  // yet unsupported field type
      return [];
  }
}

function choiceToPdf(
  field: AjfField, choices: AjfChoice<any>[], translate: (s: string) => string): Content[] {

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
  const question = translate(field.label) +
    ((field.fieldType === AjfFieldType.SingleChoice) ? ` (${translate('single choice')})` :
      ` (${translate('multipe choice')})`);
  return [{
    columns: [
      borderlessCell(question), {
        table: {widths: ['*'], body},
      }
    ],
    margin: [0, 0, 0, 5]
  }];
}

function tableToPdf(
  table: AjfTableField, lookupString: (s: string) => string,
  translate: (s: string) => string): Content[] {

  const body: string[][] = [['', ...table.columnLabels.map(translate)]];
  for (let i = 0; i < table.rows.length; i++) {
    const row = [...table.rows[i]];
    for (let j = 0; j < row.length; j++) {
      if (typeof(row[j]) !== 'string') {
        row[j] = (row[j] as AjfTableCell).formula;
      }
    }
    const valsRow = (row as string[]).map(lookupString).map(translate);
    body.push([translate(table.rowLabels[i]), ...valsRow]);
  }
  return [
    borderlessCell(translate(table.label)),
    {table: {body, widths: Array(table.columnLabels.length + 1).fill('*')}, margin: [5, 0, 0, 5]}
  ];
}
