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

import {AjfContext} from '@ajf/core/models';
import {deepCopy} from '@ajf/core/utils';
import {AjfForm} from '../interface/forms/form';
import {AjfRepeatingSlide} from '../interface/slides/repeating-slide';
import {AjfSlide} from '../interface/slides/slide';
import {AjfAttachmentsOriginSerializer} from './attachments-origin-serializer';
import {AjfChoicesOriginSerializer} from './choices-origin-serializer';
import {AjfNodeSerializer} from './node-serializer';

/**
 *  Create an AjfForm by json schema, apply a default value for stringIdentifier and initContext
 */
export class AjfFormSerializer {
  static fromJson(form: Partial<AjfForm>, context?: AjfContext): AjfForm {
    /**
     * create choicesOrigins by serializer
     */
    const choicesOrigins =
        (form.choicesOrigins || []).map(c => AjfChoicesOriginSerializer.fromJson(c));
    /**
     * create attachmentsOrigins by serializer
     */
    const attachmentsOrigins =
        (form.attachmentsOrigins || []).map(a => AjfAttachmentsOriginSerializer.fromJson(a));
    /**
     * create nodes by serializer
     */
    const nodes =
        (form.nodes || [])
            .map(n => AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins)) as (
            AjfRepeatingSlide | AjfSlide)[];
    return {
      ...form,
      choicesOrigins,
      attachmentsOrigins,
      nodes,
      stringIdentifier: form.stringIdentifier || [],
      initContext: deepCopy(context || {}),
    };
  }
}
