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
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  PageBreak,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
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

export function downloadReportDoc(report: AjfReportInstance, icons: ImageMap = {}) {
  createReportDoc(report, icons).then(blob => {
    downloadBlob(blob);
  });
}

export function createReportDoc(report: AjfReportInstance, icons: ImageMap = {}): Promise<Blob> {
  return new Promise<Blob>(resolve => {
    loadReportImages(report).then(images => {
      const doc = reportToDoc(report, {...images, ...icons});
      Packer.toBlob(doc).then(blob => resolve(blob));
    });
  });
}

type SectionChild = Paragraph | Table;

function reportToDoc(report: AjfReportInstance, images: ImageMap): Document {
  const children: SectionChild[] = [];
  if (report.header != null) {
    children.push(...containerToDoc(report.header, images));
  }
  if (report.content != null) {
    children.push(...containerToDoc(report.content, images));
  }
  if (report.footer != null) {
    children.push(...containerToDoc(report.footer, images));
  }
  return new Document({sections: [{children}]});
}

interface Container {
  content: AjfWidgetInstance[];
}

function containerToDoc(container: Container, images: ImageMap): SectionChild[] {
  return container.content.map(w => widgetToDoc(w, images)).flat();
}

const imageSize = {width: 600, height: 300};

function widgetToDoc(widget: AjfWidgetInstance, images: ImageMap): SectionChild[] {
  const marginBetweenWidgets = new Paragraph('');

  switch (widget.widget.widgetType) {
    case AjfWidgetType.Layout:
    case AjfWidgetType.Column:
      return containerToDoc(widget as Container, images);
    case AjfWidgetType.PageBreak:
      return [new Paragraph({children: [new PageBreak()]})];
    case AjfWidgetType.Image:
      return [imageToDoc(widget as AjfImageWidgetInstance, images), marginBetweenWidgets];
    case AjfWidgetType.Text:
      return [textToDoc(widget as AjfTextWidgetInstance, images), marginBetweenWidgets];
    case AjfWidgetType.Chart:
      const chart = widget as AjfChartWidgetInstance;
      const dataUrl = chart.canvasDataUrl == null ? '' : chart.canvasDataUrl();
      if (dataUrl === '') {
        return [new Paragraph('[chart with no attached canvas]'), marginBetweenWidgets];
      }
      return [
        new Paragraph({children: [new ImageRun({data: dataUrl, transformation: imageSize})]}),
        marginBetweenWidgets,
      ];
    case AjfWidgetType.Table:
    case AjfWidgetType.DynamicTable:
      return [tableToDoc(widget as AjfTableWidgetInstance, images), marginBetweenWidgets];
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
  const i = dataUrl.indexOf(',');
  const base64 = dataUrl.slice(i + 1);
  return new Paragraph({children: [new ImageRun({
    data: Uint8Array.from(atob(base64), c => c.charCodeAt(0)),
    transformation: imageSize,
  })]});
}

function htmlTextToDocText(htmlText: string, images: ImageMap): string {
  const iconText = images[htmlText];
  if (typeof iconText === 'string') {
    return iconText;
  }
  return stripHTML(htmlText);
}

function textToDoc(tw: AjfTextWidgetInstance, images: ImageMap): Paragraph {
  let heading: HeadingLevel|undefined = undefined;
  if (tw.htmlText.startsWith('<h1>')) {
    heading = HeadingLevel.HEADING_1;
  } else if (tw.htmlText.startsWith('<h2>')) {
    heading = HeadingLevel.HEADING_2;
  }
  return new Paragraph({text: htmlTextToDocText(tw.htmlText, images), heading});
}

function tableToDoc(table: AjfTableWidgetInstance, images: ImageMap): Table {
  if (table.data == null || table.data.length === 0) {
    return new Paragraph('[empty table]');
  }
  return new Table({
    width: {size: 100, type: WidthType.PERCENTAGE},
    rows: table.data.map(row => new TableRow({
      children: row.map(cell => {
        let text = '';
        switch (typeof cell.value) {
          case 'number':
            text = String(cell.value);
            break;
          case 'string':
            text = htmlTextToDocText(cell.value, images);
            break;
          case 'object':
            let val = cell.value.changingThisBreaksApplicationSecurity;
            if (typeof val === 'number') {
              val = String(val);
            }
            text = htmlTextToDocText(val || '', images);
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
