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
  AjfChartType,
  AjfWidgetInstance,
  AjfWidgetType,
  createWidgetInstance,
} from '@ajf/core/reports';
import {TranslocoService} from '@ajf/core/transloco';

import {features, values} from './heat-map/features';

const baseWidget = {
  styles: {height: '200px'},
  visibility: {condition: 'true'},
};

export function demoWidgets(ts: TranslocoService): {name: string; instance: AjfWidgetInstance}[] {
  const widgets: {name: string; instance: AjfWidgetInstance}[] = [
    {
      name: 'Layout',
      instance: {
        ...createWidgetInstance(
          {
            ...baseWidget,
            widgetType: AjfWidgetType.Layout,
            columns: [1, 2],
            content: [],
          },
          {},
          ts,
        ),
        content: [
          {
            ...createWidgetInstance(
              {
                ...baseWidget,
                widgetType: AjfWidgetType.Text,
                htmlText: '',
              },
              {},
              ts,
            ),
            htmlText: 'Column 1',
          },
          {
            ...createWidgetInstance(
              {
                ...baseWidget,
                widgetType: AjfWidgetType.Text,
                htmlText: '',
              },
              {},
              ts,
            ),
            htmlText: 'Column 2',
          },
        ],
      },
    },
    {
      name: 'Page break',
      instance: {
        ...createWidgetInstance(
          {
            ...baseWidget,
            widgetType: AjfWidgetType.PageBreak,
          },
          {},
          ts,
        ),
      },
    },
    {
      name: 'Image',
      instance: {
        ...createWidgetInstance(
          {
            ...baseWidget,
            widgetType: AjfWidgetType.Image,
            imageType: AjfImageType.Image,
          },
          {},
          ts,
        ),
        url:
          'http://icons.iconarchive.com/icons/designbolts/' +
          'smurfs-movie/256/grouchy-smurf-icon.png',
      },
    },
    {
      name: 'Text',
      instance: {
        ...createWidgetInstance(
          {
            ...baseWidget,
            widgetType: AjfWidgetType.Text,
            htmlText: '',
          },
          {},
          ts,
        ),
        htmlText: 'Sample text',
      },
    },
    {
      name: 'Chart',
      instance: {
        ...createWidgetInstance(
          {
            ...baseWidget,
            widgetType: AjfWidgetType.Chart,
            chartType: AjfChartType.Line,
            labels: [],
            dataset: [],
          },
          {},
          ts,
        ),
        chartType: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'My First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              lineTension: 0.1,
            },
          ],
        },
      },
    },
    {
      name: 'Table',
      instance: {
        ...createWidgetInstance(
          {
            ...baseWidget,
            widgetType: AjfWidgetType.Table,
            dataset: [],
          },
          {},
          ts,
        ),
        data: [
          [
            {value: 'a', style: {}},
            {value: 'b', style: {}},
            {value: 'c', style: {}},
          ],
          [
            {value: 'd', style: {}},
            {value: 'e', style: {}},
            {value: 'f', style: {}},
          ],
          [
            {value: 'g', style: {}},
            {value: 'h', style: {}},
            {value: 'i', style: {}},
          ],
        ],
      },
    },
    {
      name: 'Map',
      instance: {
        ...createWidgetInstance(
          {
            ...baseWidget,
            widgetType: AjfWidgetType.Map,
            tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            dataset: [],
          },
          {},
          ts,
        ),
        coordinate: [51.50853, -0.076132],
      },
    },
    {
      name: 'Column',
      instance: {
        ...createWidgetInstance(
          {...baseWidget, widgetType: AjfWidgetType.Column, content: []},
          {},
          ts,
        ),
        content: [
          {
            ...createWidgetInstance(
              {
                ...baseWidget,
                widgetType: AjfWidgetType.Text,
                htmlText: '',
              },
              {},
              ts,
            ),
            htmlText: 'Sample column',
          },
        ],
      },
    },
    {
      name: 'Formula',
      instance: {
        ...createWidgetInstance(
          {
            ...baseWidget,
            widgetType: AjfWidgetType.Formula,
            formula: {formula: ''},
          },
          {},
          ts,
        ),
        formula: 'Sample formula',
      },
    },
    {
      name: 'Image container',
      instance: {
        ...createWidgetInstance(
          {
            ...baseWidget,
            styles: {
              ...baseWidget.styles,
              overflow: 'hidden',
            },
            widgetType: AjfWidgetType.ImageContainer,
            imageType: AjfImageType.Image,
          },
          {},
          ts,
        ),
        urls: [
          'http://icons.iconarchive.com/icons/designbolts/smurfs-movie/256/grouchy-smurf-icon.png',
          'http://www.iconarchive.com/download/i78313/designbolts/smurfs-movie/brainy-smurf.ico',
          'http://icons.veryicon.com/png/Movie%20%26%20TV/The%20Smurfs/Smurfette.png',
        ],
      },
    },
    {
      name: 'Paginated list',
      instance: {
        ...createWidgetInstance(
          {
            ...baseWidget,
            styles: {
              ...baseWidget.styles,
              height: 'auto',
            },
            widgetType: AjfWidgetType.PaginatedList,
            pageSize: 2,
            title: 'Paginated list title',
            content: [],
          },
          {},
          ts,
        ),
        content: [1, 2, 3, 4, 5].map(idx => ({
          ...createWidgetInstance(
            {
              ...baseWidget,
              widgetType: AjfWidgetType.Text,
              htmlText: '',
            },
            {},
            ts,
          ),
          htmlText: `Item ${idx}`,
        })),
      },
    },
    {
      name: 'Dialog',
      instance: {
        ...createWidgetInstance(
          {
            ...baseWidget,
            widgetType: AjfWidgetType.Dialog,
            toggle: {
              ...baseWidget,
              widgetType: AjfWidgetType.Text,
              htmlText: '',
            },
            content: [],
          },
          {},
          ts,
        ),
        toggle: {
          ...createWidgetInstance(
            {
              ...baseWidget,
              widgetType: AjfWidgetType.Text,
              htmlText: '',
            },
            {},
            ts,
          ),
          htmlText: `Dialog toggle`,
        },
        content: [
          {
            ...createWidgetInstance(
              {
                ...baseWidget,
                widgetType: AjfWidgetType.Text,
                htmlText: '',
              },
              {},
              ts,
            ),
            htmlText: `Dialog content`,
          },
        ],
      },
    },
    {
      name: 'Heat map',
      instance: {
        ...createWidgetInstance(
          {
            ...baseWidget,
            widgetType: AjfWidgetType.HeatMap,
            idProp: '',
            features: '',
            values: '',
          },
          {},
          ts,
        ),
        features,
        values,
        idProp: 'GID_1',
        startColor: '#ffeb3b',
        endColor: '#f44336',
        highlightColor: '#009688',
      },
    },
  ];
  return widgets;
}
