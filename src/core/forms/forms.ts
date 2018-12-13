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

import {AjfJsonSerializable} from '@ajf/core/models';
import {deepCopy} from '@ajf/core/utils';

import {AjfAttachmentsOrigin} from './attachments';
import {AjfChoicesOrigin, IAjfChoicesOrigin} from './choices';
import {AjfNode} from './nodes';


export class AjfForm extends AjfJsonSerializable {
  nodes: AjfNode[];
  choicesOrigins: IAjfChoicesOrigin[];
  attachmentsOrigins: AjfAttachmentsOrigin[];
  initContext: any;
  topBar: boolean;
  valid = true;
  stringIdentifier: {label: string, value: string[]}[];
  lastSelectedLocation: boolean = true;
  supplementaryInformations: any;
  /**
   * this method will load an AjfForm from json
   * @param obj : any - object form
   * @return AjfForm
   */
  static fromJson(obj: any, context?: any): AjfForm {
    obj = deepCopy(obj);
    if (context) {
      context = deepCopy(context);
      obj.initContext = context;
    }
    let keys: string[] = Object.keys(obj);

    if (keys.indexOf('choicesOrigins') > -1 &&
        obj.choicesOrigins instanceof Array) {
      let cos: IAjfChoicesOrigin[] = [];
      for (let i = 0; i < obj.choicesOrigins.length; i++) {
        cos.push(AjfChoicesOrigin.fromJson(obj.choicesOrigins[i]));
      }
      obj.choicesOrigins = cos;
    }

    if (keys.indexOf('attachmentsOrigins') > -1 &&
        obj.attachmentsOrigins instanceof Array) {
      let cos: AjfAttachmentsOrigin[] = [];
      for (let i = 0; i < obj.attachmentsOrigins.length; i++) {
        cos.push(AjfAttachmentsOrigin.fromJson(obj.attachmentsOrigins[i]));
      }
      obj.attachmentsOrigins = cos;
    }

    if (keys.indexOf('nodes') > -1 && obj.nodes instanceof Array) {
      let fs: AjfNode[] = [];
      for (let i = 0; i < obj.nodes.length; i++) {
        let nodeObj: any = obj.nodes[i];
        let node: AjfNode;
        node = AjfNode.fromJson(nodeObj, obj.choicesOrigins,
                                obj.attachmentsOrigins, context);
        fs.push(node);
      }
      obj.nodes = fs;
    }

    return new AjfForm(obj);
  }

  static toString(schema: any, json: any, emptyString = ''): string | null {
    if (schema.stringIdentifier != null && schema.stringIdentifier.length > 0) {
      let str: string[] = schema.stringIdentifier.map((s: any) => {
        let values: string[] = [];
        if (s.value != null && s.value.length > 0) {
          s.value.forEach((curValue: any) => {
            let val: any;
            let vp: string[] = curValue.split('.');
            let cp: any = json;
            vp.forEach(k => {
              if (Object.keys(cp).indexOf(k) > -1) {
                val = cp[k];
                cp = cp[k];
              }
            });
            if (val instanceof Array && val.length > 0) {
              val = val.join(', ');
            }
            if (typeof(val) === 'string' && val != null) {
              values.push(val);
            }
          });
        }
        return `${s.label}: ${values.length > 0 ? values.join(', ')
                                                : emptyString}`;
      });
      return str.join(' - ');
    }
    return null;
  }

  constructor(obj?: any) {
    super();

    this.jsonExportedMembers = this.jsonExportedMembers.concat(
        [ 'nodes', 'choicesOrigins', 'stringIdentifier', 'topBar' ]);

    this.nodes = obj && obj.nodes || [];
    this.choicesOrigins = obj && obj.choicesOrigins || [];
    this.attachmentsOrigins = obj && obj.attachmentsOrigins || [];
    this.initContext = obj && obj.initContext || {};
    this.stringIdentifier = obj && obj.stringIdentifier || [];
    this.lastSelectedLocation = obj && obj.lastSelectedLocation == false ? false : true;
    this.supplementaryInformations = obj && obj.supplementaryInformations || null;
  }
  /**
   * this method will get child nodes from ajfNode
   * @param   node : AjfNode
   * @return ajfNode[] - the child og AjfNode
   */
  getChildNodes(node: AjfNode): AjfNode[] {
    return this.nodes.filter(n => n.parent === node.id).sort(n => n.parentNode);
  }
  /**
   * this method will get root node
   * @return ajfNode - the root node
   */
  getRootNode(): AjfNode | null {
    if (this.nodes == null || this.nodes.length === 0) {
      return null;
    }
    let ns: AjfNode[] = this.nodes.filter(n => n.parent == null);
    return ns.length === 1 ? ns[0] : null;
  }
}
