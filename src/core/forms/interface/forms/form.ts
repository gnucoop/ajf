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

import {AjfAttachmentsOrigin} from '../attachments/attachments-origin';
import {AjfChoicesOrigin} from '../choices/choices-origin';
import {AjfRepeatingSlide} from '../slides/repeating-slide';
import {AjfSlide} from '../slides/slide';
import {AjfFormStringIdentifier} from './form-string-identifier';

/**
 * The main structure of a json schema representing a Form.
 */
export interface AjfForm {
  /**
   * The slides containing the Form nodes.
   */
  nodes: (AjfRepeatingSlide|AjfSlide)[];

  /**
   * The options for the single or multiple choices nodes.
   */
  choicesOrigins: AjfChoicesOrigin<any>[];

  // @TODO(tutti): check
  attachmentsOrigins: AjfAttachmentsOrigin<any>[];

  /**
   * An array of identifiers, each defined by a Label and a field value, used to show a brief
   * summary of the form data.
   */
  stringIdentifier: AjfFormStringIdentifier[];

  /**
   * A context specifying the initial state and values of a form.
   * It can be complemented and/or overwritten by the actual data.
   */
  initContext?: {[key: string]: string|string[]|number|number[]};

  /**
   * Any additional informations related to the Form.
   */
  supplementaryInformations?: any;

  /**
   * The validation state of the form, derived from the validation state of each
   * of its fields.
   */
  valid?: boolean;
}
