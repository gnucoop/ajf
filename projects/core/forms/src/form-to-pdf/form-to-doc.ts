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
  BorderStyle,
  Document,
  HeadingLevel,
  ITableCellBorders,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
} from 'docx';

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

function downloadBlob(b: Blob) {
  const url = URL.createObjectURL(b);
  const a = document.createElement('a');
  a.setAttribute('style', 'display: none');
  a.href = url;
  a.target = '_blank';
  a.download = 'form.docx';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

type TranslateFunc = (text: string) => string;

export function downloadFormDoc(
  form: AjfForm,
  translate?: TranslateFunc, 
  header?: Paragraph[],
  context?: AjfContext
) {
  createFormDoc(form, translate, header, context).then(blob => {
    downloadBlob(blob);
  });
}

export function createFormDoc(
  form: AjfForm,
  translate?: TranslateFunc, 
  header?: Paragraph[],
  context?: AjfContext
): Promise<Blob> {
  return new Promise<Blob>(resolve => {
    const t = translate ? translate : (s: string) => s;
    const doc = formToDoc(form, t, header, context);
    Packer.toBlob(doc).then(blob => resolve(blob));
  });
}

// ChoicesMap maps a choicesOriginRef to the list the choices.
interface ChoicesMap {
  [name: string]: AjfChoice<any>[];
}

function stripHTML(s: string): string {
  return s.replace(/<\/?[^>]+(>|$)/g, '');
}

// Given a context, lookupStringFunction returns a function that allows to retrieve
// the field values from the context. The values are returned as doc-friendly strings.
// rep is the index of the repeating slide, if the field belongs to one.
function lookupStringFunction(context?: AjfContext, rep?: number): (name: string) => string {
  if (context == null) {
    return (_: string) => '';
  }
  return (name: string) => {
    if (name == null) {
      return '';
    }
    if (rep != null) {
      name = name + '__' + rep;
    }
    const val = context[name];
    if (val == null) {
      return '';
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

type SectionChild = Paragraph | Table;

function formToDoc(
  form: AjfForm,
  translate: (s: string) => string,
  header?: Paragraph[],
  context?: AjfContext,
): Document {
  const choicesMap: ChoicesMap = {};
  for (const o of form.choicesOrigins) {
    choicesMap[o.name] = o.choices;
  }

  const children: SectionChild[] = header ? [...header] : [];
  for (const slide of form.nodes) {
    if (isSlideNode(slide)) {
      children.push(...slideToDoc(slide, choicesMap, translate, context));
    } else if (isRepeatingSlide(slide)) {
      children.push(...repeatingSlideToDoc(slide, choicesMap, translate, context));
    }
  }
  return new Document({sections: [{children}]});
}

function slideToDoc(
  slide: AjfSlide | AjfRepeatingSlide,
  choicesMap: ChoicesMap,
  translate: (s: string) => string,
  context?: AjfContext,
  rep?: number,
): SectionChild[] {
  let label = translate(slide.label);
  if (rep != null) {
    label = `${label} (${translate('repeat')} ${rep + 1})`;
  }
  const children: SectionChild[] = [new Paragraph({text: label, heading: HeadingLevel.HEADING_2})];
  for (const field of slide.nodes) {
    if (isField(field)) {
      children.push(...fieldToDoc(field, choicesMap, translate, context, rep));
    }
  }
  return children;
}

function repeatingSlideToDoc(
  slide: AjfRepeatingSlide,
  choicesMap: ChoicesMap,
  translate: (s: string) => string,
  context?: AjfContext,
): SectionChild[] {
  let repeats = 3; // default, if no formData
  const maxRepeats = 20;
  if (context != null && slide.name != null) {
    const r = context[slide.name];
    if (typeof r === 'number') {
      repeats = Math.min(r, maxRepeats);
    }
  }

  const children = [];
  for (let r = 0; r < repeats; r++) {
    children.push(...slideToDoc(slide, choicesMap, translate, context, r));
  }
  return children;
}

function tableCell(text: string|Paragraph, borders?: ITableCellBorders): TableCell {
  if (typeof text === 'string') {
    text = new Paragraph(text);
  }
  return new TableCell({children: [text], borders});
}

const tableWidth = 9000;

function singleColTable(text: string) {
  return new Table({
    columnWidths: [tableWidth],
    rows: [new TableRow({children: [tableCell(text)]})],
  });
}

const noBorder = {style: BorderStyle.NONE};
const noBorders = {top: noBorder, bottom: noBorder, left: noBorder, right: noBorder};

function doubleColTable(l: string|Paragraph, r: string|Paragraph) {
  return new Table({
    columnWidths: [tableWidth/2, tableWidth/2],
    rows: [new TableRow({children: [tableCell(l, noBorders), tableCell(r)]})],
  });
}

const marginAfterFields = new Paragraph('');

function fieldToDoc(
  field: AjfField | AjfEmptyField,
  choicesMap: ChoicesMap,
  translate: (s: string) => string,
  context?: AjfContext,
  rep?: number,
): SectionChild[] {
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
        new Paragraph(translate(field.label)),
        singleColTable(lookupString(field.name)),
        marginAfterFields,
      ];
    case AjfFieldType.Formula:
      let value = lookupString(field.name);
      if (value === '') {
        // If the value of the field is not in the context, recompute the formula.
        const formula = field.formula || {formula: ''};
        value = String(evaluateExpression(formula.formula, context));
      }
      return [
        new Paragraph(translate(field.label)),
        singleColTable(value),
        marginAfterFields,
      ];
    case AjfFieldType.Number:
    case AjfFieldType.Boolean:
    case AjfFieldType.DateInput:
    case AjfFieldType.Time:
    case AjfFieldType.Range:
      let val = lookupString(field.name);
      // for boolean fields in compiled forms, a null value is printed as 'no':
      if (field.fieldType === AjfFieldType.Boolean && context != null && val === '') {
        val = 'no';
      }
      return [doubleColTable(translate(field.label), val), marginAfterFields];
    case AjfFieldType.SingleChoice:
    case AjfFieldType.MultipleChoice:
      const choices = choicesMap[(field as any).choicesOriginRef];
      if (context == null) {
        // empty form
        return [...choiceToDoc(field, choices, translate), marginAfterFields];
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
      return [...choiceToDoc(field, selectedChoices, translate, context), marginAfterFields];
    case AjfFieldType.Empty:
      return [new Paragraph(stripHTML(translate(field.HTML))), marginAfterFields];
    case AjfFieldType.Table:
      return [...tableToPdf(field, lookupString, translate), marginAfterFields];
    case AjfFieldType.Signature:
      let par = new Paragraph('');
      const image = context != null && context[field.name];
      const dataUrl = typeof image === 'object' && image.content;
      if (typeof dataUrl === 'string' && dataUrl.startsWith('data:image')) {
        const i = dataUrl.indexOf(',');
        const base64 = dataUrl.slice(i + 1);
        par = new Paragraph({children: [new ImageRun({
          data: Uint8Array.from(atob(base64), c => c.charCodeAt(0)),
          transformation: {width: 260, height: 130},
        })]});
      }
      return [doubleColTable(translate(field.label), par), marginAfterFields];
    default:
      // yet unsupported field type
      return [];
  }
}

function choiceToDoc(
  field: AjfField,
  choices: AjfChoice<any>[],
  translate: (s: string) => string,
  context?: AjfContext,
): SectionChild[] {
  let question = translate(field.label);
  // If the form is empty (to be compiled),
  // help the user distinguish between single- and multiple-choice questions:
  if (context == null && field.fieldType === AjfFieldType.SingleChoice) {
    question += ` (${translate('single choice')})`;
  }
  if (context == null && field.fieldType === AjfFieldType.MultipleChoice) {
    question += ` (${translate('multiple choice')})`;
  }
  let choiceLabels: string[];
  if (choices == null || choices.length === 0) {
    choiceLabels = [''];
  } else {
    choiceLabels = choices.map(c => c.label);
  }
  const rows = [new TableRow({children: [
    new TableCell({
      children: [new Paragraph(question)],
      rowSpan: choiceLabels.length,
      borders: noBorders
    }),
    tableCell(translate(choiceLabels[0])),
  ]})];
  for (let i = 1; i < choiceLabels.length; i++) {
    rows.push(new TableRow({children: [tableCell(translate(choiceLabels[i]))]}));
  }
  return [new Table({columnWidths: [tableWidth/2, tableWidth/2], rows})];
}

function tableToPdf(
  table: AjfTableField,
  lookupString: (s: string) => string,
  translate: (s: string) => string,
): SectionChild[] {
  const rows = [new TableRow({children: [
    tableCell(''),
    ...table.columnLabels.map(label => tableCell(translate(label))),
  ]})];
  for (let i = 0; i < table.rows.length; i++) {
    const row = [...table.rows[i]];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      if (typeof cell !== 'string') {
        row[j] = cell.formula;
      }
    }
    const valsRow = (row as string[]).map(lookupString).map(translate);
    rows.push(new TableRow({children: [
      tableCell(translate(table.rowLabels[i])),
      ...valsRow.map(val => tableCell(val)),
    ]}));
  }
  const cols = table.columnLabels.length + 1;
  return [
    new Paragraph(translate(table.label)),
    new Table({columnWidths: Array(cols).fill(tableWidth / cols), rows}),
  ];
}
