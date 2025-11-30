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
import {AjfNodeIcon as CoreNodeIcon} from '@ajf/core/node-icon';
import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ajf-node-icon',
  templateUrl: 'node-icon.html',
  styleUrls: ['node-icon.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AjfNodeIcon extends CoreNodeIcon {
  matIcon(node: AjfNode): string {
    if (node.nodeType === AjfNodeType.AjfSlide) {
      return 'folder';
    }
    if (node.nodeType === AjfNodeType.AjfRepeatingSlide) {
      return 'create_new_folder';
    }
    if (node.nodeType !== AjfNodeType.AjfField) {
      return 'broken_image';
    }
    switch ((node as AjfField).fieldType as AjfFieldType) {
      case AjfFieldType.String:
      case AjfFieldType.Text:
        return 'abc';
      case AjfFieldType.Number:
      case AjfFieldType.Range:
        return 'pin';
      case AjfFieldType.Boolean:
        return 'toggle_off';
      case AjfFieldType.SingleChoice:
        return 'format_list_bulleted';
      case AjfFieldType.MultipleChoice:
        return 'format_list_numbered';
      case AjfFieldType.Formula:
        return 'code';
      case AjfFieldType.Empty:
        return 'html';
      case AjfFieldType.Date:
      case AjfFieldType.DateInput:
        return 'calendar_month';
      case AjfFieldType.Time:
        return 'access_time';
      case AjfFieldType.Table:
        return 'grid_on';
      case AjfFieldType.Geolocation:
        return 'location_on';
      case AjfFieldType.Barcode:
        return 'qr_code_2';
      case AjfFieldType.File:
        return 'attach_file';
      case AjfFieldType.Image:
        return 'image';
      case AjfFieldType.VideoUrl:
        return 'videocam';
      case AjfFieldType.Signature:
        return 'draw';
      default:
        return 'broken_image';
    }
  }
}
