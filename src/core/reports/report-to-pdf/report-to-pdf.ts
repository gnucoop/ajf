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
import {createPdf, TCreatedPdf} from 'pdfmake/build/pdfmake';
import {
  Column,
  Content,
  ContentStack,
  PageOrientation,
  TableCell,
  TDocumentDefinitions
} from 'pdfmake/interfaces';

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
import {vfsFonts} from './vfs-fonts';

const fontsMap = {
  Roboto: {
    normal: 'roboto-all-400-normal.woff',
    bold: 'roboto-all-500-normal.woff',
    italics: 'roboto-all-400-italic.woff',
    bolditalics: 'roboto-all-500-italic.woff'
  },
};

export function openReportPdf(report: AjfReportInstance, orientation?: PageOrientation) {
  createReportPdf(report, orientation).then(pdf => {
    pdf.open();
  });
}

export function createReportPdf(
    report: AjfReportInstance, orientation?: PageOrientation): Promise<TCreatedPdf> {
  return new Promise<TCreatedPdf>(resolve => {
    loadReportImages(report).then(images => {
      let width = 595.28 - 40 * 2;  // A4 page width - margins
      if (orientation === 'landscape') {
        width = 841.89 - 40 * 2;
      }
      const pdfDef = reportToPdf(report, images, width);
      pdfDef.pageOrientation = orientation;
      resolve(createPdf(pdfDef, undefined, fontsMap, vfsFonts));
    });
  });
}

function reportToPdf(
    report: AjfReportInstance, images: ImageMap, width: number): TDocumentDefinitions {
  const stack: Content[] = [];
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
    container: AjfReportContainerInstance, images: ImageMap, width: number): Content {
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
      return textToPdf(widget as AjfTextWidgetInstance);
    case AjfWidgetType.Chart:
      const chart = widget as AjfChartWidgetInstance;
      const dataUrl = chart.canvasDataUrl == null ? '' : chart.canvasDataUrl();
      if (dataUrl === '') {
        return {text: '[chart with no attached canvas]'};
      }
      return {image: dataUrl, width, margin: [0, 0, 0, marginBetweenWidgets]};
    case AjfWidgetType.Table:
      return tableToPdf(widget as AjfTableWidgetInstance);
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
  return {image: dataUrl, width, margin: [0, 0, 0, marginBetweenWidgets]};
}

function textToPdf(tw: AjfTextWidgetInstance): Content {
  const text: Content = {
    text: stripHTML(tw.htmlText),
    margin: [0, 0, 0, marginBetweenWidgets],
  };
  if (tw.htmlText.startsWith('<h1>')) {
    text.fontSize = 20;
    text.margin = [0, 10, 0, marginBetweenWidgets];
  } else if (tw.htmlText.startsWith('<h2>')) {
    text.fontSize = 15;
    text.margin = [0, 5, 0, marginBetweenWidgets];
  }
  return text;
}

function tableToPdf(table: AjfTableWidgetInstance): Content {
  if (table.data == null || table.data.length === 0) {
    return {text: ''};
  }
  const body: TableCell[][] = [];
  for (let i = 0; i < table.data.length; i++) {
    const dataRow = table.data[i];
    const bodyRow: TableCell[] = [];
    for (let j = 0; j < dataRow.length; j++) {
      const cell = dataRow[j];
      bodyRow.push({text: table.dataset[i][j], colSpan: cell.colspan});
      // pdfmake wants placeholder cells after cells with colspan > 1:
      for (let k = 1; k < (cell.colspan || 1); k++) {
        bodyRow.push({text: ''});
      }
    }
    body.push(bodyRow);
  }
  return {table: {headerRows: 0, body}, margin: [0, 0, 0, marginBetweenWidgets]};
}

function stripHTML(s: string): string {
  return s.replace(/<\/?[^>]+(>|$)/g, '');
}
