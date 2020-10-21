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
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

import {AjfFormBuilderNodeTypeEntry} from './form-builder-service';


@Component({
  selector: 'ajf-fb-node-type-entry',
  templateUrl: 'node-type-entry.html',
  styleUrls: ['node-type-entry.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfFbNodeTypeEntry {
  private _nodeType: AjfFormBuilderNodeTypeEntry;
  get nodeType(): AjfFormBuilderNodeTypeEntry {
    return this._nodeType;
  }
  @Input()
  set nodeType(nodeType: AjfFormBuilderNodeTypeEntry) {
    this._nodeType = nodeType;
    this._cdr.markForCheck();
  }

  constructor(private _cdr: ChangeDetectorRef) {}
}
