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
  AjfChartWidget,
  AjfColumnWidget,
  AjfFilter,
  AjfReport,
  AjfTextWidget,
} from '@ajf/core/reports';

export const defaultReport: AjfReport = {
  header: {
    content: [],
    styles: {},
  },
  content: {
    content: [
      {
        widgetType: 4,
        chartType: 6,
        exportable: true,
        labels: {formula: '["label1", "label2", "label3"]'},
        dataset: [
          {
            label: '"chart data"',
            formula: [{formula: '[100, 200, 300]'}],
            aggregation: {aggregation: 0},
          },
        ],
        options: {},
        visibility: {condition: 'true'},
        styles: {},
      },
    ],
    styles: {},
  },
  footer: {content: [], styles: {}},
};

export const filterReport: AjfReport = {
  content: {
    content: [
      {
        widgetType: 3,
        htmlText: "[[selected_zone === 'first' ? firstLabels : (selected_zone === 'second' ? secondLabels : defaultLabels)]]",
        filter: {
          schema: {
            choicesOrigins: [
              {
                type: 'fixed',
                name: 'zone_choice',
                choicesType: 'string',
                choices: [
                  {
                    label: 'First',
                    value: 'first',
                  },
                  {
                    label: 'Second',
                    value: 'second',
                  },
                ],
              },
            ],
            nodes: [
              {
                parent: 0,
                id: 1,
                name: name,
                label: 'labels',
                nodeType: 3,
                nodes: [
                  {
                    parent: 1,
                    id: 1001,
                    name: 'selected_zone',
                    label: 'Global Zones',
                    nodeType: 0,
                    fieldType: 4,
                    choicesOriginRef: 'zone_choice',
                  },
                ],
              },
            ],
          },
        } as unknown as AjfFilter,
      } as AjfTextWidget,
    ],
    styles: {},
  },
  styles: {},
  variables: [
    {
      name: 'firstLabels',
      formula: {
        formula: "['firstLabelA', 'firstLabelB', 'firstLabelC']",
      },
    },
    {
      name: 'secondLabels',
      formula: {
        formula: "['secondLabelA', 'secondLabelB', 'secondLabelC']",
      },
    },
    {
      name: 'defaultLabels',
      formula: {
        formula: "['defaultLabelA', 'defaultLabelB', 'defaultLabelC']",
      },
    },
  ],
};

export const globalFilterReport = {
  variables: [
    {name: 'baseline_target', formula: {formula: 'forms[16]'}},
    {
      name: 'firstLabels',
      formula: {formula: "['firstLabelA', 'firstLabelB', 'firstLabelC']"},
    },
    {
      name: 'secondLabels',
      formula: {formula: "['secondLabelA', 'secondLabelB', 'secondLabelC']"},
    },
    {
      name: 'defaultLabels',
      formula: {
        formula:
          "['defaultLabelA', 'defaultLabelB', 'defaultLabelC', 'defaultLabelA', 'defaultLabelB', 'defaultLabelC']",
      },
    },
  ],
  content: {
    widgetType: 0,
    content: [
      {
        widgetType: 7,
        content: [
          {
            widgetType: 3,
            htmlText: '<h1 class="global">[[selected_zone]][[subzone]]</h1>',
          },
          {
            widgetType: 3,
            htmlText: '<h2 class="local">[[subzone]]</h2>',
            filter: {
              schema: {
                choicesOrigins: [
                  {
                    type: 'fixed',
                    name: 'subzone_choice1',
                    choicesType: 'string',
                    choices: [
                      {label: '1A', value: '1a'},
                      {label: '1B', value: '1b'},
                      {label: '1C', value: '1c'},
                    ],
                  },
                  {
                    type: 'fixed',
                    name: 'subzone_choice2',
                    choicesType: 'string',
                    choices: [
                      {label: '2A', value: '2a'},
                      {label: '2B', value: '2b'},
                      {label: '2C', value: '2c'},
                    ],
                  },
                  {
                    type: 'fixed',
                    name: 'zone_choice',
                    choicesType: 'string',
                    choices: [
                      {label: 'First', value: 'first'},
                      {label: 'Second', value: 'second'},
                    ],
                  },
                ],
                nodes: [
                  {
                    parent: 0,
                    id: 1,
                    name: name,
                    label: 'labels',
                    nodeType: 3,
                    nodes: [
                      {
                        parent: 1,
                        id: 1001,
                        name: 'subzone',
                        label: 'Sub Zones',
                        nodeType: 0,
                        fieldType: 4,
                        choicesOriginRef: 'subzone_choice1',
                        visibility: {condition: 'valueInChoice(selected_zone, "first")'},
                      },
                      {
                        parent: 1001,
                        id: 1002,
                        name: 'subzone',
                        label: 'Sub Zones',
                        nodeType: 0,
                        fieldType: 4,
                        choicesOriginRef: 'subzone_choice2',
                        visibility: {condition: 'valueInChoice(selected_zone, "second")'},
                      },
                    ],
                  },
                ],
              },
            } as unknown as AjfFilter,
          } as AjfTextWidget,
        ],
        filter: {
          schema: {
            choicesOrigins: [
              {
                type: 'fixed',
                name: 'subzone_choice1',
                choicesType: 'string',
                choices: [
                  {label: '1A', value: '1a'},
                  {label: '1B', value: '1b'},
                  {label: '1C', value: '1c'},
                ],
              },
              {
                type: 'fixed',
                name: 'subzone_choice2',
                choicesType: 'string',
                choices: [
                  {label: '2A', value: '2a'},
                  {label: '2B', value: '2b'},
                  {label: '2C', value: '2c'},
                ],
              },
              {
                type: 'fixed',
                name: 'zone_choice',
                choicesType: 'string',
                choices: [
                  {label: 'First', value: 'first'},
                  {label: 'Second', value: 'second'},
                ],
              },
            ],
            nodes: [
              {
                parent: 0,
                id: 1,
                name: name,
                label: 'labels',
                nodeType: 3,
                nodes: [
                  {
                    parent: 1,
                    id: 1001,
                    name: 'selected_zone',
                    label: 'Global Zones',
                    nodeType: 0,
                    fieldType: 4,
                    choicesOriginRef: 'zone_choice',
                  },
                  {
                    parent: 1001,
                    id: 1002,
                    name: 'subzone',
                    label: 'Sub Zones',
                    nodeType: 0,
                    fieldType: 4,
                    choicesOriginRef: 'subzone_choice1',
                    visibility: {condition: 'valueInChoice(selected_zone, "first")'},
                  },
                  {
                    parent: 1002,
                    id: 1003,
                    name: 'subzone',
                    label: 'Sub Zones',
                    nodeType: 0,
                    fieldType: 4,
                    choicesOriginRef: 'subzone_choice2',
                    visibility: {condition: 'valueInChoice(selected_zone, "second")'},
                  },
                ],
              },
            ],
          },
        } as unknown as AjfFilter,
        styles: {},
        visibility: {condition: 'true'},
      },
    ],
    columns: [1],
    visibility: {condition: 'true'},
    styles: {},
  },
} as AjfReport;
