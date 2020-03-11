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

import {AjfField, AjfFieldType, AjfNode, AjfNodeType} from '@ajf/core/forms';
import {Directive, Input} from '@angular/core';

@Directive()
export abstract class AjfNodeIcon {
  private _fontSet: string;
  get fontSet(): string { return this._fontSet; }

  private _fontIcon: string;
  get fontIcon(): string { return this._fontIcon; }

  private _node: AjfNode;
  get node(): AjfNode { return this._node; }
  @Input() set node(node: AjfNode) {
    this._node = node;
    this._fontSet = 'ajf-icon';
    this._fontIcon = this._getFontIcon(node);
  }

  private _getFontIcon(node: AjfNode): string {
    switch (node.nodeType) {
      case AjfNodeType.AjfField:
      const fieldType = AjfFieldType[(<AjfField>node).fieldType];
      return fieldType != null ? `field-${fieldType.toLowerCase()}` : '';
      default:
      const nodeType = AjfNodeType[node.nodeType];
      return nodeType != null ? `node-${nodeType.toLowerCase().replace('ajf', '')}` : '';
    }
  }
}
