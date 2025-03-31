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

export const testReport = {
  'header': {
    'content': [],
    'styles': {},
  },
  'content': {
    'content': [
      {
        'widgetType': 3,
        'htmlText':
`<h1 align="center">Heading 1</h1>
<h2>Heading 2</h2>
<p>
Lorem ipsum dolor sit amet, <b>consectetur</b> adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</p>
<ul>
  <li><i>Duis aute irure dolor in <b>reprehenderit</b> in voluptate</i></li>
  <li>velit esse cillum dolore eu fugiat nulla pariatur.</li>
</ul>`,
      },
      {
        'widgetType': 0,
        'columns': [-1, -1],
        'content': [
          {
            'widgetType': 7,
            'content': [
              {
                'widgetType': 3,
                'htmlText': 'column 1',
              },
            ],
          },
          {
            'widgetType': 7,
            'content': [
              {
                'widgetType': 3,
                'htmlText': 'column 2',
              },
            ],
          },
        ],
      },
      {
        'widgetType': 2,
        'imageType': 0,
        'url': {
          'formula': '"https://i.imgur.com/4Kw1Pbc.jpg"',
        },
      },
      {
        'widgetType': 5,
        'exportable': true,
        'dataset': [
          [
            {
              'label': '',
              'formula': {
                'formula': '"1a"',
              },
              'aggregation': {
                'aggregation': 0,
              },
              'colspan': 2,
            },
            {
              'label': '',
              'formula': {
                'formula': '"1b"',
              },
              'aggregation': {
                'aggregation': 0,
              },
            },
            {
              'label': '',
              'formula': {
                'formula': '"1c"',
              },
              'aggregation': {
                'aggregation': 0,
              },
            },
          ],
          [
            {
              'label': '',
              'formula': {
                'formula': '"2a"',
              },
              'aggregation': {
                'aggregation': 0,
              },
            },
            {
              'label': '',
              'formula': {
                'formula': '"2a1"',
              },
              'aggregation': {
                'aggregation': 0,
              },
            },
            {
              'label': '',
              'formula': {
                'formula': '"2b"',
              },
              'aggregation': {
                'aggregation': 0,
              },
            },
            {
              'label': '',
              'formula': {
                'formula': '"2c"',
              },
              'aggregation': {
                'aggregation': 0,
              },
            },
          ],
          [
            {
              'label': '',
              'formula': {
                'formula': '"3a"',
              },
              'aggregation': {
                'aggregation': 0,
              },
            },
            {
              'label': '',
              'formula': {
                'formula': '"3a1"',
              },
              'aggregation': {
                'aggregation': 0,
              },
            },
            {
              'label': '',
              'formula': {
                'formula': '"3b"',
              },
              'aggregation': {
                'aggregation': 0,
              },
            },
            {
              'label': '',
              'formula': {
                'formula': '"3c"',
              },
              'aggregation': {
                'aggregation': 0,
              },
            },
          ],
        ],
      },
      {
        'widgetType': 15,
        'pageSize': 10,
        'exportable': true,
        'rowDefinition': {
          'formula':
            'buildAlignedDataset(plainArray([["OSC cartographiées", [[98, 99]], "100%"],["OSC appliquant des stratégies de prévention et de protection",96,"97%",],["OSC envoyant une proposition de projet", 56, "29%"],["OSC ayant accès à financement",5,"54%",],["OSC qui développe bonnes pratiques dans la prévention/lutte contre les VBG",4,"43%",],["OSC qui a reçue des formations sur les droits des femmes/lutte aux SGBV",5,"2%",],["Total participants", 300, "-"],["Total participants (H)", 160, "-"],["Total participants (F)", 140, "-"],["Moyen pariticipants par OSC", 50, "-"],["OSC mettant en œuvre des stratégies spécifiques pour les groupes vulnerables",74,"34%",],]),[1, 1, 1],["left", "right", "right"]);',
        },
        'dataset': [
          {
            'label': '',
            'formula': {
              'formula': '"Indicatore"',
            },
            'aggregation': {
              'aggregation': 0,
            },
          },
          {
            'label': '',
            'formula': {
              'formula': '"Valore"',
            },
            'aggregation': {
              'aggregation': 0,
            },
          },
          {
            'label': '',
            'formula': {
              'formula': '"Valore %"',
            },
            'aggregation': {
              'aggregation': 0,
            },
          },
        ],
      },
      {
        'widgetType': 4,
        'chartType': 6,
        'labels': {
          'formula': '["label1", "label2", "label3"]',
        },
        'dataset': [
          {
            'label': '"chart data"',
            'formula': [
              {
                'formula': '[100, 200, 300]',
              },
            ],
            'aggregation': {
              'aggregation': 0,
            },
          },
        ],
      },
    ],
    'styles': {},
  },
  'footer': {
    'content': [],
    'styles': {},
  },
};
