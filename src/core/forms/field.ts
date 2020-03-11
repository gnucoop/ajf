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
import {ChangeDetectorRef, ComponentFactoryResolver, Directive, Input, OnDestroy, OnInit,
  ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';

import {AjfBaseFieldComponent} from './base-field';
import {AjfFieldComponentsMap} from './interface/fields/field-components-map';
import {AjfFieldInstance} from './interface/fields-instances/field-instance';
import {AjfFieldHost} from './field-host';

@Directive()
export abstract class AjfFormField implements OnDestroy, OnInit {
  @ViewChild(AjfFieldHost, {static: true}) fieldHost: AjfFieldHost;

  private _instance: AjfFieldInstance;
  get instance(): AjfFieldInstance { return this._instance; }
  @Input() set instance(instance: AjfFieldInstance) {
    if (this._instance !== instance) {
      this._instance = instance;
      this._loadComponent();
    }
  }

  private _readonly: boolean;
  get readonly(): boolean { return this._readonly; }
  @Input() set readonly(readonly: boolean) {
    this._readonly = coerceBooleanProperty(readonly);
    if (this._componentInstance != null) {
      this._componentInstance.readonly = this._readonly;
    }
    this._cdr.markForCheck();
  }

  private _componentInstance: AjfBaseFieldComponent<AjfFieldInstance>;

  protected abstract componentsMap: AjfFieldComponentsMap;
  private _updatedSub = Subscription.EMPTY;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _cfr: ComponentFactoryResolver
  ) { }

  ngOnDestroy(): void {
    this._updatedSub.unsubscribe();
  }

  ngOnInit(): void {
    this._loadComponent();
  }

  private _loadComponent(): void {
    this._updatedSub.unsubscribe();
    this._updatedSub = Subscription.EMPTY;
    if (this._instance == null || this.fieldHost == null) { return; }

    const vcr = this.fieldHost.viewContainerRef;
    vcr.clear();
    const componentDef = this.componentsMap[this._instance.node.fieldType];
    if (componentDef == null) { return; }
    const component = componentDef.component;
    try {
      const componentFactory = this._cfr.resolveComponentFactory(component);
      const componentRef = vcr.createComponent(componentFactory);
      this._componentInstance = componentRef.instance;
      this._componentInstance.instance = this._instance;
      this._componentInstance.readonly = this._readonly;

      if (componentDef.inputs) {
        Object.keys(componentDef.inputs).forEach(key => {
          if (key in  this._componentInstance) {
            ( this._componentInstance as any)[key] = componentDef.inputs![key];
          }
        });
      }
      this._updatedSub = this._instance.updatedEvt.subscribe(() => this._cdr.markForCheck());
    } catch (e) {
      console.log(e);
    }
  }
}
