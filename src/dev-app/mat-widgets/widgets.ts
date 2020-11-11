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
import {AjfWidgetInstance, AjfWidgetType, createWidgetInstance} from '@ajf/core/reports';
import {TranslateService} from '@ngx-translate/core';

const baseWidget = {
  styles: { height: '200px'},
  visibility: {condition: 'true'}
};

export function demoWidgets(ts: TranslateService): {name: string, instance: AjfWidgetInstance}[] {
  return [
    {
      name: 'Layout',
      instance: {
        ...createWidgetInstance(
            {
              ...baseWidget,
              widgetType: AjfWidgetType.Layout,
              columns: [1, 2],
            } as any,
            {}, ts),
        content: [
          {
            ...createWidgetInstance(
                {
                  ...baseWidget,
                  widgetType: AjfWidgetType.Text,
                },
                {}, ts),
            htmlText: 'Column 1'
          },
          {
            ...createWidgetInstance(
                {
                  ...baseWidget,
                  widgetType: AjfWidgetType.Text,
                },
                {}, ts),
            htmlText: 'Column 2'
          }
        ]
      } as any,
    },
    {
      name: 'Page break',
      instance: {
        ...createWidgetInstance(
            {
              ...baseWidget,
              widgetType: AjfWidgetType.PageBreak,
            },
            {}, ts),
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
            } as any,
            {}, ts),
        url: 'http://icons.iconarchive.com/icons/designbolts/' +
            'smurfs-movie/256/grouchy-smurf-icon.png'
      },
    },
    {
      name: 'Text',
      instance: {
        ...createWidgetInstance(
            {
              ...baseWidget,
              widgetType: AjfWidgetType.Text,
            },
            {}, ts),
        htmlText: 'Sample text'
      } as any,
    },
    {
      name: 'Chart',
      instance: {
        ...createWidgetInstance(
            {
              ...baseWidget,
              widgetType: AjfWidgetType.Chart,
              options: {
                scales: {
                  yAxes: [{ticks: {callback: (value: any, index: any, values: any) => '$' + value}}]
                }
              }
            } as any,
            {}, ts),
        chartType: 'line',
        styles: {
            height: '200px'
        },
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'My First Dataset',
            data: [65000000, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            lineTension: 0.1,

          }]
        }
      } as any,
    },
    {
      name: 'Table',
      instance:
          {
            ...createWidgetInstance(
                {
                  ...baseWidget,
                  widgetType: AjfWidgetType.Table,
                },
                {}, ts),
            data: [
              [{value: 'a'}, {value: 'b'}, {value: 'c'}],
              [{value: 'd'}, {value: 'e'}, {value: 'f'}],
              [{value: 'g'}, {value: 'h'}, {value: 'i'}],
            ]
          } as any,
    },
    {
      name: 'Map',
      instance:
          {
            ...createWidgetInstance(
                {
                  ...baseWidget,
                  widgetType: AjfWidgetType.Map,
                  tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                } as any,
                {}, ts),
            coordinate: [51.508530, -0.076132],
          } as any,
    },
    {
      name: 'Column',
      instance:
          {
            ...createWidgetInstance({...baseWidget, widgetType: AjfWidgetType.Column}, {}, ts),
            content:
                [{
                  ...createWidgetInstance(
                      {
                        ...baseWidget,
                        widgetType: AjfWidgetType.Text,
                      },
                      {}, ts),
                  htmlText: 'Sample column'
                }],
          } as any,
    },
    {
      name: 'Formula',
      instance:
          {
            ...createWidgetInstance(
                {
                  ...baseWidget,
                  widgetType: AjfWidgetType.Formula,
                },
                {}, ts),
            formula: 'Sample formula'
          },
    },
    {
      name: 'Image container',
      instance:
          {
            ...createWidgetInstance(
                {
                  ...baseWidget,
                  widgetType: AjfWidgetType.ImageContainer,
                  imageType: AjfImageType.Image,
                } as any,
                {}, ts),
            urls: [
              'http://icons.iconarchive.com/icons/designbolts/' +
                  'smurfs-movie/256/grouchy-smurf-icon.png',
              'http://www.iconarchive.com/download/i78313/designbolts/' +
                  'smurfs-movie/brainy-smurf.ico',
              'http://icons.veryicon.com/png/Movie%20%26%20TV/The%20Smurfs/Smurfette.png',
            ],
          },
    }
  ];
}
