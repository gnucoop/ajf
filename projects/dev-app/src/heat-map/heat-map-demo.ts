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

import {Component} from '@angular/core';

import {features, values} from './features';

@Component({
  selector: 'heat-map-demo',
  templateUrl: 'heat-map-demo.html',
  styleUrls: ['heat-map-demo.scss'],
})
export class HeatMapDemo {
  readonly features = features;
  readonly values = values;
  startColor = '#03a9f4';
  endColor = '#cddc39';
  highlightColor = '#ff9800';
  showVisualMap = true;
  action = 'alert(v["feature"]["properties"]["NAME_1"]);';
}
