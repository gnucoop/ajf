/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
    'styles': {
      'background-color': '#56d3cf',
      'color': '#ffffff'
    },
    'content': [{
      'columns': [0.55, -1, 0.45],
      'widgetType': 0,
      'content': [{
        'widgetType': 0,
        'columns': [-1, -1],
        'styles': {
          'background-color': '#37c4ca'
        },
        'content': [{
          'widgetType': 2,
          'styles': {
            'width': '44px',
            'height': '44px',
            'border-radius': '22px',
            'background-color': '#2bb7c0',
            'padding': '10px',
            'margin': '0 15px'
          },
          'imageUrl': 'https://dl.dropboxusercontent.com/u/53590771/wash.png'
        }, {
          'widgetType': 3,
          'htmlText': 'prova',
          'styles': {
            'padding': '0 15px'
          }
        }]
      }, {
        'widgetType': 0,
        'styles': {
          'border-top': '2em solid transparent',
          'border-bottom': '2em solid transparent',
          'border-left': '2em solid #37c4ca'
        }
      }, {
        'widgetType': 3,
        'styles': {
          'padding': '15px',
          'color': 'white'
        },
        'htmlText': '<b>inutile</b>'
      }]
    }]
  },
  'footer': [],
  'content': [{
    'styles': {
      'margin': '15px 0'
    },
    'content': [{
      'columns': [0.5, -1, 0.5],
      'widgetType': 0,
      'content': []
    }]
  }]
};
