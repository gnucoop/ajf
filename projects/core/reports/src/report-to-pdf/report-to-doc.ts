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
  AlignmentType,
  Document,
  HeadingLevel,
  ImageRun,
  PageOrientation,
  Packer,
  PageBreak,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  UnderlineType,
} from 'docx';

import {AjfReportInstance} from '../interface/reports-instances/report-instance';
import {AjfChartWidgetInstance} from '../interface/widgets-instances/chart-widget-instance';
import {AjfFormulaWidgetInstance} from '../interface/widgets-instances/formula-widget-instance';
import {AjfImageWidgetInstance} from '../interface/widgets-instances/image-widget-instance';
import {AjfTableWidgetInstance} from '../interface/widgets-instances/table-widget-instance';
import {AjfTextWidgetInstance} from '../interface/widgets-instances/text-widget-instance';
import {AjfWidgetInstance} from '../interface/widgets-instances/widget-instance';
import {AjfWidgetType} from '../interface/widgets/widget-type';

import {ImageMap, loadReportImages} from './load-report-images';

function downloadBlob(b: Blob) {
  const url = URL.createObjectURL(b);
  const a = document.createElement('a');
  a.setAttribute('style', 'display: none');
  a.href = url;
  a.target = '_blank';
  a.download = 'report.docx';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function downloadReportDoc(
  report: AjfReportInstance, header: SectionChild[] = [], orient: PageOrientation = PageOrientation.PORTRAIT
) {
  createReportDoc(report, header, orient).then(blob => {
    downloadBlob(blob);
  });
}

export function createReportDoc(
  report: AjfReportInstance, header: SectionChild[] = [], orient: PageOrientation = PageOrientation.PORTRAIT
): Promise<Blob> {
  return new Promise<Blob>(resolve => {
    loadReportImages(report).then(images => {
      const doc = reportToDoc(report, images, header, orient);
      Packer.toBlob(doc).then(blob => resolve(blob));
    });
  });
}

type SectionChild = Paragraph | Table;

function reportToDoc(
  report: AjfReportInstance, images: ImageMap, header: SectionChild[], orientation: PageOrientation
): Document {
  const width = orientation === PageOrientation.LANDSCAPE ? 13950 : 9000;
  const children: SectionChild[] = [...header];
  if (report.header != null) {
    children.push(...containerToDoc(report.header, images, width));
  }
  if (report.content != null) {
    children.push(...containerToDoc(report.content, images, width));
  }
  if (report.footer != null) {
    children.push(...containerToDoc(report.footer, images, width));
  }
  return new Document({sections: [{
    properties: {page: {size: {orientation}}},
    children
  }]});
}

interface Container {
  content: AjfWidgetInstance[];
}

function containerToDoc(container: Container, images: ImageMap, width: number): SectionChild[] {
  return container.content.map(w => widgetToDoc(w, images, width)).flat();
}

const chartSize = {width: 600, height: 300};

function imageSize(styles: any) {
  const size = {width: 300, height: 300};
  if (typeof styles.width === 'string' && styles.width.endsWith('px')) {
    size.width = Number(styles.width.slice(0, -2));
  }
  if (typeof styles.height === 'string' && styles.height.endsWith('px')) {
    size.height = Number(styles.height.slice(0, -2));
  }
  return size;
}

function widgetToDoc(widget: AjfWidgetInstance, images: ImageMap, width: number): SectionChild[] {
  const marginBetweenWidgets = new Paragraph('');

  switch (widget.widget.widgetType) {
    case AjfWidgetType.Layout:
    case AjfWidgetType.Column:
      return containerToDoc(widget as Container, images, width);
    case AjfWidgetType.PageBreak:
      return [new Paragraph({children: [new PageBreak()]})];
    case AjfWidgetType.Image:
      return [imageToDoc(widget as AjfImageWidgetInstance, images), marginBetweenWidgets];
    case AjfWidgetType.Text:
      return [...textToDoc(widget as AjfTextWidgetInstance), marginBetweenWidgets];
    case AjfWidgetType.Chart:
      const chart = widget as AjfChartWidgetInstance;
      const dataUrl = chart.canvasDataUrl == null ? '' : chart.canvasDataUrl();
      if (dataUrl === '') {
        return [new Paragraph('[chart with no attached canvas]'), marginBetweenWidgets];
      }
      return [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new ImageRun({data: dataUrl, transformation: chartSize})],
        }),
        marginBetweenWidgets,
      ];
    case AjfWidgetType.Table:
    case AjfWidgetType.DynamicTable:
    case AjfWidgetType.PaginatedTable:
      return [tableToDoc(widget as AjfTableWidgetInstance, width), marginBetweenWidgets];
    case AjfWidgetType.Formula:
      return [new Paragraph((widget as AjfFormulaWidgetInstance).formula), marginBetweenWidgets];
    default:
      return [];
  }
}

function imageToDoc(image: AjfImageWidgetInstance, images: ImageMap): Paragraph {
  if (image.widget.imageType !== AjfImageType.Image) {
    return new Paragraph('[unsupported image type]');
  }
  const dataUrl = images[image.url];
  if (dataUrl == null) {
    return new Paragraph("[couldn't load image]");
  }
  const styles: any = image.styles;
  let alignment = AlignmentType.LEFT;
  if (styles.marginLeft === 'auto' && styles.marginRight === 'auto') {
    alignment = AlignmentType.CENTER;
  } else if (styles.marginLeft === 'auto') {
    alignment = AlignmentType.RIGHT;
  }
  const i = dataUrl.indexOf(',');
  const base64 = dataUrl.slice(i + 1);
  return new Paragraph({alignment, children: [new ImageRun({
    data: Uint8Array.from(atob(base64), c => c.charCodeAt(0)),
    transformation: imageSize(styles),
  })]});
}

function textToDoc(tw: AjfTextWidgetInstance): Paragraph[] {
  const paragraphs = tw.htmlText.split(/(?=<p|<h1|<h2|<h3|<li)/);
  return paragraphs.map(paragraphToDoc);
}

function paragraphToDoc(par: string): Paragraph {
  let alignment: AlignmentType|undefined = undefined;
  if (/^<\w\w? align="center"/.test(par)) {
    alignment = AlignmentType.CENTER;
  } else if (/^<\w\w? align="right"/.test(par)) {
    alignment = AlignmentType.RIGHT;
  } else if (/^<\w\w? align="justify"/.test(par)) {
    alignment = AlignmentType.JUSTIFIED;
  }

  let heading: HeadingLevel|undefined = undefined;
  if (par.startsWith('<h1')) {
    heading = HeadingLevel.HEADING_1;
  } else if (par.startsWith('<h2')) {
    heading = HeadingLevel.HEADING_2;
  } else if (par.startsWith('<h3')) {
    heading = HeadingLevel.HEADING_3;
  }
  if (heading !== undefined) {
    return new Paragraph({text: stripHTML(par).trim(), heading, alignment});
  }

  let bullet: {level: number}|undefined = undefined;
  if (par.startsWith('<li')) {
    bullet = {level: 0};
  }
  return new Paragraph({children: textRuns(par), bullet, alignment});
}

function textRuns(par: string): TextRun[] {
  const strings = par.split(/(?=<b>|<\/b>|<i>|<\/i>|<u>|<\/u>)/);
  let bold = false;
  let italics = false;
  let underline: {type: UnderlineType}|undefined = undefined;
  const runs: TextRun[] = [];
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
      underline = {type: UnderlineType.SINGLE};
    } else if (s.startsWith('</u>')) {
      underline = undefined;
    }
    s = stripHTML(s);
    if (i === 0) {
      s = s.trimStart();
    }
    if (i === strings.length - 1) {
      s = s.trimEnd();
    }
    runs.push(new TextRun({text: s, bold, italics, underline}));
  }
  return runs;
}

function tableToDoc(table: AjfTableWidgetInstance, width: number): Table {
  if (table.data == null || table.data.length === 0) {
    return new Paragraph('[empty table]');
  }
  let numCols = 0;
  for (const cell of table.data[0]) {
    numCols += cell.colspan || 1;
  }
  return new Table({
    columnWidths: Array(numCols).fill(width / numCols),
    rows: table.data.map(row => new TableRow({
      children: row.map(cell => {
        let text = '';
        switch (typeof cell.value) {
          case 'number':
            text = String(cell.value);
            break;
          case 'string':
            text = stripHTML(cell.value);
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
            text = stripHTML(val || '');
            break;
          default:
            if (cell.value == null) {
              break;
            }
            let strVal = String(cell.value);
            text = stripHTML(strVal || '');
            break;
        }
        return new TableCell({
          children: [new Paragraph(text)],
          columnSpan: cell.colspan || undefined,
          rowSpan: cell.rowspan || undefined,
        });
      }),
    })),
  });
}

function stripHTML(s: string): string {
  return s.replace(/<\/?[^>]+(>|$)/g, '');
}
