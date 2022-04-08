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

import {AjfGraphNode} from '@ajf/core/graph';
import {Component} from '@angular/core';

const reportNodes: AjfGraphNode[] = [
  {
    'id': 'root',
    'red': false,
    'green': true,
    'yellow': false,
    'label': 'Label 1',
    'parentId': 'null',
    'color': '"orange"',
  },
  {
    'id': '01',
    'red': true,
    'green': false,
    'yellow': false,
    'label': '"[01] I consiglieri presidiano specifici assi proritari"',
    'parentId': '"02"',
  },
];

@Component({
  selector: 'graph-e2e',
  templateUrl: 'graph-e2e.html',
})
export class GraphE2E {
  nodes = reportNodes;
}
