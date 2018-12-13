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

import {Observable, Subscription} from 'rxjs';

import {AjfJsonSerializable} from '@ajf/core/models';
import {deepCopy} from '@ajf/core/utils';

import {getTypeName} from './get-type-name';

export enum AjfChoicesType {
  String,
  Number,
  LENGTH
}

export interface IAjfChoicesOrigin {
  getType(): string;
  getName(): string;
  getLabel(): string;
  getChoices(): Array<any>;
  getChoicesType(): any;
  setName(name: string): void;
  setLabel(label: string): void;
}

/**
 * This class will define an ajf choice
 */
export class AjfChoice<T> extends AjfJsonSerializable {
  label: string;
  value: T;

  constructor(obj?: any) {
    super(obj);

    this.label = obj && obj.label || '';
    this.value = obj && obj.value || null;
  }
}

/**
 * This abstract class will define Ajf choices origin
 * @implemets : IAjfChoicesOrigin
 */
export abstract class AjfChoicesOrigin<T> extends AjfJsonSerializable implements
    IAjfChoicesOrigin {
  private _name: string;
  private _label: string;
  private _choicesType: string;
  /**
   * this static method will create AjfChoicesOrigin
   * @param type : string - type of choice
   * @param obj  : any - choice obj
   * @return AjfChoicesFixedOrigin
   */
  static create(type: string, obj?: any): any {
    switch (type) {
    case 'string':
      return new AjfChoicesFixedOrigin<string>(obj);
    case 'number':
      return new AjfChoicesFixedOrigin<number>(obj);
    default:
      return null;
    }
  }
  /**
   * this method will load an AjfChoicesOrigin  from json
   * @param obj                : any - object AjfChoicesOrigin
   * @return AjfChoicesObservable
   */
  static fromJson(obj: any): AjfChoicesOrigin<any> {
    obj = deepCopy(obj);
    let keys: string[] = Object.keys(obj);
    if (keys.indexOf('type') === -1) {
      throw new Error('Choices origin type missing type');
    }
    let type: string = obj.type;
    delete obj.type;
    switch (type) {
    case 'fixed':
      return new AjfChoicesFixedOrigin<any>(obj);
    case 'function':
      return new AjfChoicesFunctionOrigin<any>(obj);
    case 'observable':
      return new AjfChoicesObservableOrigin<any>(obj);
    case 'observableArray':
      return new AjfChoicesObservableArrayOrigin<any>(obj);
    case 'promise':
      return new AjfChoicesObservableOrigin<any>(obj);
    default:
      throw new Error('Invalid choices origin type');
    }
  }

  constructor(obj?: any) {
    super();

    this.jsonExportedMembers = this.jsonExportedMembers.concat(
        [ 'type', 'name', 'label', 'choicesType' ]);

    this._name = obj && obj.name || null;
    this._label = obj && obj.label || null;
    this._choicesType = obj && obj.choicesType || null;
  }

  abstract getType(): string;

  getName(): string { return this._name; }

  getLabel(): string { return this._label; }

  setName(name: string): void { this._name = name; }

  setLabel(label: string): void { this._label = label; }

  abstract getChoices(): Array<AjfChoice<T>>;

  getChoicesType(): string {
    return this._choicesType || this.guessChoicesType();
  }

  private guessChoicesType(): string {
    let cs = this.getChoices();
    if (cs && cs.length > 0) {
      this._choicesType = getTypeName(cs[0].value);
    }
    return this._choicesType;
  }
}

export interface IAjfChoicesFunction<T> extends Function { (): AjfChoice<T>[]; }

export class AjfChoicesFixedOrigin<T> extends AjfChoicesOrigin<T> {
  private _choices: AjfChoice<T>[];

  getType(): string { return 'fixed'; }

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers.concat('choices');

    this._choices = obj && <AjfChoice<T>[]>obj.choices || [];
  }

  getChoices(): AjfChoice<T>[] { return this._choices; }

  setChoices(choices: AjfChoice<T>[]) { this._choices = choices.slice(0); }
}
/**
 * This class will define an Ajf choices function origin
 */
export class AjfChoicesFunctionOrigin<T> extends AjfChoicesOrigin<T> {
  private _generator: IAjfChoicesFunction<T>;
  get generator(): IAjfChoicesFunction<T> { return this._generator; }

  getType(): string { return 'function'; }

  constructor(generator: IAjfChoicesFunction<T>, obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers.concat('generator');

    this._generator = generator;
  }

  getChoices(): AjfChoice<T>[] { return this._generator(); }
}
/**
 * This class will define an Ajf choices observable origin
 */
export class AjfChoicesObservableOrigin<T> extends AjfChoicesOrigin<T> {
  private _currentChoices: AjfChoice<T>[] = [];
  private _subscription: Subscription = Subscription.EMPTY;

  get observable(): Observable<AjfChoice<T>> {
    return this._observable;
  }

  getType(): string { return 'observable'; }

  constructor(private _observable: Observable<AjfChoice<T>>, obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers.concat('observable');

    let self = this;
    this._subscription = _observable.subscribe(
        (x: AjfChoice<T>) => self._currentChoices.push(x));
  }

  getChoices(): AjfChoice<T>[] { return this._currentChoices.splice(0); }

  destroy(): void {
    this._subscription.unsubscribe();
  }
}
/**
 * This class will define an Ajf choices observable array origin
 */
export class AjfChoicesObservableArrayOrigin<T> extends AjfChoicesOrigin<T> {
  private _currentChoices: AjfChoice<T>[] = [];
  private _subscription: Subscription = Subscription.EMPTY;

  get observable(): Observable<AjfChoice<T>[]> {
    return this._observable;
  }

  getType(): string { return 'observableArray'; }

  constructor(private _observable: Observable<AjfChoice<T>[]>, obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers.concat('observable');

    let self = this;
    this._subscription = _observable.subscribe(
        (x: AjfChoice<T>[]) => self._currentChoices = x.splice(0));
  }

  getChoices(): AjfChoice<T>[] { return this._currentChoices.splice(0); }

  destroy(): void {
    this._subscription.unsubscribe();
  }
}
/**
 * This class will define an Ajf choices promise origin
 */
export class AjfChoicesPromiseOrigin<T> extends AjfChoicesOrigin<T> {
  private _choices: AjfChoice<T>[] = [];

  getType(): string { return 'promise'; }

  constructor(promise: Promise<AjfChoice<T>[]>, obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers.concat('promise');

    promise.then((x: AjfChoice<T>[]) => { this._choices = x.splice(0); });
  }

  getChoices(): AjfChoice<T>[] { return this._choices.splice(0); }
}
