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

import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {Subscription} from 'rxjs';

import {AjfBaseFieldComponent} from './base-field';
import {AjfFieldHost} from './field-host';
import {AjfFieldInstance} from './interface/fields-instances/field-instance';
import {AjfFieldComponentsMap} from './interface/fields/field-components-map';

/**
 * It is a base wrapper of every ajfField.
 * It manages what type of component to load(editable component or readonly component)
 * by input instance.
 *
 * @export
 * @abstract
 * @class AjfFormField
 */
@Directive()
export abstract class AjfFormField implements OnDestroy, OnInit {
  @ViewChild(AjfFieldHost, {static: true}) fieldHost: AjfFieldHost;

  private _instance: AjfFieldInstance;
  get instance(): AjfFieldInstance {
    return this._instance;
  }
  @Input()
  set instance(instance: AjfFieldInstance) {
    if (this._instance !== instance) {
      this._instance = instance;
      if (this._instance.node && !this._instance.node.editable) {
        this._readonly = true;
      }
      if (this._init) {
        this._loadComponent();
      }
    }
  }

  /**
   * if true mean that component need to be a readonly component
   *
   * @private
   */
  private _readonly: boolean;
  get readonly(): boolean {
    return this._readonly;
  }
  @Input()
  set readonly(readonly: boolean) {
    this._readonly = coerceBooleanProperty(readonly);
    if (!this._readonly && this._instance.node && !this._instance.node.editable) {
      this._readonly = true;
    }
    if (this._init) {
      this._loadComponent();
    }
  }

  private _componentInstance: AjfBaseFieldComponent<AjfFieldInstance>;
  private _init: boolean = false;

  protected abstract componentsMap: AjfFieldComponentsMap;
  private _updatedSub = Subscription.EMPTY;

  constructor(private _cdr: ChangeDetectorRef, private _cfr: ComponentFactoryResolver) {}

  ngOnDestroy(): void {
    this._updatedSub.unsubscribe();
  }

  ngOnInit(): void {
    this._init = true;
    this._loadComponent();
  }

  /**
   * It builds a new AjfField component by fieldType and binds it to the fieldHost.
   *
   * @private
   * @return {*}
   */
  private _loadComponent(): void {
    this._updatedSub.unsubscribe();
    this._updatedSub = Subscription.EMPTY;
    if (this._instance == null || this.fieldHost == null) {
      return;
    }

    const vcr = this.fieldHost.viewContainerRef;
    vcr.clear();
    const componentDef = this.componentsMap[this._instance.node.fieldType];
    if (componentDef == null) {
      return;
    }
    const component = this._readonly && componentDef.readOnlyComponent ?
        componentDef.readOnlyComponent :
        componentDef.component;
    try {
      const componentFactory = this._cfr.resolveComponentFactory(component);
      const componentRef = vcr.createComponent(componentFactory);
      this._componentInstance = componentRef.instance;
      this._componentInstance.instance = this._instance;

      if (componentDef.inputs) {
        Object.keys(componentDef.inputs).forEach(key => {
          if (key in this._componentInstance) {
            (this._componentInstance as any)[key] = componentDef.inputs![key];
          }
        });
      }
      this._updatedSub = this._instance.updatedEvt.subscribe(() => this._cdr.markForCheck());
    } catch (e) {
      console.log(e);
    }
  }
}
