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

import {AjfStyles} from '../interface/styles';

export const slideTitleStyle: AjfStyles = {
  width: '100%',
  dislay: 'block',
  border: '1px solid gray',
  margin: '10px 10px 0px 10px',
  padding: '10px',
  backgroundColor: 'white',
};
export const slideContentStyle: AjfStyles = {
  with: '100%',
  dislay: 'block',
  border: '1px solid gray',
  margin: '0px 10px 10px 50px',
  padding: '10px',
  backgroundColor: 'white',
};
export const widgetTitleStyle: AjfStyles = {
  width: '100%',
  dislay: 'block',
  padding: '10px',
  maxHeight: '600px',
  backgroundColor: 'white',
};
export const htmlWidget: AjfStyles = {
  width: '100%',
  dislay: 'block',
  padding: '10px',
  backgroundColor: 'white',
  marginBottom: '10px',
};
export const boxStyle: AjfStyles = {
  dislay: 'block',
  padding: '10px',
  width: '100%',
  height: '100%',
};
export const widgetStyle: AjfStyles = {
  border: '1px dotted gray',
  borderRadius: '6px',
  marginBottom: '10px',
};
const bgColor = [
  'rgba(54, 162, 235, 0.6)', // blue
  'rgba(255, 99, 132, 0.6)', // red
  'rgba(255, 159, 64, 0.6)', // orange
  'rgba(255, 205, 86, 0.6)', // yellow
  'rgba(75, 192, 192, 0.6)', // green
  'rgba(153, 102, 255, 0.6)', // purple
  'rgba(201, 203, 207, 0.6)' // grey
];
export const backgroundColor: string[] = [];
for (let i = 0; i < 10; i++) {
  backgroundColor.push(...bgColor);
}
