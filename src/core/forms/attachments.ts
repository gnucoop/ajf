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

import {deepCopy} from '@ajf/core/utils';

export enum AjfAttachmentsType {
  Link,
  Pdf,
  LENGTH
}

export interface IAjfAttachment {
  label: string;
  value: any;
  type: string;
}

/**
 * This class will define an ajf attachment
 */
export class AjfAttachment<T> {
  get label(): string { return this._label; }
  get value(): T { return this._value; }
  get type(): string { return this._type; }

  private _label: string;
  private _value: T;
  private _type: string;

  constructor(obj?: any) {
    this._label = obj && obj.label || null;
    this._value = obj && obj.value || null;
    this._type = obj && obj.type || null;
  }
}

/**
 * This class will define an ajf attachments orgin
 */
export abstract class AjfAttachmentsOrigin {
  private _name: string;

  /**
   * this static method will create attachment
   * @param obj : any - object attachment
   * @return AjfAttachment
   */
  static create(obj: any): any {
    let attachments: IAjfAttachment[] = [];
    if (obj.attachments instanceof Array) {
      for (let i = 0; i < obj.attachments.length; i++) {
        let att: any = obj.attachments[i];
        switch (att.type) {
        case AjfAttachmentsType.Link:
          attachments.push(new AjfAttachment<string>(att));
          break;
        case AjfAttachmentsType.Pdf:
          attachments.push(new AjfAttachment<string>(att));
          break;
        default:
          throw new Error('Invalid attachment type');
        }
      }
    }
    obj.attachments = attachments;
    return new AjfAttachmentsFixedOrigin(obj);
  }
  /**
   * this static method will load an AjfAttachmentsOrigin from json
   * @param obj : any - object Attachments
   * @return AjfAttachmentsOrigin
   */
  static fromJson(obj: any): AjfAttachmentsOrigin {
    obj = deepCopy(obj);
    let keys: string[] = Object.keys(obj);
    if (keys.indexOf('type') === -1) {
      throw new Error('Attachments origin type missing type');
    }
    let type: string = obj.type;
    delete obj.type;
    switch (type) {
    case 'fixed':
      return AjfAttachmentsFixedOrigin.create(obj);
    default:
      throw new Error('Invalid attachment origin type');
    }
  }

  getName(): string { return this._name; }

  constructor(obj?: any) { this._name = obj && obj.name || null; }

  abstract getAttachments(): IAjfAttachment[];
}
/**
 * This class will define an ajf attachments fixed origin
 */
export class AjfAttachmentsFixedOrigin extends AjfAttachmentsOrigin {
  private _attachments: IAjfAttachment[];

  constructor(obj?: any) {
    super(obj);

    this._attachments = obj && obj.attachments || [];
  }

  getAttachments(): IAjfAttachment[] { return this._attachments; }
}
