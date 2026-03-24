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

import {AjfImageType} from '@ajf/core/image';
import {
  Column,
  Content,
  ContentStack,
  createPdf,
  PageOrientation,
  TableCell,
  TCreatedPdf,
  TDocumentDefinitions,
} from '@ajf/core/pdfmake';
import {AjfTableCell} from '@ajf/core/table';
import {deepCopy} from '@ajf/core/utils';

import {AjfReportContainerInstance} from '../interface/reports-instances/report-container-instance';
import {AjfReportInstance} from '../interface/reports-instances/report-instance';
import {AjfChartWidgetInstance} from '../interface/widgets-instances/chart-widget-instance';
import {AjfColumnWidgetInstance} from '../interface/widgets-instances/column-widget-instance';
import {AjfFormulaWidgetInstance} from '../interface/widgets-instances/formula-widget-instance';
import {AjfImageWidgetInstance} from '../interface/widgets-instances/image-widget-instance';
import {AjfLayoutWidgetInstance} from '../interface/widgets-instances/layout-widget-instance';
import {AjfTableWidgetInstance} from '../interface/widgets-instances/table-widget-instance';
import {AjfTextWidgetInstance} from '../interface/widgets-instances/text-widget-instance';
import {AjfWidgetInstance} from '../interface/widgets-instances/widget-instance';
import {AjfWidgetType} from '../interface/widgets/widget-type';

import {ImageMap, loadReportImages} from './load-report-images';

const pageWidth = 800;
const pageHeight = pageWidth * 1.4142; // A4 proportions
const pageMargins: [number, number] = [40, 60];

export function openReportPdf(
  report: AjfReportInstance,
  orientation: PageOrientation = 'portrait',
  icons: ImageMap = {},
  header?: Content[],
) {
  createReportPdf(report, orientation, icons, header).then(pdf => {
    pdf.open();
  });
}

export function createReportPdf(
  report: AjfReportInstance,
  orientation: PageOrientation = 'portrait',
  icons: ImageMap = {},
  header?: Content[],
): Promise<TCreatedPdf> {
  return new Promise<TCreatedPdf>(resolve => {
    loadReportImages(report).then(images => {
      let width = pageWidth - pageMargins[0] * 2;
      if (orientation === 'landscape') {
        width = pageHeight - pageMargins[1] * 2;
      }
      const pdfDef = reportToPdf(report, {...images, ...icons}, width, header);
      pdfDef.pageSize = {width: pageWidth, height: pageHeight};
      pdfDef.pageMargins = pageMargins;
      pdfDef.pageOrientation = orientation;
      resolve(createPdf(pdfDef));
    });
  });
}

function reportToPdf(
  report: AjfReportInstance,
  images: ImageMap,
  width: number,
  header?: Content[],
): TDocumentDefinitions {
  const stack: Content[] = header ? [...header] : [];
  if (report.header != null) {
    stack.push(containerToPdf(report.header, images, width));
  }
  if (report.content != null) {
    stack.push(containerToPdf(report.content, images, width));
  }
  if (report.footer != null) {
    stack.push(containerToPdf(report.footer, images, width));
  }
  return {content: {stack}};
}

function containerToPdf(
  container: AjfReportContainerInstance,
  images: ImageMap,
  width: number,
): Content {
  return {stack: container.content.map(w => widgetToPdf(w, images, width))};
}

const marginBetweenWidgets = 10;

function widgetToPdf(widget: AjfWidgetInstance, images: ImageMap, width: number): Content {
  switch (widget.widget.widgetType) {
    case AjfWidgetType.Layout:
      return layoutToPdf(widget as AjfLayoutWidgetInstance, images, width);
    case AjfWidgetType.PageBreak:
      return {text: '', pageBreak: 'after'};
    case AjfWidgetType.Image:
      return imageToPdf(widget as AjfImageWidgetInstance, images, width);
    case AjfWidgetType.Text:
      return textToPdf(widget as AjfTextWidgetInstance, images);
    case AjfWidgetType.Chart:
      const chart = widget as AjfChartWidgetInstance;
      const dataUrl = chart.canvasDataUrl == null ? '' : chart.canvasDataUrl();
      if (dataUrl === '') {
        return {text: '[chart with no attached canvas]'};
      }
      return {image: dataUrl, width, margin: [0, 0, 0, marginBetweenWidgets]};
    case AjfWidgetType.Table:
    case AjfWidgetType.DynamicTable:
    case AjfWidgetType.PaginatedTable:
      return tableToPdf(widget as AjfTableWidgetInstance, images);
    case AjfWidgetType.Column:
      const cw = widget as AjfColumnWidgetInstance;
      return {stack: cw.content.map(w => widgetToPdf(w, images, width))};
    case AjfWidgetType.Formula:
      const fw = widget as AjfFormulaWidgetInstance;
      return {text: fw.formula, margin: [0, 0, 0, marginBetweenWidgets]};
    default:
      return {text: ''};
  }
}

function layoutToPdf(lw: AjfLayoutWidgetInstance, images: ImageMap, width: number): Content {
  const columns = [...lw.widget.columns];
  while (columns.length < lw.content.length) {
    columns.push(1);
  }
  const childWidth = width / (columns.length || 1);
  const children = [];
  for (let i = 0; i < lw.content.length; i++) {
    let child = widgetToPdf(lw.content[i], images, childWidth) as ContentStack;
    // Children of Layout widgets are supposed to be Columns. If they aren't,
    // we must wrap them to avoid problems like images having an 'auto' width.
    if (child.stack == null) {
      child = {stack: [child]};
    }
    (child as Column).width = columns[i] === -1 ? 'auto' : '*';
    children.push(child);
  }
  return {columns: children};
}

function imageToPdf(image: AjfImageWidgetInstance, images: ImageMap, width: number): Content {
  if (image.widget.imageType !== AjfImageType.Image) {
    // Can't get icons to work, pdfs with multiple fonts don't seem to be working
    return {text: ''};
  }
  const dataUrl = images[image.url];
  if (dataUrl == null) {
    return {text: ''};
  }
  width /= 2;
  const w = image.styles['width'];
  if (typeof w === 'string' && w.endsWith('px')) {
    width = Number(w.slice(0, -2));
  }
  const styles: any = image.styles;
  let alignment: any = 'left';
  if (styles.marginLeft === 'auto' && styles.marginRight === 'auto') {
    alignment = 'center';
  } else if (styles.marginLeft === 'auto') {
    alignment = 'right';
  }
  return {image: dataUrl, width, alignment, margin: [0, 0, 0, marginBetweenWidgets]};
}

function textToPdf(tw: AjfTextWidgetInstance, images: ImageMap): Content {
  const iconText = images[tw.htmlText];
  if (typeof iconText === 'string') {
    return {text: iconText, margin: [0, 0, 0, marginBetweenWidgets]};
  }
  const paragraphs = tw.htmlText.split(/(?=<p|<h1|<h2|<h3|<li)/);
  return {
    stack: paragraphs.map(paragraphToPdf),
    margin: [0, 0, 0, marginBetweenWidgets],
  };
}

function paragraphToPdf(par: string): Content {
  let alignment: 'left'|'center'|'right'|'justify'|undefined;
  if (/^<\w\w? align="center"/.test(par)) {
    alignment = "center";
  } else if (/^<\w\w? align="right"/.test(par)) {
    alignment = "right";
  } else if (/^<\w\w? align="justify"/.test(par)) {
    alignment = "justify";
  }

  let fontSize: number|undefined;
  if (par.startsWith('<h1')) {
    fontSize = 20;
  } else if (par.startsWith('<h2')) {
    fontSize = 16;
  } else if (par.startsWith('<h3')) {
    fontSize = 14;
  }
  if (fontSize !== undefined) {
    return {text: stripHTML(par).trim(), fontSize, alignment, margin: [0, 5, 0, 0]};
  }

  if (par.startsWith('<li')) {
    return {ul: [{text: textRuns(par), alignment}]};
  }
  return {text: textRuns(par), alignment};
}

function textRuns(par: string): Content[] {
  const strings = par.split(/(?=<b>|<\/b>|<i>|<\/i>|<u>|<\/u>)/);
  let bold = false;
  let italics = false;
  let decoration: 'underline'|undefined;
  const runs: Content[] = [];
  for (let i = 0; i < strings.length; i++) {
    let s = strings[i];
    if (s.startsWith('<b>')) {
      bold = true;
    } else if (s.startsWith('</b>')) {
      bold = false;
    } else if (s.startsWith('<i>')) {
      italics = true;
    } else if (s.startsWith('</i>')) {
      italics = false;
    } else if (s.startsWith('<u>')) {
      decoration = 'underline';
    } else if (s.startsWith('</u>')) {
      decoration = undefined;
    }
    s = stripHTML(s);
    if (i === 0) {
      s = s.trimStart();
    }
    if (i === strings.length - 1) {
      s = s.trimEnd();
    }
    runs.push({text: s, bold, italics, decoration});
  }
  return runs;
}

function replaceIcon(htmlText: string, images: ImageMap): string {
  const iconText = images[htmlText];
  if (typeof iconText === 'string') {
    return iconText;
  }
  return stripHTML(htmlText);
}

function tableToPdf(table: AjfTableWidgetInstance, images: ImageMap): Content {
  if (table.data == null || table.data.length === 0) {
    return {text: ''};
  }
  const body: TableCell[][] = [];
  for (const dataRow of expandColAndRowSpan(table.data)) {
    const bodyRow: TableCell[] = [];
    for (const cell of dataRow) {
      let text = '';
      switch (typeof cell.value) {
        case 'number':
          text = String(cell.value);
          break;
        case 'string':
          text = replaceIcon(cell.value, images);
          break;
        case 'object':
          if (cell.value == null) {
            break;
          }
          let val = cell.value.changingThisBreaksApplicationSecurity;
          if (val === undefined) {
            val = cell.value.toString();
          }
          if (typeof val === 'number') {
            val = String(val);
          }
          text = replaceIcon(val || '', images);
          break;
        default:
          if (cell.value == null) {
            break;
          }
          let strVal = String(cell.value);
          text = replaceIcon(strVal || '', images);
          break;
      }
      bodyRow.push({text, colSpan: cell.colspan, rowSpan: cell.rowspan});
    }
    body.push(bodyRow);
  }
  return {
    table: {headerRows: 0, body},
    margin: [0, 0, 0, marginBetweenWidgets],
  };
}

// pdfmake wants placeholder cells after cells with col/rowspan > 1
function expandColAndRowSpan(data: AjfTableCell[][]): AjfTableCell[][] {
  data = deepCopy(data);
  // expand colspan:
  for (const row of data) {
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      for (let k = 1; k < (cell.colspan || 1); k++) {
        row.splice(j + k, 0, {rowspan: cell.rowspan, value: '', style: {}});
      }
    }
  }
  // expand rowspan:
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      for (let k = 1; k < (cell.rowspan || 1); k++) {
        data[i + k].splice(j, 0, {value: '', style: {}});
      }
    }
  }
  return data;
}

function stripHTML(s: string): string {
  return s.replace(/<\/?[^>]+(>|$)/g, '');
}
